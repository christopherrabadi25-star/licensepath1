import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES } from "@/lib/exam";
import { getCourseUnits } from "@/lib/content";

type Props = { params: { course: string } };

export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const course = COURSES.find((c) => c.slug === params.course);
  return {
    title: course ? `${course.name} — Course Contents` : "Course",
    robots: { index: false, follow: false },
  };
}

export default function CoursePage({ params }: Props) {
  const course = COURSES.find((c) => c.slug === params.course);
  if (!course) notFound();

  const units = getCourseUnits(course.slug);
  const authoredHours = units.reduce((sum, u) => sum + u.estimatedHours, 0);
  const totalQuestions = units.reduce((sum, u) => sum + u.questionCount, 0);

  return (
    <div className="wrap py-14">
      <p className="anno">
        <Link href="/learn" className="hover:underline">
          Coursework
        </Link>
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
        {course.name}
      </h1>
      <p className="measure mt-5 leading-relaxed" style={{ color: "var(--ink-2)" }}>
        {course.blurb}
      </p>

      <dl className="tabular mt-9 flex flex-wrap gap-x-12 gap-y-4 border-y py-5" style={{ borderColor: "var(--rule)" }}>
        {[
          ["Units authored", `${units.length} of ${course.units}`],
          ["Hours accounted", `${authoredHours} of ${course.hours}`],
          ["Quiz questions", String(totalQuestions)],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="anno">{k}</dt>
            <dd className="mt-1 font-display text-xl font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      {authoredHours < course.hours && (
        <p
          className="mt-6 border-l-2 py-1 pl-5 text-sm leading-relaxed"
          style={{ borderColor: "var(--gold)", color: "var(--ink-3)" }}
        >
          <strong style={{ color: "var(--ink)" }}>Course in development.</strong> {units.length} of{" "}
          {course.units} units are drafted, accounting for {authoredHours} of the {course.hours}{" "}
          required hours. Remaining units and the course final exam are being written, and the
          curriculum has not yet been submitted to or approved by the DRE.
        </p>
      )}

      <ol className="mt-12 grid gap-px" style={{ background: "var(--rule)" }}>
        {units.map((u) => (
          <li key={u.number}>
            <Link
              href={`/learn/${course.slug}/${u.number}`}
              className="grid gap-x-6 gap-y-2 p-6 transition sm:grid-cols-[3.5rem_1fr_auto] sm:items-baseline"
              style={{ background: "var(--paper)" }}
            >
              <span className="anno tabular" style={{ color: "var(--gold-deep)" }}>
                {String(u.number).padStart(2, "0")}
              </span>
              <span>
                <span className="font-display text-lg font-semibold">{u.title}</span>
                {u.sb263 && (
                  <span
                    className="anno ml-3 inline-block align-middle"
                    style={{ color: "var(--seal)" }}
                  >
                    Required component
                  </span>
                )}
              </span>
              <span className="anno tabular whitespace-nowrap" style={{ color: "var(--ink-3)" }}>
                {u.estimatedHours} hrs · {u.questionCount} Q
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
