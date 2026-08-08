import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type UnitFrontmatter = {
  course: string;
  unit: number;
  title: string;
  estimated_hours: number;
  blueprint_areas: string[];
  status: string;
  sb263_component?: boolean;
  interactivity?: string[];
};

export type Unit = {
  slug: string;
  courseSlug: string;
  number: number;
  title: string;
  estimatedHours: number;
  blueprintAreas: string[];
  sb263: boolean;
  body: string;
  wordCount: number;
  questionCount: number;
};

export type QuizQuestion = {
  id: string;
  blueprint_area: string;
  difficulty: number;
  stem: string;
  options: string[];
  answer: number;
  rationales: string[];
  terms?: string[];
};

const COURSE_DIRS: Record<string, string> = {
  principles: "principles",
  practice: "practice",
  "legal-aspects": "legal-aspects",
};

/** Unit numbers with authored content, in order, for a course. */
export function listUnitNumbers(courseSlug: string): number[] {
  const dir = path.join(CONTENT_DIR, COURSE_DIRS[courseSlug] ?? "");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => Number(f.replace("unit-", "").replace(".mdx", "")))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);
}

export function getUnit(courseSlug: string, unitNumber: number): Unit | null {
  const dir = COURSE_DIRS[courseSlug];
  if (!dir) return null;

  const file = path.join(CONTENT_DIR, dir, `unit-${String(unitNumber).padStart(2, "0")}.mdx`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const fm = data as UnitFrontmatter;

  return {
    slug: `${courseSlug}/${unitNumber}`,
    courseSlug,
    number: fm.unit,
    title: fm.title,
    estimatedHours: fm.estimated_hours,
    blueprintAreas: fm.blueprint_areas ?? [],
    sb263: Boolean(fm.sb263_component),
    // Strip the leading H1 — the player renders the title in its own header.
    body: content.replace(/^#\s+.+\n/m, "").trim(),
    wordCount: content.split(/\s+/).length,
    questionCount: getQuiz(courseSlug, unitNumber).length,
  };
}

export function getQuiz(courseSlug: string, unitNumber: number): QuizQuestion[] {
  const dir = COURSE_DIRS[courseSlug];
  if (!dir) return [];

  const file = path.join(
    CONTENT_DIR,
    "question-bank",
    dir,
    `unit-${String(unitNumber).padStart(2, "0")}.json`
  );
  if (!fs.existsSync(file)) return [];

  try {
    return JSON.parse(fs.readFileSync(file, "utf8")).questions ?? [];
  } catch {
    return [];
  }
}

/** All authored units for a course, with metadata but without body text. */
export function getCourseUnits(courseSlug: string): Omit<Unit, "body">[] {
  return listUnitNumbers(courseSlug)
    .map((n) => getUnit(courseSlug, n))
    .filter((u): u is Unit => u !== null)
    .map(({ body: _body, ...rest }) => rest);
}
