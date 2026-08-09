"use client";

import { useState } from "react";

const courses = [
  {
    id: "principles",
    eyebrow: "Course 01 · 45 hours",
    title: "Real Estate Principles",
    progress: 68,
    unit: "Unit 08 · Contracts & offer essentials",
    lesson: "The exact structure that turns a conversation into an enforceable agreement.",
    quiz: "You’ve got this",
    color: "var(--violet)",
    badge: "Foundation",
  },
  {
    id: "practice",
    eyebrow: "Course 02 · 45 hours",
    title: "Real Estate Practice",
    progress: 42,
    unit: "Unit 11 · Disclosures & risk",
    lesson: "Practice the decisions that protect clients and your license.",
    quiz: "Scenario ready",
    color: "var(--aqua)",
    badge: "Most practical",
  },
  {
    id: "legal",
    eyebrow: "Course 03 · 45 hours",
    title: "Legal Aspects",
    progress: 18,
    unit: "Unit 02 · Agency law",
    lesson: "See how duties, disclosures, and conflicts apply under pressure.",
    quiz: "Deep dive",
    color: "var(--coral)",
    badge: "Elective",
  },
];

export function InteractiveCoursePreview() {
  const [active, setActive] = useState(0);
  const course = courses[active];

  return (
    <section className="experience-shell" aria-labelledby="experience-title">
      <div className="experience-copy">
        <p className="eyebrow">Built for the way you actually learn</p>
        <h2 id="experience-title">A course should feel like momentum.</h2>
        <p>
          Short teaching blocks, realistic California decisions, clear progress, and exam-style
          retrieval practice—without the dated, click-next experience.
        </p>
        <div className="experience-tabs" role="tablist" aria-label="Course preview">
          {courses.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.title.replace("Real Estate ", "")}
            </button>
          ))}
        </div>
      </div>

      <div className="study-window" style={{ "--course-color": course.color } as React.CSSProperties}>
        <div className="window-topbar">
          <span className="window-mark">lp</span>
          <span>My learning path</span>
          <span className="window-status">Live preview</span>
        </div>
        <div className="study-content">
          <div className="study-rail">
            <span className="rail-active" />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="study-main">
            <div className="study-label-row">
              <span>{course.eyebrow}</span>
              <span className="study-badge">{course.badge}</span>
            </div>
            <h3>{course.title}</h3>
            <div className="progress-block">
              <div className="progress-copy">
                <span>Course progress</span>
                <strong>{course.progress}%</strong>
              </div>
              <div className="progress-track">
                <span style={{ width: `${course.progress}%` }} />
              </div>
            </div>
            <article className="lesson-card">
              <p>Up next</p>
              <h4>{course.unit}</h4>
              <span>{course.lesson}</span>
              <button type="button">Resume lesson <b>→</b></button>
            </article>
          </div>
          <aside className="study-side">
            <p>Quick check</p>
            <div className="mini-question">
              <span className="mini-orb">?</span>
              <strong>{course.quiz}</strong>
              <small>1 question · 45 sec</small>
            </div>
            <div className="streak-card">
              <span>Study streak</span>
              <strong>07</strong>
              <small>days in a row</small>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
