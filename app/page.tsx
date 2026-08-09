import Link from "next/link";
import { InteractiveCoursePreview } from "@/components/InteractiveCoursePreview";

const principles = [
  { n: "01", title: "Understand it", copy: "Clear explanations turn legal language into ideas you can actually use." },
  { n: "02", title: "Work through it", copy: "Realistic decisions show how the rule changes what happens next." },
  { n: "03", title: "Remember it", copy: "Frequent retrieval practice makes the important ideas stick." },
];

const courses = [
  { number: "01", title: "Real Estate Principles", detail: "The foundations behind property, agency, contracts, finance, and every transaction.", units: "18 units" },
  { number: "02", title: "Real Estate Practice", detail: "The day-to-day judgment, communication, risk management, and skills of the work.", units: "15 units" },
  { number: "03", title: "Legal Aspects of Real Estate", detail: "The California rules that protect your clients, your career, and your license.", units: "15 units" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden className="arrow-icon">{diagonal ? "↗" : "→"}</span>;
}

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-grain" aria-hidden />
        <div className="wrap hero-wrap">
          <div className="hero-topline">
            <span className="status-pill"><i /> California course in development</span>
            <span className="hero-state-note">One national learning platform · California first</span>
          </div>

          <div className="hero-composition">
            <div className="hero-message">
              <p className="eyebrow">Your next career starts with clarity</p>
              <h1>Learn the work.<br /><em>Earn the license.</em></h1>
              <p className="hero-lede">
                Real estate education rebuilt for people who want more than a certificate—
                they want to walk into the industry ready.
              </p>
              <div className="hero-actions">
                <Link href="#notify" className="button button-primary">Join the launch list <Arrow /></Link>
                <Link href="/courses" className="button button-quiet">Explore California <Arrow diagonal /></Link>
              </div>
              <p className="hero-fineprint">No payment today. California course approval is pending.</p>
            </div>

            <div className="hero-visual" aria-label="A learning journey from first lesson to real estate career">
              <div className="career-card career-card-main">
                <div className="career-card-head"><span>LICENSEPATH / CA</span><span>FOUNDATION</span></div>
                <div className="career-card-copy">
                  <span className="lesson-kicker">Today’s lesson</span>
                  <strong>Agency is a promise,<br />not just a definition.</strong>
                  <p>See the duty. Make the call. Explain why.</p>
                </div>
                <div className="lesson-progress"><span style={{ width: "64%" }} /></div>
                <div className="career-card-foot"><span>Unit 06 of 18</span><b>12 min left</b></div>
              </div>
              <div className="career-card career-card-note">
                <span className="note-mark">✓</span>
                <div><small>CONCEPT MASTERED</small><strong>Fiduciary duties</strong></div>
              </div>
              <div className="career-card career-card-path">
                <small>YOUR PATH</small><strong>California</strong><span>More states coming next</span>
              </div>
              <svg className="hero-path" viewBox="0 0 580 570" aria-hidden="true">
                <path d="M42 458C172 458 105 310 237 310S304 128 458 128" />
                <circle cx="42" cy="458" r="7" /><circle cx="237" cy="310" r="7" /><circle cx="458" cy="128" r="11" />
              </svg>
              <span className="path-label path-label-start">START</span>
              <span className="path-label path-label-finish">LICENSE</span>
            </div>
          </div>

          <div className="hero-metrics" aria-label="California course facts">
            <div><strong>135</strong><span>education hours</span></div>
            <div><strong>3</strong><span>required courses</span></div>
            <div><strong>48</strong><span>guided units</span></div>
            <p>Built from the requirements up.<br />Designed around the learner.</p>
          </div>
        </div>
      </section>

      <section className="manifesto wrap">
        <div>
          <p className="eyebrow">The category needs a reset</p>
          <h2>Most licensing courses help you finish. We want to help you <em>begin.</em></h2>
        </div>
        <div className="manifesto-copy">
          <p>Passing matters. But your first client will not ask how quickly you clicked through a course. They will trust you to understand the rules, explain the choices, and protect what may be their largest investment.</p>
          <Link href="/about" className="text-link">Why we’re building LicensePath <Arrow /></Link>
        </div>
      </section>

      <section className="method-section">
        <div className="wrap">
          <div className="section-heading">
            <p className="eyebrow">A better learning loop</p>
            <h2>Knowledge that moves<br />from page to practice.</h2>
          </div>
          <div className="method-grid">
            {principles.map((item) => (
              <article key={item.n} className="method-card">
                <span>{item.n}</span><h3>{item.title}</h3><p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InteractiveCoursePreview />

      <section className="curriculum-section">
        <div className="wrap curriculum-layout">
          <div className="curriculum-intro">
            <p className="eyebrow">California · the first path</p>
            <h2>One connected<br />curriculum.</h2>
            <p>Every course has a distinct job. Together, they build the foundation for California’s salesperson exam and the work that comes after it.</p>
            <Link href="/courses" className="button button-outline">See the full curriculum <Arrow /></Link>
          </div>
          <div className="course-list">
            {courses.map((course) => (
              <Link href="/courses" className="course-row" key={course.number}>
                <span className="course-number">{course.number}</span>
                <div><small>{course.units} · 45 hours</small><h3>{course.title}</h3><p>{course.detail}</p></div>
                <Arrow diagonal />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="states-section wrap">
        <div className="states-art" aria-hidden>
          <span className="state-line state-line-one" /><span className="state-line state-line-two" />
          <strong>CA</strong><i /><b>01</b>
        </div>
        <div className="states-copy">
          <p className="eyebrow">Built to travel</p>
          <h2>Real estate is local.<br />Great learning is universal.</h2>
          <p>LicensePath is a national school in the making. We are starting in California, then building state-specific paths with the same standard: current rules, clear teaching, and a learning experience worthy of your ambition.</p>
          <div className="states-roadmap"><span><i className="is-live" /> California <small>FIRST</small></span><span><i /> More states <small>PLANNED</small></span></div>
        </div>
      </section>

      <section id="notify" className="launch-panel">
        <div className="wrap launch-layout">
          <div><p className="eyebrow">Early access</p><h2>Be there when the<br />first path opens.</h2></div>
          <div>
            <p>Get approval updates, an invitation to preview the learning experience, and founding-cohort pricing when California enrollment can open.</p>
            <form className="launch-form-new" action="/api/leads" method="post">
              <label htmlFor="launch-email">Email address</label>
              <div><input id="launch-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" /><button type="submit" aria-label="Join the launch list">Join the list <Arrow /></button></div>
            </form>
            <small>No spam. No payment. Just useful launch updates.</small>
          </div>
        </div>
      </section>
    </>
  );
}
