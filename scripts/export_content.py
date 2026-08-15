#!/usr/bin/env python3
"""
Export the curriculum into portable formats any frontend can consume.

Why this exists
---------------
The course content is authored as MDX + JSON under /content and read off the
filesystem by Next.js at build time. A Vite/React app (Lovable, CRA, Astro
islands, anything) cannot read the filesystem, so the raw files are useless to
it. This script emits two ingestion paths:

  export/content/*.json   plain JSON the app can `import` directly
  export/supabase/*.sql   schema + seed for a Supabase-backed app

Re-run after authoring new units so the export never drifts from /content:

    python3 scripts/export_content.py

Nothing here is authored content — it is a pure transform of /content, which
stays the single source of truth.
"""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
OUT = ROOT / "export"

COURSES = [
    {
        "slug": "principles",
        "name": "Real Estate Principles",
        "hours": 45,
        "sort_order": 1,
        "blurb": "The foundation: California license law, property and ownership, "
        "encumbrances, agency, contracts, disclosures, escrow and title, finance "
        "and foreclosure, appraisal, land use, fair housing, taxation, and "
        "landlord-tenant law.",
    },
    {
        "slug": "practice",
        "name": "Real Estate Practice",
        "hours": 45,
        "sort_order": 2,
        "blurb": "How the work is actually done: prospecting, listing presentations, "
        "pricing, advertising compliance, writing and negotiating offers, "
        "contract-to-close, trust fund handling, and the fair housing and implicit "
        "bias component California requires.",
    },
    {
        "slug": "legal-aspects",
        "name": "Legal Aspects of Real Estate",
        "hours": 45,
        "sort_order": 3,
        "blurb": "The elective: agency and contract law in depth, conveyancing and "
        "recording, finance and foreclosure litigation, landlord-tenant law, land "
        "use and environmental regulation, fair housing enforcement, and license "
        "discipline.",
    },
]

FRONTMATTER = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


def parse_frontmatter(raw: str) -> tuple[dict, str]:
    """Minimal YAML frontmatter reader — the subset this content actually uses."""
    match = FRONTMATTER.match(raw)
    if not match:
        return {}, raw

    meta: dict = {}
    for line in match.group(1).splitlines():
        if not line.strip() or ":" not in line:
            continue
        key, _, value = line.partition(":")
        key, value = key.strip(), value.strip()

        if value.startswith("[") and value.endswith("]"):
            inner = value[1:-1].strip()
            meta[key] = [
                v.strip().strip('"').strip("'") for v in inner.split(",") if v.strip()
            ]
        elif value.lower() in ("true", "false"):
            meta[key] = value.lower() == "true"
        else:
            cleaned = value.strip('"').strip("'")
            meta[key] = int(cleaned) if cleaned.isdigit() else cleaned

    body = raw[match.end():]
    # Drop the leading H1: the player renders the title from metadata, and a
    # duplicated title is the most common formatting bug when content moves apps.
    body = re.sub(r"^#\s+.+\n", "", body, count=1).strip()
    return meta, body


def load_units() -> list[dict]:
    units: list[dict] = []
    for course in COURSES:
        slug = course["slug"]
        for path in sorted((CONTENT / slug).glob("unit-*.mdx")):
            number = int(path.stem.replace("unit-", ""))
            meta, body = parse_frontmatter(path.read_text(encoding="utf8"))
            units.append(
                {
                    "id": f"{slug}-{number:02d}",
                    "course_slug": slug,
                    "unit_number": number,
                    "title": meta.get("title", f"Unit {number}"),
                    "estimated_hours": meta.get("estimated_hours"),
                    "blueprint_areas": meta.get("blueprint_areas", []),
                    "status": meta.get("status", "draft"),
                    "sb263_component": bool(meta.get("sb263_component", False)),
                    "body_markdown": body,
                    "word_count": len(body.split()),
                }
            )
    return units


def load_questions() -> list[dict]:
    """
    Two pools, one table.

    `source: "unit"`    items attached to a lesson, used for that unit's quiz.
    `source: "exam-sim"` exam-level items not tied to any unit, authored to the
                         blueprint for the simulator. These have no course or
                         unit, which is why both columns are nullable.
    """
    questions: list[dict] = []

    for course in COURSES:
        slug = course["slug"]
        for path in sorted((CONTENT / "question-bank" / slug).glob("unit-*.json")):
            data = json.loads(path.read_text(encoding="utf8"))
            for q in data.get("questions", []):
                questions.append(
                    {
                        "id": q["id"],
                        "source": "unit",
                        "course_slug": slug,
                        "unit_number": q["unit"],
                        "blueprint_area": q["blueprint_area"],
                        "difficulty": q.get("difficulty", 2),
                        "stem": q["stem"],
                        "options": q["options"],
                        "answer": q["answer"],
                        "rationales": q["rationales"],
                        "terms": q.get("terms", []),
                    }
                )

    for path in sorted((CONTENT / "exam-sim").glob("sample-set-*.json")):
        data = json.loads(path.read_text(encoding="utf8"))
        for q in data.get("questions", []):
            questions.append(
                {
                    "id": q["id"],
                    "source": "exam-sim",
                    "course_slug": None,
                    "unit_number": None,
                    "blueprint_area": q["blueprint_area"],
                    "difficulty": q.get("difficulty", 2),
                    "stem": q["stem"],
                    "options": q["options"],
                    "answer": q["answer"],
                    "rationales": q["rationales"],
                    "terms": q.get("terms", []),
                }
            )

    return questions


