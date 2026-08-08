import type { Metadata } from "next";
import Link from "next/link";
import { BLUEPRINT, EXAM } from "@/lib/exam";

export const metadata: Metadata = {
  title: "The California Real Estate Salesperson Exam — Format, Scoring & Content",
  description:
    "The California salesperson exam is 150 multiple-choice questions in 3 hours 15 minutes, and you need 70% to pass. Here is how it is weighted, what it costs, and what happens if you fail.",
  alternates: { canonical: "/exam" },
};

const faqs = [
  {
    q: "How many questions are on the California real estate exam?",
    a: "The salesperson exam is 150 multiple-choice questions. The broker exam is longer. You have 3 hours 15 minutes for the salesperson exam.",
  },
  {
    q: "What score do you need to pass?",
    a: "70 percent — 105 of 150 questions correct. There is no penalty for guessing, so never leave a question blank.",
  },
  {
    q: "How many times can you retake it?",
    a: "There is no lifetime limit on retakes, but you must file a re-examination application and pay the fee each time, and applications remain valid for a limited period before you must reapply from the beginning.",
  },
  {
    q: "Does California accept a real estate license from another state?",
    a: "No. California has no license reciprocity with any state. Every applicant completes California's three required courses and passes California's exam, regardless of licensure elsewhere.",
  },
  {
    q: "How long does the whole process take?",
    a: "The education alone takes a minimum of about 54 days, because you may not complete more than one 45-hour course within any 18-day period. Add application processing, Live Scan fingerprinting, and exam scheduling, and four to six months is realistic.",
  },
  {
    q: "Do you need a college degree?",
    a: "No. You must be 18 or older, complete the three required college-level courses, pass the exam, and be honest and truthful in your application, which includes a background check via Live Scan fingerprinting.",
  },
];

export default function ExamPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="wrap py-16">
          <p className="anno">Exam guide</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] sm:text-5xl">
            The California real estate salesperson exam
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed" style={{ color: "var(--ink-2)" }}>
            {EXAM.questions} multiple-choice questions. {EXAM.timeLabel}. You need {EXAM.passPct}{" "}
            percent to pass, which is {EXAM.passCorrect} correct answers. Here is what that actually
            involves.
          </p>
        </div>
      </section>

      <section className="wrap py-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">How the exam is weighted</h2>
        <p className="measure mt-4 leading-relaxed" style={{ color: "var(--ink-3)" }}>
          The DRE publishes the seven content areas and their approximate weightings. This is the
          single most useful piece of information for planning study time — agency alone is about a
          sixth of the exam, while transfer of property is half that.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="tabular w-full min-w-[34rem] text-sm">
            <caption className="sr-only">
              Content areas, weightings, and approximate question counts
            </caption>
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--rule-strong)" }}>
                <th className="anno pb-2 text-left font-normal">Content area</th>
                <th className="anno pb-2 text-right font-normal">Weight</th>
                <th className="anno pb-2 pl-6 text-right font-normal">Questions</th>
              </tr>
            </thead>
            <tbody>
              {BLUEPRINT.map((a) => (
                <tr key={a.id} className="border-b" style={{ borderColor: "var(--rule)" }}>
                  <td className="py-3.5 pr-6">
                    <span className="font-medium">{a.full}</span>
                    <span
                      aria-hidden
                      className="mt-2 block h-[3px]"
                      style={{ width: `${(a.weight / 25) * 100}%`, background: "var(--gold)" }}
                    />
                  </td>
                  <td className="py-3.5 text-right align-top font-semibold">{a.weight}%</td>
                  <td className="py-3.5 pl-6 text-right align-top" style={{ color: "var(--ink-3)" }}>
                    ~{a.perForm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm" style={{ color: "var(--ink-4)" }}>
          Weightings are approximate. Verify against the DRE&rsquo;s current published exam content
          outline before relying on them for study planning.
        </p>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--rule)", background: "var(--paper-2)" }}>
        <div className="wrap">
          <h2 className="text-2xl font-semibold sm:text-3xl">Common questions</h2>
          <dl className="mt-10 grid gap-x-14 gap-y-9 lg:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="border-t pt-5" style={{ borderColor: "var(--rule-strong)" }}>
                <dt className="font-display text-lg font-semibold">{f.q}</dt>
                <dd className="measure mt-2.5 leading-relaxed" style={{ color: "var(--ink-3)" }}>
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap py-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">Study the vocabulary</h2>
        <p className="measure mt-4 leading-relaxed" style={{ color: "var(--ink-3)" }}>
          A meaningful share of exam questions turn on knowing precisely what a term means —
          the difference between commingling and conversion, or between an easement appurtenant and
          one in gross. Our glossary defines the terms California tests.
        </p>
        <Link href="/glossary" className="btn btn-ink mt-7">
          Open the glossary
        </Link>
      </section>
    </>
  );
}
