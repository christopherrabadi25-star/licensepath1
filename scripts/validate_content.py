#!/usr/bin/env python3
"""Validate LicensePath course content.

Enforces the structural rules in CLAUDE.md §8 so a malformed question bank
cannot reach students or a DRE submission. Run in CI on every PR.

Checks:
  1. Every question has exactly 4 options and 4 rationales.
  2. The answer index is in range and points at the rationale beginning "Correct".
  3. Question IDs are globally unique.
  4. Glossary terms are unique.
  5. Reports blueprint-area coverage against CLAUDE.md §9 target weights.
"""

import collections
import glob
import json
import sys

TARGET_WEIGHTS = {
    "practice-disclosures": 25,
    "agency": 17,
    "ownership-land-use": 15,
    "valuation": 14,
    "contracts": 12,
    "financing": 9,
    "transfer": 8,
}


def main() -> int:
    errors: list[str] = []
    seen_ids: set[str] = set()
    areas: collections.Counter[str] = collections.Counter()
    total = 0

    banks = sorted(glob.glob("content/question-bank/**/*.json", recursive=True))
    banks += sorted(glob.glob("content/exam-sim/sample*.json"))

    for path in banks:
        try:
            # Curriculum source files are UTF-8. Be explicit so validation works
            # consistently on Windows hosts whose default codec is cp1252.
            with open(path, encoding="utf-8") as source_file:
                data = json.load(source_file)
        except json.JSONDecodeError as exc:
            errors.append(f"{path}: invalid JSON — {exc}")
            continue

        for q in data.get("questions", []):
            qid = q.get("id", "<missing id>")
            where = f"{path}:{qid}"

            options = q.get("options", [])
            rationales = q.get("rationales", [])
            answer = q.get("answer")

            if len(options) != 4:
                errors.append(f"{where}: expected 4 options, found {len(options)}")
            if len(rationales) != 4:
                errors.append(f"{where}: expected 4 rationales, found {len(rationales)}")
            if not isinstance(answer, int) or not 0 <= answer < len(rationales):
                errors.append(f"{where}: answer index {answer!r} out of range")
            elif not rationales[answer].startswith("Correct"):
                errors.append(
                    f"{where}: answer index {answer} does not point at the "
                    f'rationale beginning "Correct" — likely a mis-keyed item'
                )

            if qid in seen_ids:
                errors.append(f"{where}: duplicate question id")
            seen_ids.add(qid)

            area = q.get("blueprint_area")
            if area not in TARGET_WEIGHTS:
                errors.append(f"{where}: unknown blueprint_area {area!r}")
            else:
                areas[area] += 1
            total += 1

    # Glossary uniqueness
    try:
        glossary = json.load(open("content/glossary/glossary.json"))
        terms = [t["term"] for t in glossary.get("terms", [])]
        duplicates = [t for t, n in collections.Counter(terms).items() if n > 1]
        if duplicates:
            errors.append(f"glossary: duplicate terms — {', '.join(sorted(duplicates))}")
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"glossary: could not read — {exc}")
        terms = []

    print(f"Questions validated: {total}")
    print(f"Glossary terms: {len(terms)}")

    if total:
        print("\nBlueprint coverage vs. CLAUDE.md §9 targets:")
        for area, target in sorted(TARGET_WEIGHTS.items(), key=lambda kv: -kv[1]):
            count = areas[area]
            pct = count / total * 100
            flag = "  <-- under target" if pct < target - 3 else ""
            print(f"  {area:24} {count:4}  {pct:5.1f}%   target {target:2}%{flag}")

    if errors:
        print(f"\nFAILED with {len(errors)} error(s):", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        return 1

    print("\nAll content checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
