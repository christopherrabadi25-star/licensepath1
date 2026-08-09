"use client";

import { useState } from "react";

const views = [
  { label: "Learn", title: "Agency starts with trust", copy: "A fiduciary relationship changes what you must disclose, protect, and put first.", meta: "7 min read", progress: 42 },
  { label: "Apply", title: "Your buyer tells you a secret", copy: "What can you share with the listing agent? Work through the duty before you reveal the answer.", meta: "Scenario 2 of 4", progress: 68 },
  { label: "Practice", title: "Which duty continues?", copy: "Choose an answer, then learn why every option is right or wrong—not just which bubble to click.", meta: "Question 6 of 10", progress: 84 },
];

export function InteractiveCoursePreview() {
  const [active, setActive] = useState(0);
  const view = views[active];

  return (
    <section className="product-section" aria-labelledby="product-title">
      <div className="wrap product-layout">
        <div className="product-copy">
          <p className="eyebrow">See the difference</p>
          <h2 id="product-title">A study space that gets out of your way.</h2>
          <p>One focused idea at a time. Your place is always saved, your progress always makes sense, and practice is woven into the lesson—not bolted on at the end.</p>
          <div className="preview-tabs" role="tablist" aria-label="Learning method preview">
            {views.map((item, index) => (
              <button key={item.label} type="button" role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}>
                <span>0{index + 1}</span>{item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="learning-browser">
          <div className="browser-bar"><span className="browser-logo">LP</span><span>Real Estate Principles</span><b>Unit 06 / 18</b></div>
          <div className="browser-progress"><span style={{ width: `${view.progress}%` }} /></div>
          <div className="browser-body">
            <aside aria-label="Unit sections"><i className="complete">✓</i><i className="active">2</i><i>3</i><i>4</i></aside>
            <article key={view.label} className="preview-content">
              <div className="preview-label"><span>{view.label}</span><small>{view.meta}</small></div>
              <h3>{view.title}</h3><p>{view.copy}</p>
              <div className="concept-card"><small>THE IDEA TO KEEP</small><strong>Your client’s interest comes before your own.</strong></div>
              <button type="button" onClick={() => setActive((active + 1) % views.length)}>Continue lesson <span aria-hidden>→</span></button>
            </article>
            <div className="browser-notes"><small>MY NOTES</small><p>Agency = consent + control</p><span>Saved just now</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
