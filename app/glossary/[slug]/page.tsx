import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GLOSSARY, areaLabel, getEntry, relatedEntries } from "@/lib/glossary";

type Props = { params: { slug: string } };

/** Statically generate one indexable page per glossary term (CLAUDE.md §2.4). */
export function generateStaticParams() {
  return GLOSSARY.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = getEntry(params.slug);
  if (!entry) return {};

  return {
    title: `What is ${entry.term}?`,
    description: `${entry.definition} A California real estate term defined for salesperson exam candidates.`,
    alternates: { canonical: `/glossary/${entry.slug}` },
    openGraph: {
      title: `What is ${entry.term}? | LicensePath`,
      description: entry.definition,
      type: "article",
    },
  };
}

export default function TermPage({ params }: Props) {
  const entry = getEntry(params.slug);
  if (!entry) notFound();

  const related = relatedEntries(entry);

  const ld = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: entry.term,
    description: entry.definition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "California Real Estate Glossary",
      url: "https://licensepath.com/glossary",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Glossary", item: "https://licensepath.com/glossary" },
      { "@type": "ListItem", position: 2, name: entry.term },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="wrap py-16">
        <nav aria-label="Breadcrumb">
          <ol className="anno flex gap-2">
            <li>
              <Link href="/glossary" className="hover:underline">
                Glossary
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li style={{ color: "var(--gold-deep)" }}>{areaLabel(entry.area)}</li>
          </ol>
        </nav>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          {entry.term}
        </h1>

        <p
          className="measure mt-7 border-l-2 pl-6 text-xl leading-relaxed"
          style={{ borderColor: "var(--gold)", color: "var(--ink-2)" }}
        >
          {entry.definition}
        </p>

        <div className="mt-10 border-t pt-6" style={{ borderColor: "var(--rule)" }}>
          <p className="anno">Tested under</p>
          <p className="mt-2 font-display text-lg font-semibold">{areaLabel(entry.area)}</p>
          <p className="measure mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>
            This term belongs to one of the seven content areas on the California salesperson exam.{" "}
            <Link href="/exam" className="underline underline-offset-4">
              See how the exam is weighted
            </Link>
            .
          </p>
        </div>

        {related.length > 0 && (
          <section className="mt-14 border-t pt-8" style={{ borderColor: "var(--rule)" }}>
            <h2 className="anno">Related terms</h2>
            <ul className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/glossary/${r.slug}`}
                    className="text-sm font-medium underline-offset-4 hover:underline"
                  >
                    {r.term}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-14 text-xs leading-relaxed" style={{ color: "var(--ink-4)" }}>
          Definitions are written by LicensePath for educational use and are not legal advice.
          Consult a California real estate attorney for guidance on a specific transaction.
        </p>
      </article>
    </>
  );
}
