import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About LicensePath — Built by Licensed California Agents",
  description:
    "LicensePath is a California real estate school founded by Christopher Rabadi (DRE #02246356) and Ramzi Rabadi (DRE #01738777), practicing licensees in Southern California.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="wrap py-16">
          <p className="anno">About</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            A school built by people who still sell houses
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed" style={{ color: "var(--ink-2)" }}>
            LicensePath is a family business. It is being built by two licensed California agents
            working in the San Gabriel Valley and across Southern California.
          </p>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="grid gap-px" style={{ background: "var(--rule)" }}>
          {[
            {
              name: "Christopher Rabadi",
              lic: "CA DRE Salesperson #02246356",
              body: "Co-founder. Works with The Rabadi Group at Agency 8 Real Estate Group, serving buyers and sellers across the San Gabriel Valley and greater Los Angeles.",
            },
            {
              name: "Ramzi Rabadi",
              lic: "CA DRE #01738777",
              body: "Co-founder, content reviewer, and instructor-of-record candidate. More than eighteen years licensed in California. Every unit of curriculum passes through his review before it is considered complete.",
            },
          ].map((p) => (
            <div key={p.name} className="p-8" style={{ background: "var(--paper)" }}>
              <h2 className="font-display text-2xl font-semibold">{p.name}</h2>
              <p className="anno mt-2" style={{ color: "var(--gold-deep)" }}>
                {p.lic}
              </p>
              <p className="measure mt-4 leading-relaxed" style={{ color: "var(--ink-3)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs" style={{ color: "var(--ink-4)" }}>
          Both license numbers can be verified through the California DRE public license lookup.
        </p>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--rule)", background: "var(--paper-2)" }}>
        <div className="wrap">
          <h2 className="text-2xl font-semibold sm:text-3xl">How we write the curriculum</h2>
          <div className="mt-9 grid gap-x-14 gap-y-8 lg:grid-cols-3">
            {[
              {
                h: "Original, not licensed from a vendor",
                b: "Every lesson, definition, and practice question is written from scratch for LicensePath. We do not license a national course package and swap in California facts, and we do not reproduce real state exam questions.",
              },
              {
                h: "California law, not generic law",
                b: "Where California differs from what national study materials teach — and it differs often — we teach the California rule and say plainly that the national version is wrong here.",
              },
              {
                h: "Reviewed before it ships",
                b: "Draft content is not the same as approved content. Every unit is reviewed by a licensed California broker, and the full curriculum goes to the DRE for approval before we enroll anyone.",
              },
            ].map((c) => (
              <div key={c.h} className="border-t pt-5" style={{ borderColor: "var(--rule-strong)" }}>
                <h3 className="font-display text-lg font-semibold">{c.h}</h3>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">Want to know when it opens?</h2>
        <p className="measure mt-4 leading-relaxed" style={{ color: "var(--ink-3)" }}>
          We will email you once, when the DRE approves our courses and enrollment opens.
        </p>
        <Link href="/#notify" className="btn btn-ink mt-7">
          Get launch updates
        </Link>
      </section>
    </>
  );
}
