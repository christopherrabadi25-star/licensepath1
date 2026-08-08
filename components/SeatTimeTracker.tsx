"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HEARTBEAT_MS = 15_000; // how often engaged time accrues
const IDLE_TIMEOUT_MS = 10 * 60_000; // pause after 10 minutes idle (CLAUDE.md §3.2)
const ACTIVITY_EVENTS = ["mousemove", "keydown", "scroll", "click", "touchstart"] as const;

type Props = { courseSlug: string; unitNumber: number };

/**
 * Tracks engaged time on a lesson: accrues on a heartbeat, pauses after 10
 * minutes without interaction, and pauses when the tab is hidden.
 *
 * ⚠️ COMPLIANCE SEAM — CLAUDE.md §3.2 requires seat time to be enforced
 * SERVER-SIDE. This component is the client half only. It currently persists to
 * localStorage so the player works before Supabase exists, which means a
 * determined student could edit it. Before any DRE submission or paid
 * enrollment, the heartbeat must POST to an authenticated endpoint that writes
 * to `seat_time_logs`, and the server — not this component — must be the
 * system of record. Do not treat localStorage totals as auditable.
 */
export default function SeatTimeTracker({ courseSlug, unitNumber }: Props) {
  const storageKey = `lp:seat:${courseSlug}:${unitNumber}`;

  const [seconds, setSeconds] = useState(0);
  const [idle, setIdle] = useState(false);
  const lastActivity = useRef(Date.now());
  const loaded = useRef(false);

  // Restore any prior accrued time for this unit.
  useEffect(() => {
    const stored = Number(window.localStorage.getItem(storageKey) ?? 0);
    if (Number.isFinite(stored)) setSeconds(stored);
    loaded.current = true;
  }, [storageKey]);

  const markActive = useCallback(() => {
    lastActivity.current = Date.now();
    setIdle(false);
  }, []);

  useEffect(() => {
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, markActive, { passive: true }));
    return () =>
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, markActive));
  }, [markActive]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      const idleFor = Date.now() - lastActivity.current;
      const hidden = document.visibilityState === "hidden";

      if (idleFor >= IDLE_TIMEOUT_MS || hidden) {
        setIdle(true);
        return;
      }

      setSeconds((prev) => {
        const next = prev + HEARTBEAT_MS / 1000;
        if (loaded.current) window.localStorage.setItem(storageKey, String(next));
        return next;
      });
    }, HEARTBEAT_MS);

    return () => window.clearInterval(tick);
  }, [storageKey]);

  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const label = hrs > 0 ? `${hrs}h ${mins % 60}m` : `${mins}m`;

  return (
    <div
      className="flex items-center gap-2 text-xs"
      style={{ color: "var(--ink-3)" }}
      aria-live="off"
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: idle ? "var(--ink-4)" : "var(--seal)" }}
      />
      <span className="anno" style={{ fontSize: "0.6875rem" }}>
        {idle ? "Paused" : "Time on unit"}
      </span>
      <span className="tabular font-medium" style={{ color: "var(--ink-2)" }}>
        {label}
      </span>
    </div>
  );
}
