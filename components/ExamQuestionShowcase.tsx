"use client";

import { useState } from "react";

export type ShowcaseQuestion = {
  id: string;
  courseLabel: string;
  unitLabel: string;
  stem: string;
  options: string[];
  answer: number;
  rationales: string[];
};

/**
 * The real product moment.
 *
 * These questions are read out of /content/question-bank at build time — they are
 * the actual authored items a student sits, not a mockup. Nothing here is
 * invented: no fabricated progress bars, no fake study streaks. If the bank
 * changes, this changes with it.
 */
export function ExamQuestionShowcase({ questions }: { questions: ShowcaseQuestion[] }) {
  const [active, setActive] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);

  const q = questions[active];
  if (!q) return null;

  const select = (index: number) => {
    if (choice === null) setChoice(index);
  };

  const switchTo = (index: number) => {
    setActive(index);
    setChoice(null);
  };

  return (
    <section className="showcase" aria-labelledby="showcase-title">
      <div className="wrap showcase-inner">
        <header className="showcase-head">
          <p className="anno">Sit a real one</p>
          <h2 id="showcase-title">
            Every question carries a written reason
            <em> for all four answers.</em>
          </h2>
          <p className="showcase-lede">
            Knowing you picked C is worthless. Knowing why A, B and D were built to catch
            you is how the exam gets beaten. These are pulled straight from the bank we
            have already written.
          </p>
        </header>

        <div className="showcase-body">
          <nav className="showcase-tabs" aria-label="Sample questions by course">
            {questions.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => switchTo(index)}
                aria-pressed={active === index}
                className={active === index ? "is-active" : undefined}
              >
                <span className="anno">{item.courseLabel}</span>
                <span className="showcase-tab-unit">{item.unitLabel}</span>
              </button>
            ))}
          </nav>

          <article className="question-card">
            <div className="question-meta">
              <span className="anno">{q.id}</span>
              <span className="anno">{q.courseLabel}</span>
            </div>

            <p className="question-stem">{q.stem}</p>

            {/* Polite live region: choosing an option reveals four rationales at
                once, and a screen-reader user needs that read back to them. */}
            <ul className="question-options" aria-live="polite">
              {q.options.map((option, index) => {
                const revealed = choice !== null;
                const isAnswer = index === q.answer;
                const isChoice = index === choice;
                const state = !revealed
                  ? ""
                  : isAnswer
                    ? " is-correct"
                    : isChoice
                      ? " is-wrong"
                      : " is-muted";

                return (
                  <li key={option} className={`question-option${state}`}>
                    <button type="button" onClick={() => select(index)} disabled={revealed}>
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{option}</span>
                    </button>
                    {revealed && (
                      <p className="option-why">{q.rationales[index]}</p>
                    )}
                  </li>
                );
              })}
            </ul>

            <footer className="question-foot">
              {choice === null ? (
                <p className="anno">Choose an answer to see all four rationales</p>
              ) : (
                <button type="button" className="question-reset" onClick={() => setChoice(null)}>
                  Reset question
                </button>
              )}
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
