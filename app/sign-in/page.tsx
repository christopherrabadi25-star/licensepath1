"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return setMessage("Sign-in will be available when LicensePath connects its student system.");
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/learn` },
    });
    setSending(false);
    setMessage(error ? "We could not send that sign-in link. Please try again." : "Check your email for your secure sign-in link.");
  }

  return <div className="wrap py-20"><div className="measure"><p className="anno">Student access</p><h1 className="mt-3 text-4xl font-semibold">Continue learning</h1><p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>Use the email connected to your LicensePath enrollment. We’ll send a secure, passwordless link.</p><form onSubmit={submit} className="mt-8 flex max-w-md flex-col gap-4"><label className="text-sm font-medium" htmlFor="email">Email address</label><input id="email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border bg-[color:var(--paper)] px-4 py-3" style={{ borderColor: "var(--rule-strong)" }} placeholder="you@example.com"/><button className="btn btn-ink w-fit" disabled={sending}>{sending ? "Sending…" : "Email me a sign-in link"}</button></form>{message && <p className="mt-5 text-sm" role="status" style={{ color: "var(--ink-3)" }}>{message}</p>}<p className="mt-10 text-xs leading-relaxed" style={{ color: "var(--ink-4)" }}>Preview course content does not create an enrollment or record official course time.</p></div></div>;
}
