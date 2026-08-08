import Link from "next/link";

const courses = [
  {
    name: "Real Estate Principles",
    hours: 45,
    units: 18,
    blurb:
      "License law, property, estates, agency, contracts, disclosures, escrow, finance, appraisal, land use, fair housing, taxation, and the transaction lifecycle.",
  },
  {
    name: "Real Estate Practice",
    hours: 45,
    units: 15,
    blurb:
      "Running a compliant practice: prospecting, listing presentations, pricing, offers, contract-to-close, trust funds, and the required fair housing and implicit bias component.",
  },
  {
    name: "Legal Aspects of Real Estate",
    hours: 45,
    units: 15,
    blurb:
      "The elective: agency and contract law in depth, conveyancing, finance and foreclosure law, landlord–tenant, land use, fair housing enforcement, and license discipline.",
  },
];

const differentiators = [
  {
    title: "An AI tutor on every lesson",
    body: "Ask a question at 11pm and get an answer grounded in the exact course text you are reading — not a generic chatbot, and not a search engine.",
  },
  {
    title: "Built to the California exam blueprint",
    body: "Practice questions are written to the DRE's published content areas and weightings, with a written explanation for every answer choice — including why the wrong ones are wrong.",
  },
  {
    title: "Taught by working California agents",
    body: "Every example is a real Southern California transaction: San Gabriel Valley, Inland Empire, LA, Orange County. Written by agents who close deals, not textbook editors.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="container-content grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <p className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-light">
              Pending DRE approval
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Get your California real estate license.
              <span className="block text-gold"> Actually understand it.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              LicensePath is a California pre-licensing school built by practicing agents. Three
              45-hour courses, an AI tutor grounded in our own curriculum, and exam preparation
              matched to the state exam blueprint.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/pricing" className="btn-primary bg-gold text-navy hover:bg-gold-light">
                See pricing
              </Link>
              <Link
                href="/exam"
                className="btn-secondary border-white/60 text-white hover:bg-white hover:text-navy"
              >
                How the exam works
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Courses are pending approval by the California DRE and are not yet offered for sale.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-7">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
                The California Salesperson Exam
              </h2>
              <dl className="mt-6 space-y-5">
                {[
                  ["Questions", "150 multiple choice"],
                  ["Time limit", "3 hours 15 minutes"],
                  ["Passing score", "70% — 105 correct"],
                  ["Required courses", "Three 45-hour courses"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                    <dt className="text-sm text-white/70">{k}</dt>
                    <dd className="text-right font-display font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-white/50">
                California does not offer license reciprocity with any other state. Every applicant
                completes California&rsquo;s education and passes California&rsquo;s exam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="container-content py-20">
        <h2 className="max-w-3xl text-3xl font-bold text-navy sm:text-4xl">
          Most schools sell you a PDF and a video library.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[color:var(--ink-muted)]">
          We built the thing we wished existed when we got licensed.
        </p>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {differentiators.map((d) => (
            <div key={d.title} className="rounded-2xl border border-navy/10 bg-white p-7">
              <h3 className="font-display text-xl font-semibold text-navy">{d.title}</h3>
              <p className="mt-3 leading-relaxed text-[color:var(--ink-muted)]">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="bg-surface-alt py-20">
        <div className="container-content">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">The three required courses</h2>
          <p className="mt-4 max-w-2xl text-lg text-[color:var(--ink-muted)]">
            California requires three college-level courses before you can sit for the salesperson
            exam. Principles, Practice, and one elective — ours is Legal Aspects of Real Estate.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {courses.map((c, i) => (
              <article key={c.name} className="flex flex-col rounded-2xl border border-navy/10 bg-white p-7">
                <p className="font-display text-sm font-semibold text-gold-dark">
                  Course {i + 1}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-navy">{c.name}</h3>
                <p className="mt-1 text-sm font-medium text-[color:var(--ink-muted)]">
                  {c.hours} hours · {c.units} units
                </p>
                <p className="mt-4 flex-1 leading-relaxed text-[color:var(--ink-muted)]">{c.blurb}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[color:var(--ink-muted)]">
            <strong className="text-navy">Course pacing:</strong> California limits how quickly the
            statutory courses may be completed — no more than one 45-hour course within any 18-day
            period. All three therefore take a minimum of roughly 54 days.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="container-content py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
              Built by agents who actually sell
            </h2>
            <p className="mt-5 leading-relaxed text-[color:var(--ink-muted)]">
              LicensePath was founded by Christopher Rabadi and Ramzi Rabadi, practicing California
              licensees working in the San Gabriel Valley and across Southern California. Between
              them, more than eighteen years in the business and over $100 million in transaction
              volume.
            </p>
            <p className="mt-4 leading-relaxed text-[color:var(--ink-muted)]">
              That matters because the difference between passing the exam and being able to do the
              job is real-world context — knowing why a lis pendens stops a closing, or why a
              nonconforming use that sat vacant for three years is no longer worth anything.
            </p>
            <Link href="/about" className="btn-secondary mt-8">
              Meet the founders
            </Link>
          </div>
          <div className="space-y-5">
            {[
              ["Christopher Rabadi", "CA DRE Salesperson #02246356", "The Rabadi Group at Agency 8 Real Estate Group"],
              ["Ramzi Rabadi", "CA DRE #01738777", "18+ years practicing; content reviewer and instructor-of-record candidate"],
            ].map(([name, license, role]) => (
              <div key={name} className="rounded-2xl border border-navy/10 bg-white p-7">
                <h3 className="font-display text-xl font-semibold text-navy">{name}</h3>
                <p className="mt-1 text-sm font-medium text-gold-dark">{license}</p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)]">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
