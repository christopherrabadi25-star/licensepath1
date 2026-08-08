/**
 * Single source of truth for California exam facts and course structure.
 *
 * These figures appear across marketing pages, structured data, and eventually
 * the exam engine. Keeping them here means a regulatory change is a one-file
 * edit rather than a hunt through JSX. Reverify against the DRE's published
 * exam content outline before launch (CLAUDE.md §14).
 */

export const EXAM = {
  questions: 150,
  timeLabel: "3 hours 15 minutes",
  timeMinutes: 195,
  passPct: 70,
  passCorrect: 105,
} as const;

export type BlueprintArea = {
  id: string;
  short: string;
  full: string;
  weight: number;
  perForm: number;
};

export const BLUEPRINT: BlueprintArea[] = [
  {
    id: "practice-disclosures",
    short: "Practice of Real Estate & Disclosures",
    full: "Practice of Real Estate and Disclosures, including trust funds and fair housing",
    weight: 25,
    perForm: 38,
  },
  {
    id: "agency",
    short: "Laws of Agency & Fiduciary Duties",
    full: "Laws of Agency and Fiduciary Duties",
    weight: 17,
    perForm: 25,
  },
  {
    id: "ownership-land-use",
    short: "Property Ownership & Land Use Controls",
    full: "Property Ownership and Land Use Controls and Regulations",
    weight: 15,
    perForm: 23,
  },
  {
    id: "valuation",
    short: "Property Valuation & Financial Analysis",
    full: "Property Valuation and Financial Analysis",
    weight: 14,
    perForm: 21,
  },
  { id: "contracts", short: "Contracts", full: "Contracts", weight: 12, perForm: 18 },
  { id: "financing", short: "Financing", full: "Financing", weight: 9, perForm: 13 },
  {
    id: "transfer",
    short: "Transfer of Property",
    full: "Transfer of Property",
    weight: 8,
    perForm: 12,
  },
];

export type Course = {
  slug: string;
  name: string;
  hours: number;
  units: number;
  blurb: string;
};

export const COURSES: Course[] = [
  {
    slug: "principles",
    name: "Real Estate Principles",
    hours: 45,
    units: 18,
    blurb:
      "The foundation. California license law, real versus personal property, estates and ownership, encumbrances, agency, contracts, disclosures, escrow and title, finance and foreclosure, appraisal, land use, fair housing, taxation, and landlord–tenant law.",
  },
  {
    slug: "practice",
    name: "Real Estate Practice",
    hours: 45,
    units: 15,
    blurb:
      "How the work is actually done: prospecting, listing presentations, pricing, marketing compliance, writing and negotiating offers, contract-to-close, trust fund handling, and the fair housing and implicit bias component California requires.",
  },
  {
    slug: "legal-aspects",
    name: "Legal Aspects of Real Estate",
    hours: 45,
    units: 15,
    blurb:
      "Our elective. Agency and contract law in depth, conveyancing and recording, finance and foreclosure litigation, landlord–tenant law, land use and environmental regulation, fair housing enforcement, and license discipline.",
  },
];

/** URL-safe slug for glossary terms. Stable — changing it breaks indexed URLs. */
export function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[®™]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
