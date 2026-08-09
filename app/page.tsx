import Link from "next/link";
import { InteractiveCoursePreview } from "@/components/InteractiveCoursePreview";

const outcomes = [
  ["01", "Know the path", "Exactly what California requires, in plain English."],
  ["02", "Build confidence", "Learn the ideas, then apply them to real decisions."],
  ["03", "Show up ready", "Practice retrieving what the exam is actually testing."],
];

const proof = [
  ["135", "required education hours"],
  ["3", "courses in one guided path"],
  ["150", "questions on the state exam"],
];

export default function HomePage() {
  return (
    <>
      <section className="hero-stage">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid" aria-hidden />
        <div className="wrap hero-inner">
          <div className="hero-trust">
            <span className="pulse-dot" />
            California real estate pre-licensing · approval pending
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">Make your next career move count</p>
              <h1>Start sharp.<br /><em>Stay unstoppable.</em></h1>
              <p className="hero-lede">
                California real estate education with the clarity, momentum, and practice that
                modern learners deserve.
              </p>
              <div className="hero-actions">
                <Link href="/#notify" className="hero-primary">Join the launch list <span>→</span></Link>
                <Link href="/courses" className="hero-secondary">Explore the curriculum <span>↗</span></Link>
              </div>
              <p className="hero-note">No course sales yet. We’ll open enrollment only after DRE approval.</p>
            </div>
            <div className="hero-orbit" aria-label="California real estate license learning path preview">
              <div className="orbit-ring orbit-ring-large" />
              <div className="orbit-ring orbit-ring-small" />
              <div className="orbit-label orbit-label-top">CALIFORNIA · 2026</div>
              <div className="orbit-label orbit-label-bottom">LEARN · PRACTICE · PASS</div>
              <div className="license-card">
                <div className="license-card-top"><span>LICENSEPATH</span><span>01 / 03</span></div>
                <div className="license-card-body">
                  <span className="card-orb">LP</span>
                  <div><small>YOUR NEXT CHAPTER</small><strong>Real estate,<br />reimagined.</strong></div>
                </div>
                <div className="license-card-bottom"><span>California salesperson path</span><b>↗</b></div>
              </div>
              <div className="float-tag float-tag-left"><span>✦</span> Interactive lessons</div>
              <div className="float-tag float-tag-right"><span>↗</span> Exam-weighted practice</div>
            </div>
          </div>
          <div className="hero-proof">
            {proof.map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}
            <p>Built around the California salesperson path.</p>
          </div>
        </div>
      </section>

      <section className="belief-section wrap">
        <div className="belief-heading">
          <p className="eyebrow">Not another stale online course</p>
          <h2>The old way of getting licensed was designed to be endured.</h2>
        </div>
        <div className="belief-copy">
          <p>Dense PDFs. Generic examples. A progress bar that makes you feel nothing. LicensePath is being built to make the process feel clear, relevant, and worth showing up for.</p>
          <Link href="/about">Why we’re building this <span>→</span></Link>
        </div>
      </section>

      <section className="outcome-band">
        <div className="wrap outcome-grid">
          {outcomes.map(([number, title, body]) => (
            <article key={number} className="outcome-card">
              <span>{number}</span><h3>{title}</h3><p>{body}</p><b>↗</b>
            </article>
          ))}
        </div>
      </section>

      <InteractiveCoursePreview />

      <section className="path-section wrap">
        <div className="path-intro">
          <p className="eyebrow">One complete path</p>
          <h2>Less hunting around.<br /><em>More forward motion.</em></h2>
          <p>Three required courses. One place to understand the exam, learn the concepts, and build momentum toward your license.</p>
          <Link href="/courses" className="dark-link">See all courses <span>→</span></Link>
        </div>
        <div className="path-stack">
          {[
            ["01", "Real Estate Principles", "The concepts behind every transaction.", "18 units", "violet"],
            ["02", "Real Estate Practice", "The work you will actually do.", "15 units", "aqua"],
            ["03", "Legal Aspects", "The elective that makes the rules make sense.", "15 units", "coral"],
          ].map(([n, title, body, units, tone]) => (
            <article className={`path-card path-${tone}`} key={n}>
              <div className="path-number">{n}</div><div><p>{units} · 45 hours</p><h3>{title}</h3><span>{body}</span></div><b>→</b>
            </article>
          ))}
        </div>
      </section>

      <section className="launch-section">
        <div className="launch-orb launch-orb-one" /><div className="launch-orb launch-orb-two" />
        <div id="notify" className="wrap launch-inner">
          <p className="eyebrow">The first cohort is forming</p>
          <h2>Be first through<br />the <em>door.</em></h2>
          <p>Join the early-access list for launch updates, course approval news, and founding-cohort pricing when enrollment opens.</p>
          <form className="launch-form" action="/api/leads" method="post">
            <label className="sr-only" htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
            <button type="submit">Get launch access <span>→</span></button>
          </form>
          <small>We’ll send useful updates, not an annoying daily sequence.</small>
        </div>
      </section>
    </>
  );
}
