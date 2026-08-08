import type { Metadata } from "next";
import Link from "next/link";
import { COURSES } from "@/lib/exam";
import { getCourseUnits } from "@/lib/content";

export const metadata: Metadata = {
  title: "Coursework",
  robots: { index: false, follow: false },
};

export default function LearnIndex() {
  return (
    <div className="wrap py-14">
      <p className="anno">Coursework</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
        The three required courses
      </h1>
      <p className="measure mt-5 leading-relaxed" style={{ color: "var(--ink-2)" }}>
        Curriculum preview. Courses are in development and pending DRE approval; completing units
        here does not satisfy California licensing requirements.
      </p>

      <div className="mt-12 grid gap-px" style={{ background: "var(--rule)" }}>
        {COURSES.map((course, i) => {
          const units = getCourseUnits(course.slug);
          const hours = units.reduce((s, u) => s + u.estimatedHours, 0);
          const questions = units.reduce((s, u) => s + u.questionCount, 0);
          const pct = Math.round((units.length / course.units) * 100);

          return (
            <article key={course.slug} className="p-7" style={{ background: "var(--paper)" }}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <p className="anno" style={{ color: "var(--gold-deep)" }}>
                    Course {i + 1} · {course.hours} hours
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold">{course.name}</h2>
                </div>
                <p className="anno tabular">
                  {units.length} / {course.units} units · {questions} questions
                </p>
              </div>

              <div
                aria-hidden
                className="mt-5 h-[3px] w-full"
                style={{ background: "var(--rule)" }}
              >
                <div className="h-full" style={{ width: `${pct}%`, background: "var(--gold)" }} />
              </div>

              <p className="measure mt-5 text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>
                {course.blurb}
              </p>

              {units.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/learn/${course.slug}`} className="btn btn-line !py-2 !text-xs">
                    View all {units.length} units
                  </Link>
                  <Link
                    href={`/learn/${course.slug}/${units[0].number}`}
                    className="btn btn-ink !py-2 !text-xs"
                  >
                    Start Unit 1
                  </Link>
                </div>
              ) : (
                <p className="anno mt-6" style={{ color: "var(--ink-4)" }}>
                  Not yet drafted — {hours} hours authored
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
