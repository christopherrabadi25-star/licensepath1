import glossaryData from "@/content/glossary/glossary.json";
import { BLUEPRINT, slugifyTerm } from "./exam";

export type GlossaryEntry = {
  term: string;
  definition: string;
  area: string;
  slug: string;
};

const areaNames = new Map(BLUEPRINT.map((a) => [a.id, a.short]));

/** All glossary terms, slugged and sorted alphabetically. */
export const GLOSSARY: GlossaryEntry[] = (glossaryData.terms as Omit<GlossaryEntry, "slug">[])
  .map((t) => ({ ...t, slug: slugifyTerm(t.term) }))
  .sort((a, b) => a.term.localeCompare(b.term, "en"));

export function getEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((e) => e.slug === slug);
}

export function areaLabel(areaId: string): string {
  return areaNames.get(areaId) ?? areaId;
}

/** Same-area terms, excluding the current one — internal links for crawl depth. */
export function relatedEntries(entry: GlossaryEntry, limit = 8): GlossaryEntry[] {
  return GLOSSARY.filter((e) => e.area === entry.area && e.slug !== entry.slug).slice(0, limit);
}

/** Alphabetical buckets for the glossary index. */
export function groupByLetter(): { letter: string; entries: GlossaryEntry[] }[] {
  const buckets: Record<string, GlossaryEntry[]> = {};
  for (const e of GLOSSARY) {
    const letter = /^[a-z]/i.test(e.term) ? e.term[0].toUpperCase() : "#";
    (buckets[letter] ??= []).push(e);
  }
  return Object.keys(buckets)
    .sort((a, b) => a.localeCompare(b))
    .map((letter) => ({ letter, entries: buckets[letter] }));
}
