"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HEARTBEAT_MS = 30_000;
const IDLE_TIMEOUT_MS = 10 * 60_000;
const ACTIVITY_EVENTS = ["mousemove", "keydown", "scroll", "click", "touchstart"] as const;

type Props = { courseSlug: string; unitNumber: number; enrollmentId?: string };
type State = "preview" | "connecting" | "active" | "paused" | "sign-in" | "unavailable";

function getDeviceId() {
  const key = "licensepath:learning-device-id";
  const stored = window.sessionStorage.getItem(key);
  if (stored) return stored;
  const id = window.crypto.randomUUID();
  window.sessionStorage.setItem(key, id);
  return id;
}

/**
 * Browser activity reporter for an enrolled student. It sends no duration: the
 * server uses its own clock, enrollment checks, and RLS-protected records.
 * Without a real enrollment, coursework remains in clearly labeled preview mode.
 */
export default function SeatTimeTracker({ courseSlug: _courseSlug, unitNumber, enrollmentId }: Props) {
  const [seconds, setSeconds] = useState(0);
  const [state, setState] = useState<State>(enrollmentId ? "connecting" : "preview");
  const lastActivity = useRef(Date.now());
  const deviceId = useRef<string | null>(null);

  useEffect(() => { deviceId.current = getDeviceId(); }, []);

  const markActive = useCallback(() => { lastActivity.current = Date.now(); }, []);
  useEffect(() => {
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, markActive, { passive: true }));
    return () => ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, markActive));
  }, [markActive]);

  useEffect(() => {
    if (!enrollmentId) return;
    let cancelled = false;

    async function heartbeat() {
      const inactive = Date.now() - lastActivity.current >= IDLE_TIMEOUT_MS || document.visibilityState === "hidden";
      if (inactive) { if (!cancelled) setState("paused"); return; }
      if (!deviceId.current) return;

      try {
        const response = await fetch("/api/learning/heartbeat", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enrollmentId, unitNumber, deviceId: deviceId.current }),
          cache: "no-store",
        });
        const result = (await response.json()) as { totalSeconds?: number };
        if (cancelled) return;
        if (response.status === 401) return setState("sign-in");
        if (response.status === 503) return setState("unavailable");
        if (!response.ok) return setState("paused");
        setSeconds(Number(result.totalSeconds ?? 0));
        setState("active");
      } catch { if (!cancelled) setState("unavailable"); }
    }

    heartbeat();
    const timer = window.setInterval(heartbeat, HEARTBEAT_MS);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, [enrollmentId, unitNumber]);

  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const label = hrs > 0 ? `${hrs}h ${mins % 60}m` : `${mins}m`;
  const labels: Record<State, string> = {
    preview: "Preview mode", connecting: "Connecting", active: "Official time", paused: "Paused",
    "sign-in": "Sign in required", unavailable: "Records offline",
  };

  return (
    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--ink-3)" }} aria-live="polite">
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: state === "active" ? "var(--seal)" : "var(--ink-4)" }} />
      <span className="anno" style={{ fontSize: "0.6875rem" }}>{labels[state]}</span>
      {enrollmentId && <span className="tabular font-medium" style={{ color: "var(--ink-2)" }}>{label}</span>}
    </div>
  );
}