def slugify(term: str) -> str:
    s = term.lower()
    s = s.replace("&", " and ")
    s = re.sub(r"[®™]", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def load_glossary() -> list[dict]:
    data = json.loads((CONTENT / "glossary" / "glossary.json").read_text(encoding="utf8"))
    return [
        {
            "slug": slugify(t["term"]),
            "term": t["term"],
            "definition": t["definition"],
            "blueprint_area": t.get("area"),
        }
        for t in data.get("terms", [])
    ]


def sql_text(value: str) -> str:
    """Dollar-quote long prose so apostrophes in the lessons don't break the seed."""
    tag = "$lp$"
    if tag in value:  # vanishingly unlikely, but a corrupted seed is worse
        tag = "$lpx$"
    return f"{tag}{value}{tag}"


def sql_literal(value) -> str:
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, (list, dict)):
        return f"{sql_text(json.dumps(value, ensure_ascii=False))}::jsonb"
    return sql_text(str(value))


def write_sql(units, questions, glossary, blueprint) -> str:
    lines: list[str] = [
        "-- LicensePath curriculum — schema + seed",
        "-- Generated by scripts/export_content.py. Do not hand-edit; re-run instead.",
        "--",
        "-- RLS is enabled on every table per CLAUDE.md §4. The read policies below are",
        "-- deliberately permissive to authenticated users so the app works immediately.",
        "-- BEFORE SELLING ANYTHING, tighten unit/question reads to require an active",
        "-- entitlement — course text must not be readable without one (CLAUDE.md §4).",
        "",
        "create table if not exists courses (",
        "  slug text primary key,",
        "  name text not null,",
        "  hours int not null,",
        "  sort_order int not null,",
        "  blurb text",
        ");",
        "",
        "create table if not exists units (",
        "  id text primary key,",
        "  course_slug text not null references courses(slug) on delete cascade,",
        "  unit_number int not null,",
        "  title text not null,",
        "  estimated_hours numeric,",
        "  blueprint_areas jsonb default '[]'::jsonb,",
        "  status text default 'draft',",
        "  sb263_component boolean default false,",
        "  body_markdown text not null,",
        "  word_count int,",
        "  unique (course_slug, unit_number)",
        ");",
        "",
        "create table if not exists quiz_questions (",
        "  id text primary key,",
        "  -- 'unit' items belong to a lesson; 'exam-sim' items are blueprint-level",
        "  -- and belong to no unit, so course_slug/unit_number are nullable.",
        "  source text not null default 'unit',",
        "  course_slug text references courses(slug) on delete cascade,",
        "  unit_number int,",
        "  blueprint_area text not null,",
        "  difficulty int default 2,",
        "  stem text not null,",
        "  options jsonb not null,",
        "  answer int not null,",
        "  rationales jsonb not null,",
        "  terms jsonb default '[]'::jsonb",
        ");",
        "",
        "create table if not exists glossary_terms (",
        "  slug text primary key,",
        "  term text not null,",
        "  definition text not null,",
        "  blueprint_area text",
        ");",
        "",
        "create table if not exists exam_blueprint (",
        "  id text primary key,",
        "  label text not null,",
        "  weight int not null,",
        "  per_form int not null",
        ");",
        "",
        "create index if not exists units_course_idx on units (course_slug, unit_number);",
        "create index if not exists questions_unit_idx on quiz_questions (course_slug, unit_number);",
        "create index if not exists questions_area_idx on quiz_questions (blueprint_area);",
        "",
    ]

    for table in ("courses", "units", "quiz_questions", "glossary_terms", "exam_blueprint"):
        lines.append(f"alter table {table} enable row level security;")
    lines.append("")
    for table in ("courses", "glossary_terms", "exam_blueprint"):
        lines += [
            f'drop policy if exists "{table}_read" on {table};',
            f'create policy "{table}_read" on {table} for select using (true);',
        ]
    for table in ("units", "quiz_questions"):
        lines += [
            f'drop policy if exists "{table}_read" on {table};',
            f"-- TODO(entitlement): replace `auth.role() = 'authenticated'` with an",
            f"--   entitlements check before enrollment opens.",
            f"create policy \"{table}_read\" on {table} for select",
            f"  using (auth.role() = 'authenticated');",
        ]
    lines.append("")

    def upsert(table: str, rows: list[dict], conflict: str) -> None:
        if not rows:
            return
        cols = list(rows[0].keys())
        lines.append(f"-- {table}: {len(rows)} rows")
        lines.append(f"insert into {table} ({', '.join(cols)}) values")
        values = [
            "  (" + ", ".join(sql_literal(row[c]) for c in cols) + ")" for row in rows
        ]
        lines.append(",\n".join(values))
        updates = ", ".join(f"{c} = excluded.{c}" for c in cols if c != conflict)
        lines.append(f"on conflict ({conflict}) do update set {updates};")
        lines.append("")

    upsert("courses", COURSES, "slug")
    upsert("units", units, "id")
    upsert("quiz_questions", questions, "id")
    upsert("glossary_terms", glossary, "slug")
    upsert("exam_blueprint", blueprint, "id")

    return "\n".join(lines)


