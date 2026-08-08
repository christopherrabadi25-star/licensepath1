import type { Metadata } from "next";
import { COURSES } from "@/lib/exam";

export const metadata: Metadata = {
  title: "The Three Required California Real Estate Courses",
  description:
    "California requires three 45-hour college-level courses before you can sit for the salesperson exam: Real Estate Principles, Real Estate Practice, and one elective. Here is what each covers.",
  alternates: { canonical: "/courses" },
};

const outline: Record<string, string[]> = {
  principles: [
    "The real estate business and California license law",
    "Real vs. personal property, fixtures, and appurtenances",
    "Estates and interests in real property",
    "Ownership and how title is held",
    "Encumbrances: liens, easements, and restrictions",
    "Agency and fiduciary duties",
    "Contract law fundamentals",
    "Real estate contracts in practice",
    "Disclosures in residential transactions",
    "Escrow and title insurance",
    "Finance I: instruments and foreclosure",
    "Finance II: markets, loans, and programs",
    "Appraisal and valuation",
    "Land use, planning, and zoning",
    "Fair housing and ethics",
    "Real estate taxation",
    "Landlord–tenant and property management",
    "The transaction lifecycle, trust funds, and career launch",
  ],
  practice: [
    "Starting your practice: brokerage models and business planning",
    "Prospecting and lead generation",
    "Fair housing in practice and implicit bias",
    "Listing presentations and seller counseling",
    "Pricing property: CMA methodology",
    "Marketing listings and advertising compliance",
    "Working with buyers",
    "Writing and negotiating offers",
    "Contract-to-close and contingency management",
    "Financing the buyer",
    "Disclosures and risk management",
    "Trust funds and recordkeeping in practice",
    "Escrow, title, and closing procedures",
    "Property management and leasing",
    "Building a compliant long-term business",
  ],
  "legal-aspects": [
    "Sources of real estate law and the court system",
    "Law of agency in depth",
    "Contract law: formation defenses, interpretation, remedies",
    "Real property interests and conveyancing",
    "Deeds, recording, priorities, and title problems",
    "Escrow and closing law; RESPA in depth",
    "Finance law and anti-deficiency rules",
    "Landlord–tenant law in depth",
    "Land use and environmental law",
    "Fair housing and civil rights law",
    "Easements, boundaries, and neighbor disputes",
    "Construction, mechanics' liens, and new-home law",
    "Common interest developments and HOA law",
    "Real estate litigation, ADR, and license discipline",
    "Regulatory compliance capstone",
  ],
};

export default function CoursesPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: COURSES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: c.name,
        description: c.blurb,
        provider: {
          "@type": "EducationalOrganization",
          name: "LicensePath Real Estate Academy",
          url: "https://licensepath.com",
        },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="wrap py-16">
          <p className="anno">Curriculum</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            The three required courses
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed" style={{ color: "var(--ink-2)" }}>
            California requires three 45-hour college-level courses before you may sit for the
            salesperson exam. Two are fixed — Principles and Practice — and the third is an elective.
            Ours is Legal Aspects of Real Estate.
          </p>
          <p className="measure mt-4 text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>
            These outlines describe the curriculum we are writing and preparing for DRE submission.
            Courses are not yet approved and are not offered for sale.
          </p>
        </div>
      </section>

      {COURSES.map((c, i) => (
        <section
          key={c.slug}
          className="border-b py-14"
          style={{
            borderColor: "var(--rule)",
            background: i % 2 ? "var(--paper-2)" : "var(--paper)",
          }}
        >
          <div className="wrap grid gap-x-16 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="anno" style={{ color: "var(--gold-deep)" }}>
                Course {i + 1} · {c.hours} hours · {c.units} units
              </p>
              <h2 className="mt-3 text-3xl font-semibold">{c.name}</h2>
              <p className="measure mt-5 leading-relaxed" style={{ color: "var(--ink-3)" }}>
                {c.blurb}
              </p>
            </div>
            <div className="lg:col-span-7">
              <h3 className="anno">Unit outline</h3>
              <ol className="tabular mt-4 grid gap-x-10 gap-y-0 sm:grid-cols-2">
                {outline[c.slug].map((u, idx) => (
                  <li
                    key={u}
                    className="grid grid-cols-[2rem_1fr] gap-3 border-b py-2.5 text-sm"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    <span style={{ color: "var(--ink-4)" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span style={{ color: "var(--ink-2)" }}>{u}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
