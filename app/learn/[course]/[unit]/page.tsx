import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SeatTimeTracker from "@/components/SeatTimeTracker";
import UnitQuiz from "@/components/UnitQuiz";
import { COURSES } from "@/lib/exam";
import { getQuiz, getUnit, listUnitNumbers } from "@/lib/content";

type Props = { params: { course: string; unit: string } };

export function generateStaticParams() {
  return COURSES.flatMap((c) =>
    listUnitNumbers(c.slug).map((n) => ({ course: c.slug, unit: String(n) }))
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const unit = getUnit(params.course, Number(params.unit));
  if (!unit) return {};
  const course = COURSES.find((c) => c.slug === params.course);
  return {
    title: `${unit.title} — ${course?.name ?? ""}`,
    description: `Unit ${unit.number} of ${course?.name}. California real estate pre-licensing coursework.`,
    robots: { index: false, follow: false }, // coursework is not public marketing content
  };
}

export default function UnitPage({ params }: Props) {
  const courseSlug = params.course;
  const unitNumber = Number(params.unit);
  const unit = getUnit(courseSlug, unitNumber);
  const course = COURSES.find((c) => c.slug === courseSlug);
  if (!unit || !course) notFound();

  const quiz = getQuiz(courseSlug, unitNumber);
  const all = listUnitNumbers(courseSlug);
  const idx = all.indexOf(unitNumber);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <>
      {/* Unit chrome — progress, seat time, and where the student is */}
      <div
        className="sticky top-14 z-30 border-b backdrop-blur"
        style={{
          borderColor: "var(--rule)",
          background: "color-mix(in srgb, var(--paper) 90%, transparent)",
        }}
      >
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2.5">
          <div className="flex items-baseline gap-3">
            <Link href={`/learn/${courseSlug}`} className="anno hover:underline">
              {course.name}
            </Link>
            <span className="anno" style={{ color: "var(--ink-4)" }}>
              Unit {unit.number} of {course.units}
            </span>
          </div>
          <SeatTimeTracker courseSlug={courseSlug} unitNumber={unitNumber} />
        </div>
        <div
          aria-hidden
          className="h-[2px]"
          style={{
            width: `${((idx + 1) / all.length) * 100}%`,
            background: "var(--gold)",
            transition: "width .3s",
          }}
        />
      </div>

      <article className="wrap py-12">
        <header className="border-b pb-8" style={{ borderColor: "var(--rule)" }}>
          <p className="anno" style={{ color: "var(--gold-deep)" }}>
            Unit {String(unit.number).padStart(2, "0")}
            {unit.sb263 && " · Required component"}
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
            {unit.title}
          </h1>
          <dl className="anno mt-5 flex flex-wrap gap-x-8 gap-y-2">
            <div className="flex gap-2">
              <dt>Estimated</dt>
              <dd className="tabular" style={{ color: "var(--ink-2)" }}>
                {unit.estimatedHours} hrs
              </dd>
            </div>
            <div className="flex gap-2">
              <dt>Quiz</dt>
              <dd className="tabular" style={{ color: "var(--ink-2)" }}>
                {quiz.length} questions
              </dd>
            </div>
            <div className="flex gap-2">
              <dt>Reading</dt>
              <dd className="tabular" style={{ color: "var(--ink-2)" }}>
                ~{unit.wordCount.toLocaleString()} words
              </dd>
            </div>
          </dl>
        </header>

        {/* Lesson body */}
        <div className="lesson mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{unit.body}</ReactMarkdown>
        </div>

        {/* Quiz */}
        <section className="mt-20 border-t pt-12" style={{ borderColor: "var(--rule-strong)" }}>
          <p className="anno" style={{ color: "var(--gold-deep)" }}>
            Check your understanding
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Unit {unit.number} quiz</h2>
          <p className="measure mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>
            Every option is explained after you answer — including why the wrong ones are wrong.
            Read those explanations; they are where most of the learning happens.
          </p>
          <div className="mt-10">
            <UnitQuiz questions={quiz} courseSlug={courseSlug} unitNumber={unitNumber} />
          </div>
        </section>

        {/* Unit navigation */}
        <nav
          className="mt-16 flex items-stretch justify-between gap-4 border-t pt-8"
          style={{ borderColor: "var(--rule)" }}
          aria-label="Unit navigation"
        >
          {prev ? (
            <Link href={`/learn/${courseSlug}/${prev}`} className="btn btn-line">
              ← Unit {prev}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/learn/${courseSlug}/${next}`} className="btn btn-ink">
              Unit {next} →
            </Link>
          ) : (
            <Link href={`/learn/${courseSlug}`} className="btn btn-ink">
              Back to course
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}
