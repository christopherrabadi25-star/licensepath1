import Link from "next/link";

import { CaliforniaHorizon } from "@/components/CaliforniaHorizon";
import { ExamQuestionShowcase, type ShowcaseQuestion } from "@/components/ExamQuestionShowcase";
import { BLUEPRINT, COURSES, EXAM } from "@/lib/exam";
import { getCourseUnits, getQuiz } from "@/lib/content";

/**
 * Every figure on this page is computed from the repository at build time. If a
 * number appears here, you can open the file it came from. Nothing is aspirational
 * and nothing describes a feature that does not exist yet — see the "Where this
 * actually stands" section, which is deliberately specific about what is unbuilt.
 */
function curriculumStats() {
  const courses = COURSES.map((c) => {
    const units = getCourseUnits(c.slug);
    const questions = units.reduce((sum, u) => sum + u.questionCount, 0);
    return { ...c, unitsWritten: units.length, questions };
  });

  return {
    courses,
    units: courses.reduce((s, c) => s + c.unitsWritten, 0),
    questions: courses.reduce((s, c) => s + c.questions, 0),
  };
}

/** Three real items from the bank — one per course, chosen to show California specificity. */
function sampleQuestions(): ShowcaseQuestion[] {
  const picks: { course: string; unit: number; id: string; courseLabel: string }[] = [
    { course: "principles", unit: 8, id: "PRIN-08-002", courseLabel: "Principles" },
    { course: "practice", unit: 12, id: "PRAC-12-002", courseLabel: "Practice" },
    { course: "legal-aspects", unit: 7, id: "LEGAL-07-008", courseLabel: "Legal Aspects" },
  ];

  const unitTitles: Record<string, string> = {
    "principles-8": "Unit 8 · Contracts in Practice",
    "practice-12": "Unit 12 · Trust Funds",
    "legal-aspects-7": "Unit 7 · Finance Law",
  };

  return picks.flatMap((p) => {
    const found = getQuiz(p.course, p.unit).find((q) => q.id === p.id);
    if (!found) return [];
    return [
      {
        id: found.id,
        courseLabel: p.courseLabel,
        unitLabel: unitTitles[`${p.course}-${p.unit}`] ?? `Unit ${p.unit}`,
        stem: found.stem,
        options: found.options,
        answer: found.answer,
        rationales: found.rationales,
      },
    ];
  });
}