def main() -> None:
    units = load_units()
    questions = load_questions()
    glossary = load_glossary()
    blueprint = json.loads(
        (CONTENT / "exam-sim" / "blueprint.json").read_text(encoding="utf8")
    )
    areas = [
        {
            "id": a["id"],
            "label": a.get("name") or a.get("full") or a["id"],
            "weight": a.get("weight_pct") or a.get("weight") or 0,
            "per_form": a.get("questions_per_form") or a.get("perForm") or 0,
        }
        for a in blueprint.get("areas", [])
    ]

    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "content" / "units").mkdir(parents=True)
    (OUT / "supabase").mkdir(parents=True)

    def dump(path: Path, data) -> None:
        path.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf8"
        )

    # Combined files — simplest possible import for a small app.
    dump(OUT / "content" / "courses.json", COURSES)
    dump(OUT / "content" / "units.json", units)
    dump(OUT / "content" / "questions.json", questions)
    dump(OUT / "content" / "glossary.json", glossary)
    dump(OUT / "content" / "blueprint.json", areas)

    # Per-unit files — lets the app lazy-load one lesson instead of 1.9MB.
    for unit in units:
        payload = dict(unit)
        payload["questions"] = [
            q
            for q in questions
            if q["course_slug"] == unit["course_slug"]
            and q["unit_number"] == unit["unit_number"]
        ]
        dump(OUT / "content" / "units" / f"{unit['id']}.json", payload)

    (OUT / "supabase" / "seed.sql").write_text(
        write_sql(units, questions, glossary, areas), encoding="utf8"
    )

    total_words = sum(u["word_count"] for u in units)
    readme = f"""# LicensePath curriculum export

Generated by `scripts/export_content.py`. **Do not edit these files** — they are a
transform of `/content`, which is the single source of truth. Re-run the script
after new units are authored.

| File | Contents |
|---|---|
| `content/courses.json` | {len(COURSES)} courses |
| `content/units.json` | {len(units)} units, full lesson markdown |
| `content/units/<id>.json` | one unit + its questions, for lazy loading |
| `content/questions.json` | {len(questions)} assessment items |
| `content/glossary.json` | {len(glossary)} terms |
| `content/blueprint.json` | {len(areas)} exam content areas |
| `supabase/seed.sql` | schema + seed for a Supabase-backed app |

Totals: **{len(units)} units · {total_words:,} words · {len(questions)} questions · {len(glossary)} glossary terms**

## Using it in a Vite / React app (e.g. Lovable)

Lesson bodies are **markdown strings**, not MDX components, so any renderer works:

```bash
npm install react-markdown remark-gfm
```

```jsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import unit from "./content/units/principles-01.json";

export function Lesson() {{
  return (
    <article>
      <h1>{{unit.title}}</h1>
      <ReactMarkdown remarkPlugins={{[remarkGfm]}}>{{unit.body_markdown}}</ReactMarkdown>
    </article>
  );
}}
```

Lessons contain GFM tables (key terms, exam blueprints, closing math), so
`remark-gfm` is required — without it those render as raw pipes.

## Using it with Supabase

Paste `supabase/seed.sql` into the Supabase SQL editor and run it. It creates the
tables, enables RLS, and upserts every row, so it is safe to re-run after new
content lands.

## Question shape

`answer` is a **0-based index** into `options`. `rationales` has one entry per
option, aligned by index — the correct one begins with "Correct". Show all four:
explaining why the three distractors are wrong is the point of the bank.

## Compliance — read before launch

- Content is **DRAFT** until Ramzi Rabadi (DRE #01738777) reviews it. Nothing here
  is DRE-approved.
- Do not describe courses as "DRE-approved" anywhere in the UI, including meta
  tags. Use "Pending DRE approval" until approval letters are in hand.
- Lesson text carries `<!-- VERIFY -->` comments on figures needing reconfirmation
  against dre.ca.gov. Markdown renderers hide HTML comments by default; keep it
  that way for students, but do not strip them from the source.
- The `units`/`quiz_questions` read policies in `seed.sql` are permissive so the
  app runs immediately. Gate them behind an entitlement before selling access.
"""
    (OUT / "README.md").write_text(readme, encoding="utf8")

    print(f"units       {len(units)}")
    print(f"questions   {len(questions)}")
    print(f"glossary    {len(glossary)}")
    print(f"blueprint   {len(areas)}")
    print(f"words       {total_words:,}")
    print(f"-> {OUT}")


if __name__ == "__main__":
    main()
