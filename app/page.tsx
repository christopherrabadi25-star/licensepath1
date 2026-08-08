import Link from "next/link";
import { BLUEPRINT, COURSES, EXAM } from "@/lib/exam";

/**
 * Homepage copy rule: describe only what exists today. The AI tutor, exam
 * simulator, and student app are in development and are described as such —
 * never in the present tense. Feature claims for unbuilt features would be
 * false advertising, and this school's entire posture while awaiting DRE
 * approval depends on marketing truthfulness (CLAUDE.md §3.2).
 */

const steps = [
  {
    n: "01",
    title: "Complete three 45-hour courses",
    body: "Real Estate Principles, Real Estate Practice, and one elective. California limits you to one course per 18-day period, so all three take a minimum of about 54 days.",
  },
  {
    n: "02",
    title: "Apply and get fingerprinted",
    body: "File the exam or combined exam/license application with your course certificates, then complete Live Scan fingerprinting for the background check.",
  },
  {
    n: "03",
    title: "Pass the state exam",
    body: `${EXAM.questions} multiple-choice questions in ${EXAM.timeLabel}. You need ${EXAM.passPct}% — ${EXAM.passCorrect} correct — to pass.`,
  },
  {
    n: "04",
    title: "Get sponsored by a broker",
    body: "A salesperson license alone does not let you work. You must be sponsored by a responsible broker before performing any licensed activity.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — the licensing path is the thesis, not a product pitch */}
      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="wrap grid gap-x-16 gap-y-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <p className="anno">California salesperson license</p>
            <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.05] sm:text-6xl">
              Three courses, one exam,
              <br />
              and about{" "}
              <span style={{ color: "var(--gold-deep)" }}>five months</span> of your life.
            </h1>
            <p className="measure mt-7 text-lg leading-relaxed" style={{ color: "var(--ink-2)" }}>
              LicensePath is a California real estate school being built by two licensed California
              agents. We are writing the curriculum now and preparing it for submission to the
              Department of Real Estate.
            </p>
            <p className="measure mt-4 text-lg leading-relaxed" style={{ color: "var(--ink-2)" }}>
              Until those approvals come through, we are not selling anything. What we can do is
              explain the process accurately — which is more than most schools bother to do before
              taking your money.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/exam" className="btn btn-ink">
                How the exam works
              </Link>
              <Link href="/#notify" className="btn btn-line">
                Tell me when it launches
              </Link>
            </div>
          </div>

          {/* Exam spec — presented as a recorded data block */}
          <aside className="lg:col-span-5">
            <div
              className="border p-7"
              style={{ borderColor: "var(--rule-strong)", background: "var(--paper-2)" }}
            >
              <p className="anno" style={{ color: "var(--gold-deep)" }}>
                Exam specification
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold">
                California Salesperson Exam
              </h2>
              <dl className="tabular mt-6">
                {[
                  ["Questions", `${EXAM.questions}`],
                  ["Format", "Multiple choice"],
                  ["Time limit", EXAM.timeLabel],
                  ["Passing score", `${EXAM.passPct}% (${EXAM.passCorrect} correct)`],
                  ["Reciprocity", "None"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b py-3 last:border-b-0"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    <dt className="text-sm" style={{ color: "var(--ink-3)" }}>
                      {k}
                    </dt>
                    <dd className="text-right text-sm font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-relaxed" style={{ color: "var(--ink-3)" }}>
                California has no license reciprocity with any state. An agent licensed in Arizona
                or Nevada still completes California&rsquo;s education and passes California&rsquo;s
                exam.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* The path — numbering encodes a real sequence */}
      <section className="wrap py-20">
        <p className="anno">The path to licensure</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
          Four steps. Most people underestimate the third.
        </h2>

        <ol className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {steps.map((s) => (
            <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-5">
              <span
                className="anno pt-1 tabular"
                style={{ color: "var(--gold-deep)", fontSize: "0.8125rem" }}
              >
                {s.n}
              </span>
              <div className="border-t pt-4" style={{ borderColor: "var(--rule)" }}>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2.5 leading-relaxed" style={{ color: "var(--ink-3)" }}>
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Blueprint — real data, presented as data */}
      <section
        className="border-y py-20"
        style={{ borderColor: "var(--rule)", background: "var(--paper-2)" }}
      >
        <div className="wrap grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="anno">What the exam actually tests</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              The exam is weighted. Most study plans are not.
            </h2>
            <p className="measure mt-6 leading-relaxed" style={{ color: "var(--ink-3)" }}>
              The DRE publishes how the 150 questions are distributed across seven content areas.
              Agency alone is roughly a sixth of the exam. Knowing the weighting tells you where the
              hours are worth spending.
            </p>
            <p className="measure mt-4 text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>
              Verify current weightings against the DRE&rsquo;s published exam content outline before
              relying on them.
            </p>
          </div>

          <div className="lg:col-span-7">
            <table className="tabular w-full text-sm">
              <caption className="sr-only">
                California salesperson exam content areas and approximate weightings
              </caption>
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--rule-strong)" }}>
                  <th className="anno pb-2 text-left font-normal">Content area</th>
                  <th className="anno pb-2 text-right font-normal">Weight</th>
                  <th className="anno pb-2 pl-4 text-right font-normal">Questions</th>
                </tr>
              </thead>
              <tbody>
                {BLUEPRINT.map((a) => (
                  <tr key={a.id} className="border-b" style={{ borderColor: "var(--rule)" }}>
                    <td className="py-3 pr-4 align-top">
                      <span className="font-medium">{a.short}</span>
                      <span
                        aria-hidden
                        className="mt-2 block h-[3px]"
                        style={{
                          width: `${(a.weight / 25) * 100}%`,
                          background: "var(--gold)",
                        }}
                      />
                    </td>
                    <td className="py-3 text-right align-top font-semibold">{a.weight}%</td>
                    <td className="py-3 pl-4 text-right align-top" style={{ color: "var(--ink-3)" }}>
                      ~{a.perForm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="wrap py-20">
        <p className="anno">The required education</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
          Three 45-hour courses, in the order that makes sense
        </h2>
        <div className="mt-12 grid gap-px" style={{ background: "var(--rule)" }}>
          {COURSES.map((c) => (
            <article
              key={c.slug}
              className="grid gap-x-10 gap-y-3 p-7 sm:grid-cols-[13rem_1fr]"
              style={{ background: "var(--paper)" }}
            >
              <div>
                <h3 className="font-display text-xl font-semibold">{c.name}</h3>
                <p className="anno mt-2">
                  {c.hours} hrs · {c.units} units
                </p>
              </div>
              <p className="leading-relaxed" style={{ color: "var(--ink-3)" }}>
                {c.blurb}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>
          <strong style={{ color: "var(--ink)" }}>Pacing is regulated.</strong> You may not complete
          more than one 45-hour course within any 18-day period, so the education alone takes a
          minimum of roughly 54 days. Any school promising a license in two weeks is describing
          something that is not possible.
        </p>
      </section>

      {/* Status — honest about what is and isn't built */}
      <section
        className="border-y py-20"
        style={{ borderColor: "var(--rule)", background: "var(--paper-sunk)" }}
      >
        <div className="wrap">
          <p className="anno">Where we actually are</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
            Building in the open
          </h2>
          <p className="measure mt-6 leading-relaxed" style={{ color: "var(--ink-3)" }}>
            Plenty of schools market features that do not exist yet. Here is our honest status.
          </p>

          <dl className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Real Estate Principles", "Written — 18 units, in internal review", true],
              ["Real Estate Practice", "In progress", false],
              ["Legal Aspects of Real Estate", "In progress", false],
              ["Practice question bank", "377 questions written of 1,500 planned", false],
              ["AI study tutor", "In development — not yet available", false],
              ["DRE course approval", "Preparing submission", false],
            ].map(([label, status, done]) => (
              <div key={label as string} className="border-t pt-4" style={{ borderColor: "var(--rule-strong)" }}>
                <dt className="font-display text-lg font-semibold">{label}</dt>
                <dd className="mt-1.5 flex items-baseline gap-2 text-sm" style={{ color: "var(--ink-3)" }}>
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full"
                    style={{ background: done ? "var(--seal)" : "var(--gold)" }}
                  />
                  {status}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Founders */}
      <section className="wrap py-20">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="anno">Who is writing this</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Two licensed California agents
            </h2>
            <p className="measure mt-6 leading-relaxed" style={{ color: "var(--ink-3)" }}>
              The curriculum is written by practicing licensees working in the San Gabriel Valley
              and across Southern California, not by textbook editors. Every worked example is a
              transaction shaped like one you will actually handle.
            </p>
            <Link href="/about" className="btn btn-line mt-8">
              More about the founders
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-px" style={{ background: "var(--rule)" }}>
              {[
                {
                  name: "Christopher Rabadi",
                  lic: "CA DRE Salesperson #02246356",
                  role: "The Rabadi Group at Agency 8 Real Estate Group. Co-founder.",
                },
                {
                  name: "Ramzi Rabadi",
                  lic: "CA DRE #01738777",
                  role: "18+ years licensed in California. Content reviewer and instructor-of-record candidate.",
                },
              ].map((p) => (
                <div key={p.name} className="p-7" style={{ background: "var(--paper)" }}>
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  <p className="anno mt-2" style={{ color: "var(--gold-deep)" }}>
                    {p.lic}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>
                    {p.role}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs" style={{ color: "var(--ink-4)" }}>
              License numbers can be verified through the California DRE public license lookup.
            </p>
          </div>
        </div>
      </section>

      {/* Notify — the honest CTA, since nothing is for sale */}
      <section id="notify" className="border-t" style={{ borderColor: "var(--rule)" }}>
        <div className="wrap py-20">
          <div className="max-w-2xl">
            <p className="anno">Launch updates</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              We will email you once, when courses open.
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: "var(--ink-3)" }}>
              No drip sequence, no daily tips. One email when the DRE approves our courses and
              enrollment opens, plus early-cohort pricing if you want it.
            </p>

            <form className="mt-8 flex flex-col gap-3 sm:flex-row" action="/api/leads" method="post">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="flex-1 border px-4 py-3 text-sm"
                style={{
                  borderColor: "var(--rule-strong)",
                  background: "var(--paper-2)",
                  color: "var(--ink)",
                }}
              />
              <button type="submit" className="btn btn-ink">
                Notify me
              </button>
            </form>
            <p className="mt-3 text-xs" style={{ color: "var(--ink-4)" }}>
              We do not sell or share student data. See our privacy policy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