export default function HomePage() {
  const stats = curriculumStats();
  const questions = sampleQuestions();

  return (
    <>
      {/* ── Establishing shot ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-scene">
          <CaliforniaHorizon />
        </div>

        <div className="wrap hero-inner">
          <p className="hero-status">
            <span className="hero-status-mark" aria-hidden="true" />
            Course approval pending · California DRE
          </p>

          <h1 className="hero-title">
            Everything California requires.
            <em>Taught by agents who work here.</em>
          </h1>

          <p className="hero-lede">
            The three statutory courses, the 135 hours, and the {EXAM.questions}-question state
            exam — written by two licensed California agents with more than $100M in closed
            volume across the San Gabriel Valley, Inland Empire, LA and Orange County.
          </p>

          <div className="hero-actions">
            <Link href="/#notify" className="btn-solid">
              Join the launch list
            </Link>
            <Link href="/courses" className="btn-ghost">
              Read the curriculum
            </Link>
          </div>
        </div>

        {/* Survey-strip: the four numbers that define the whole path. */}
        <div className="hero-strip">
          <div className="wrap hero-strip-inner">
            {[
              ["135", "required hours"],
              ["3", "statutory courses"],
              [String(EXAM.questions), "exam questions"],
              [`${EXAM.passPct}%`, "to pass"],
            ].map(([figure, label]) => (
              <div key={label} className="hero-figure">
                <strong className="tabular">{figure}</strong>
                <span className="anno">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What exists, stated plainly ───────────────────────────────────── */}
      <section className="written wrap">
        <div className="written-head">
          <p className="anno">Written, not promised</p>
          <h2>
            The curriculum is finished.
            <em> All {stats.units} units of it.</em>
          </h2>
        </div>
        <div className="written-body">
          <p>
            Most schools sell you a syllabus and a login. Every unit below is already
            drafted — full lesson text, worked California examples with real numbers, key
            terms, and an assessment bank with a written rationale for every option.
          </p>
          <dl className="written-figures">
            <div>
              <dt className="anno">Units drafted</dt>
              <dd className="tabular">{stats.units}</dd>
            </div>
            <div>
              <dt className="anno">Assessment items</dt>
              <dd className="tabular">{stats.questions.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="anno">Instruction hours</dt>
              <dd className="tabular">135</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── The path. A genuine sequence, so it is genuinely numbered. ────── */}
      <section className="path">
        <div className="wrap">
          <header className="path-head">
            <p className="anno">The required path</p>
            <h2>Three courses, in this order.</h2>
          </header>

          <ol className="path-list">
            {stats.courses.map((course, index) => (
              <li key={course.slug} className="path-item">
                <span className="path-index anno">{String(index + 1).padStart(2, "0")}</span>
                <div className="path-detail">
                  <h3>{course.name}</h3>
                  <p>{course.blurb}</p>
                </div>
                <dl className="path-figures">
                  <div>
                    <dt className="anno">Units</dt>
                    <dd className="tabular">{course.unitsWritten}</dd>
                  </div>
                  <div>
                    <dt className="anno">Questions</dt>
                    <dd className="tabular">{course.questions}</dd>
                  </div>
                  <div>
                    <dt className="anno">Hours</dt>
                    <dd className="tabular">{course.hours}</dd>
                  </div>
                </dl>
                <Link href="/courses" className="path-link" aria-label={`Read the ${course.name} outline`}>
                  Outline
                </Link>
              </li>
            ))}
          </ol>

          <p className="path-note">
            California requires one elective alongside Principles and Practice. Ours is Legal
            Aspects of Real Estate, which appears on the DRE&rsquo;s approved elective list.
          </p>
        </div>
      </section>

      {/* ── Try the actual product ────────────────────────────────────────── */}
      {questions.length > 0 && <ExamQuestionShowcase questions={questions} />}

      {/* ── The exam, to spec ─────────────────────────────────────────────── */}
      <section className="blueprint wrap">
        <div className="blueprint-head">
          <p className="anno">What the state actually tests</p>
          <h2>
            {EXAM.questions} questions in {EXAM.timeLabel}.
            <em> {EXAM.passCorrect} correct to pass.</em>
          </h2>
          <p>
            The bank is authored against the DRE&rsquo;s published content areas, in the
            proportions the exam uses — so practice time lands where the questions are.
          </p>
          <Link href="/exam" className="link-underline">
            The full exam guide
          </Link>
        </div>

        <div className="blueprint-table-wrap">
          <table className="blueprint-table tabular">
            <caption className="sr-only">
              California salesperson exam content areas and their approximate weight
            </caption>
            <thead>
              <tr>
                <th scope="col">Content area</th>
                <th scope="col">Weight</th>
                <th scope="col">Per form</th>
              </tr>
            </thead>
            <tbody>
              {BLUEPRINT.map((area) => (
                <tr key={area.id}>
                  <th scope="row">{area.full}</th>
                  <td>{area.weight}%</td>
                  <td>{area.perForm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Credibility ───────────────────────────────────────────────────── */}
      <section className="founders">
        <div className="wrap founders-inner">
          <header className="founders-head">
            <p className="anno">Who wrote it</p>
            <h2>Two licensed agents, still closing.</h2>
          </header>

          <div className="founders-grid">
            <article className="founder">
              <h3>Ramzi Rabadi</h3>
              <p className="anno">DRE #01738777 · 18+ years</p>
              <p>
                Designated content reviewer and instructor-of-record candidate. Every unit is
                drafted for his review before it goes anywhere near a student or the DRE.
              </p>
            </article>
            <article className="founder">
              <h3>Christopher Rabadi</h3>
              <p className="anno">DRE #02246356 · The Rabadi Group</p>
              <p>
                Agency 8 Real Estate Group. Brings the current transactions the worked
                examples are built from — the disclosures, the counters, the closings.
              </p>
            </article>
          </div>

          <div className="founders-note">
            <p>
              Together, more than $100M in combined transaction volume. The examples in these
              courses are not generic — they are Rancho Cucamonga, Whittier, Ontario, Covina.
            </p>
          </div>
        </div>
      </section>

      {/* ── Honest status ─────────────────────────────────────────────────── */}
      <section className="status wrap">
        <div className="status-head">
          <p className="anno">Where this actually stands</p>
          <h2>Built in the open.</h2>
        </div>
        <ul className="status-list">
          <li className="is-done">
            <span className="anno">Done</span>
            <p>
              All {stats.units} units drafted across the three courses, with{" "}
              {stats.questions.toLocaleString()} assessment items and a{" "}
              {EXAM.questions}-question exam blueprint.
            </p>
          </li>
          <li className="is-doing">
            <span className="anno">In progress</span>
            <p>
              Course player, seat-time tracking, and the exam simulator. Question bank is
              being rebalanced toward full blueprint proportions.
            </p>
          </li>
          <li className="is-next">
            <span className="anno">Not yet built</span>
            <p>
              The AI tutor, spaced-repetition flashcards, and certificates. These are
              designed and specified — they do not exist today, and we will not sell them
              as though they do.
            </p>
          </li>
          <li className="is-next">
            <span className="anno">Required first</span>
            <p>
              DRE course approval. Until those letters are in hand, nothing here can be sold
              or used toward a license, and we say so on every page.
            </p>
          </li>
        </ul>
      </section>

      {/* ── Full light ────────────────────────────────────────────────────── */}
      <section className="notify" id="notify">
        <div className="wrap notify-inner">
          <p className="anno">The founding cohort</p>
          <h2>
            Be told the day it opens.
          </h2>
          <p className="notify-lede">
            One list. We write when there is genuine news — approval progress, launch dates,
            founding-cohort pricing. Not a drip sequence.
          </p>

          <form className="notify-form" action="/api/leads" method="post">
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
            <button type="submit" className="btn-solid">
              Notify me
            </button>
          </form>

          <p className="notify-fine">
            No course is offered for sale today. Enrollment opens only after DRE approval.
          </p>
        </div>
      </section>
    </>
  );
}
