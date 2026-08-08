"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion } from "@/lib/content";

type Props = {
  questions: QuizQuestion[];
  courseSlug: string;
  unitNumber: number;
  passPct?: number;
};

/**
 * Unit quiz with per-option rationales.
 *
 * The teaching happens in the rationales: after answering, the student sees why
 * every option is right or wrong, not just which one was correct. That is the
 * pedagogical core of the bank (CLAUDE.md §8) and the reason each item carries
 * four written explanations.
 *
 * ⚠️ Client-side scoring is acceptable for an ungraded practice quiz. Course
 * FINAL exams must be served and scored server-side with pacing enforcement,
 * rotating forms, and identity re-verification (CLAUDE.md §3.2) — do not reuse
 * this component for them.
 */
export default function UnitQuiz({ questions, courseSlug, unitNumber, passPct = 70 }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const correctCount = useMemo(
    () => questions.filter((q) => answers[q.id] === q.answer).length,
    [answers, questions]
  );

  const answeredCount = Object.keys(answers).length;
  const scorePct = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
  const passed = scorePct >= passPct;

  function choose(q: QuizQuestion, index: number) {
    if (revealed[q.id]) return;
    setAnswers((a) => ({ ...a, [q.id]: index }));
    setRevealed((r) => ({ ...r, [q.id]: true }));
  }

  function reset() {
    setAnswers({});
    setRevealed({});
    setSubmitted(false);
    window.scrollTo({ top: document.getElementById("quiz")?.offsetTop ?? 0 });
  }

  if (questions.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--ink-3)" }}>
        No quiz has been authored for this unit yet.
      </p>
    );
  }

  return (
    <div id="quiz">
      <div
        className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y py-4"
        style={{ borderColor: "var(--rule-strong)" }}
      >
        <p className="anno">
          {answeredCount} of {questions.length} answered
        </p>
        {answeredCount > 0 && (
          <p className="tabular text-sm">
            <span style={{ color: "var(--ink-3)" }}>Correct so far: </span>
            <span className="font-semibold">
              {correctCount}/{answeredCount}
            </span>
          </p>
        )}
      </div>

      <ol className="flex flex-col gap-12">
        {questions.map((q, qi) => {
          const chosen = answers[q.id];
          const isRevealed = revealed[q.id];

          return (
            <li key={q.id}>
              <div className="flex items-baseline gap-3">
                <span className="anno tabular shrink-0" style={{ color: "var(--gold-deep)" }}>
                  {String(qi + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold leading-snug">{q.stem}</h3>
              </div>

              <ul className="mt-5 flex flex-col gap-2.5 pl-[2.1rem]">
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.answer;
                  const isChosen = chosen === oi;

                  let borderColor = "var(--rule)";
                  let bg = "var(--paper-2)";
                  if (isRevealed && isCorrect) {
                    borderColor = "var(--seal)";
                    bg = "color-mix(in srgb, var(--seal) 8%, var(--paper-2))";
                  } else if (isRevealed && isChosen) {
                    borderColor = "var(--gold-deep)";
                    bg = "var(--gold-wash)";
                  }

                  return (
                    <li key={oi}>
                      <button
                        type="button"
                        onClick={() => choose(q, oi)}
                        disabled={isRevealed}
                        aria-pressed={isChosen}
                        className="w-full border p-4 text-left text-sm transition disabled:cursor-default"
                        style={{ borderColor, background: bg }}
                      >
                        <span className="flex gap-3">
                          <span
                            className="anno shrink-0"
                            style={{ color: isRevealed && isCorrect ? "var(--seal)" : undefined }}
                          >
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </span>

                        {isRevealed && (
                          <span
                            className="mt-3 block border-l-2 pl-4 text-[0.8125rem] leading-relaxed"
                            style={{
                              borderColor: isCorrect ? "var(--seal)" : "var(--rule-strong)",
                              color: "var(--ink-3)",
                            }}
                          >
                            {q.rationales[oi]}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>

      <div className="mt-14 border-t pt-8" style={{ borderColor: "var(--rule-strong)" }}>
        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={answeredCount < questions.length}
            className="btn btn-ink disabled:opacity-40"
          >
            {answeredCount < questions.length
              ? `Answer all ${questions.length} to see your score`
              : "See my score"}
          </button>
        ) : (
          <div>
            <p className="anno">Unit {unitNumber} result</p>
            <p className="mt-3 font-display text-4xl font-semibold tabular">
              {scorePct}%
              <span className="ml-3 text-lg font-normal" style={{ color: "var(--ink-3)" }}>
                {correctCount} of {questions.length}
              </span>
            </p>
            <p
              className="mt-3 text-sm font-medium"
              style={{ color: passed ? "var(--seal)" : "var(--gold-deep)" }}
            >
              {passed
                ? `At or above the ${passPct}% standard. Review anything you missed before moving on.`
                : `Below the ${passPct}% standard. Re-read the unit and try again — this quiz is unlimited.`}
            </p>
            <button type="button" onClick={reset} className="btn btn-line mt-7">
              Retake quiz
            </button>
          </div>
        )}
        <p className="mt-6 text-xs leading-relaxed" style={{ color: "var(--ink-4)" }}>
          Unit quizzes are practice and may be retaken without limit. They are not the course final
          exam, which is timed, closed-book, and subject to pacing requirements.
        </p>
      </div>
    </div>
  );
}
