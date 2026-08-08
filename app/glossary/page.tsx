import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY, groupByLetter } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "California Real Estate Glossary — Terms & Definitions",
  description: `Plain-English definitions of ${GLOSSARY.length} California real estate terms, written for salesperson exam candidates. Covers agency, contracts, financing, escrow, appraisal, land use, and disclosures.`,
  alternates: { canonical: "/glossary" },
};

export default function GlossaryIndex() {
  const groups = groupByLetter();

  return (
    <>
      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="wrap py-16">
          <p className="anno">Reference</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            California real estate glossary
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed" style={{ color: "var(--ink-2)" }}>
            {GLOSSARY.length} terms defined in plain English, written for people preparing for the
            California salesperson exam. Every definition is original and California-specific —
            where our rules differ from what national study materials teach, we say so.
          </p>
        </div>
      </section>

      <nav aria-label="Jump to letter" className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="wrap flex flex-wrap gap-x-1 gap-y-1 py-4">
          {groups.map((g) => (
            <a
              key={g.letter}
              href={`#letter-${g.letter}`}
              className="tabular px-2.5 py-1 text-sm font-medium transition hover:underline"
              style={{ color: "var(--ink-2)" }}
            >
              {g.letter}
            </a>
          ))}
        </div>
      </nav>

      <div className="wrap py-14">
        {groups.map((g) => (
          <section key={g.letter} id={`letter-${g.letter}`} className="scroll-mt-20 pb-12">
            <h2
              className="border-b pb-2 font-display text-2xl font-semibold"
              style={{ borderColor: "var(--rule-strong)", color: "var(--gold-deep)" }}
            >
              {g.letter}
            </h2>
            <ul className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.entries.map((e) => (
                <li key={e.slug}>
                  <Link href={`/glossary/${e.slug}`} className="group block">
                    <span className="font-medium underline-offset-4 group-hover:underline">
                      {e.term}
                    </span>
                    <span
                      className="mt-1 block text-sm leading-snug"
                      style={{ color: "var(--ink-3)" }}
                    >
                      {e.definition.length > 92
                        ? `${e.definition.slice(0, 92).trimEnd()}…`
                        : e.definition}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
