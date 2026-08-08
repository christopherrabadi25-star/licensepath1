# Changelog

## 2026-08-07 — Repository bootstrap + first content batch

- Added `CLAUDE.md` project constitution (mission, business plan, compliance non-negotiables, tech stack, course catalog, content spec, exam-prep spec, tutor spec, build phases).
- Added `README.md` with repository layout and compliance posture.
- Scaffolded `/content` per CLAUDE.md §8 with `STATUS.md` review tracker.
- Added `content/exam-sim/blueprint.json` — California Salesperson Exam blueprint (150 Q / 3h15m / 70%) with per-area weights and per-form question counts.
- Added `content/glossary/glossary.json` — 169 original term definitions (seed of 500+ target) tagged by blueprint area; feeds flashcards and SEO pages.
- Authored Principles Unit 1 (The Real Estate Business & California License Law): ~3,400-word lesson covering industry structure, the DRE and Commissioner, licensed vs. exempt activity, both license types, the full application-to-renewal path, brokerage models and the MLS, and advertising compliance; 4 worked examples incl. commission math; 19-term key-terms box; exam tips; and an 18-question original bank with per-option rationales.
- Authored Principles Unit 2 (Property: Real vs. Personal, Fixtures & Appurtenances): ~2,900-word lesson covering the real/personal divide, land components, MARIA fixture tests, trade fixtures and emblements, appurtenances, water rights and support, manufactured-home classification, and why classification drives financing/appraisal/tax/title; 4 worked examples; 22-term key-terms box; exam tips; and a 16-question original bank.
- Added `content/exam-sim/sample-set-01.json` — 25 original exam-style items across all 7 blueprint areas (incl. proration, cap rate, LTV, and transfer-tax math), for the simulator and the free diagnostic funnel.
- All question JSON validated: 4 options + 4 rationales per item, answer index matches the "Correct" rationale.
- Uncertain regulatory figures flagged `<!-- VERIFY -->` inline per CLAUDE.md §13/§14; all content marked draft/self-reviewed in STATUS.md — nothing marked approved.

## 2026-08-07 — Principles Units 3–6

- Authored Principles Unit 3 (Estates & Interests in Real Property), ~3,040 words: freehold vs. leasehold, fee simple absolute and the PETE limits, both defeasible fees with their matching future interests, life estates including *pur autre vie* and waste, remainder vs. reversion, and all four leasehold estates. Worked examples cover reading a life estate on a preliminary report, a triggered determinable fee, compound lease escalations, and move-in proration math. 18-question bank.
- Authored Principles Unit 4 (Ownership & How Title Is Held), ~2,820 words: severalty vs. concurrent ownership, the T-TIP unities, severance arithmetic, tenancy in common, California community property and separate property, community property with right of survivorship, and entity vesting (trusts, partnerships, LLCs, corporations, co-ops, CIDs). Worked examples cover survivorship defeating a will, unequal TIC proceeds distribution, a missing-spouse title problem, and four-way severance fractions. 18-question bank.
- Authored Principles Unit 5 (Encumbrances: Liens, Easements & Restrictions), ~3,330 words: the voluntary/involuntary and specific/general axes, all major lien types, priority rules with the property-tax exception, mechanics' liens and relation back, easements appurtenant vs. in gross, the five methods of creation and six of termination, licenses, encroachments, and CC&Rs including void discriminatory covenants. Worked examples cover a full foreclosure-proceeds priority distribution, relation-back timing, prescription vs. permission, and preliminary-report triage. 18-question bank.
- Authored Principles Unit 6 (Agency & Fiduciary Duties), ~3,380 words: the client/customer distinction, four methods of agency creation, OLD CAR applied to fact patterns, duties to third parties, puffing vs. misrepresentation, dual agency and what a dual agent may never disclose, the disclose–elect–confirm process, and termination. Worked examples cover an accidental implied agency at an open house, secret profit through an entity, dual agency handled correctly, the visual inspection duty, and why compensation does not determine agency. 20-question bank — enlarged because agency is ~17% of the state exam.
- Glossary expanded from 169 to 216 original definitions; all terms unique.
- Question bank now 133 items total, all validated: 4 options and 4 rationales each, unique IDs, answer index matching the "Correct" rationale.

## 2026-08-07 — Principles Units 7–10

- Authored Principles Unit 7 (Contract Law Fundamentals), ~3,350 words: the four essential elements, California capacity rules including the void treatment of minors' real property contracts and the adjudication switch for mental capacity, the five defects in consent, the statute of frauds, all four classification pairs, and discharge and remedies. Worked examples cover a counteroffer revoked in favor of a better offer, void vs. voidable, liquidated damages math against the 3% cap, assignment vs. novation liability, and an unenforceable oral extension. 20-question bank.
- Authored Principles Unit 8 (Real Estate Contracts in Practice), ~3,040 words: the three listing types plus net listings, required listing elements and the definite termination date, safety clauses and procuring cause, buyer representation agreements, the residential purchase agreement's architecture, contingencies under active removal with notice to perform, and counteroffer/multiple-counteroffer/backup mechanics. Worked examples cover choosing a listing type with a named exclusion, safety-clause enforcement, contingency date arithmetic, net-to-seller math (dividing by 1 − rate), and a full commission split with transaction fee. 20-question bank.
- Authored Principles Unit 9 (Disclosures in Residential Transactions), ~3,030 words: the three-layer disclosure architecture, the TDS with its exemptions and post-offer termination windows, the six NHD hazard zones, the three-year death rule and the HIV/AIDS non-disclosure rule, federal lead-based paint requirements, Megan's Law, Mello-Roos, CID documents, local point-of-sale ordinances, and why "as-is" never waives disclosure. Worked examples cover a TDS-exempt probate sale that still requires disclosure, death-disclosure timing, the 10-day lead period, a late-mailed TDS termination window, and fire-zone insurance sequencing. 20-question bank.
- Authored Principles Unit 10 (Escrow & Title Insurance), ~3,370 words: escrow requirements and the neutral depository's dual-agent role, the escrow lifecycle, deed validity and the delivery-intent rule, chain of title and the preliminary report, recording with constructive vs. actual notice and bona fide purchaser protection, and CLTA vs. ALTA coverage. Worked examples cover a full tax proration with direction of credit, documentary transfer tax net of an assumed loan, the unrecorded-deed race with a possession twist that flips the outcome, CLTA gaps revealed by survey, and a failed safe-deposit-box delivery. 20-question bank.
- Glossary expanded from 216 to 257 original definitions; all unique.
- Question bank now 213 items, all validated. Blueprint coverage to date: ownership/land use 64, practice & disclosures 49, contracts 42, transfer 28, agency 23. Valuation and financing remain light by design — Units 11–13 supply them.

## 2026-08-08 — Phase 0: application scaffold + marketing homepage

- Scaffolded the Next.js 14 App Router application: TypeScript strict, Tailwind, ESLint, and the `dev`/`build`/`lint`/`typecheck` scripts required by CLAUDE.md §4.
- Added brand tokens per §11 — navy `#0B1F3A`, gold `#C9A96E`, emerald success, warm off-white surfaces; Outfit for display and Inter for body.
- Built the marketing homepage: hero with the California exam spec panel (150 Q / 3h15m / 70%), differentiators, the three-course catalog with the 18-day pacing note, and founder credibility section with both DRE license numbers.
- **Compliance built into the layout, not bolted on:** a persistent footer notice states courses are pending DRE approval, are not yet offered for sale, cannot yet satisfy licensing requirements, and that LicensePath is not affiliated with or endorsed by the DRE. A "Pending DRE approval" badge appears in the hero. Page metadata carries the same language per §3.2.
- Accessibility groundwork toward the §3.4 WCAG 2.1 AA target: skip-to-content link, visible focus rings, semantic landmarks and heading order, and a reduced-motion media query.
- Verified at 1440px and 390px viewports; the course player mobile requirement in §11 is served by the same token system.
- Added `.env.example` documenting Supabase, Stripe, Anthropic, and Resend variables with server-side-only keys marked; `.gitignore` excludes all env files.
- Added `scripts/validate_content.py` — CI-enforced validation of the §8 question schema (4 options, 4 rationales, answer index matching the "Correct" rationale, unique IDs, unique glossary terms) plus a blueprint coverage report against §9 weights.
- Added GitHub Actions CI running lint, typecheck, build, and content validation on every PR (Phase 0 definition of done).
- Content validator confirms 377 questions and 336 glossary terms pass, and flags agency (6.1% vs 17% target) and valuation (6.9% vs 14%) as under-weighted for simulator assembly.

## 2026-08-08 — Marketing site redesign + SEO infrastructure

### Copy correction (important)
The first homepage described unbuilt features in the present tense — an AI tutor that
answers questions "grounded in the exact course text," and an implied complete question
bank. Neither exists. It also carried an invented tagline and founder voice that the
founders never wrote. For a school whose compliance posture depends on marketing
truthfulness while awaiting DRE approval (§3.2), present-tense claims for unbuilt
features are a real liability, not a stylistic quibble. All such copy is removed.

The homepage now carries an explicit build-status section stating what is written, what
is in progress, and that the AI tutor is "in development — not yet available."

### Design
- Rebuilt the visual system around real estate's own document vernacular — hairline
  rules, monospace annotations, tabular data, sequential numbering that encodes the
  actual licensing path rather than decorating cards.
- Typography moved from Outfit/Inter to Fraunces (display), Public Sans (body — the US
  government design system face, apt for a regulatory subject), IBM Plex Mono
  (annotations). CLAUDE.md §11 marks the prior tokens "working, confirm before launch";
  navy and gold are retained for Rabadi Group brand continuity.
- Neutrals rebiased toward navy; added dark mode via prefers-color-scheme.

### SEO
- **336 statically generated glossary term pages** at `/glossary/[slug]`, each with
  DefinedTerm and BreadcrumbList structured data, unique title and meta description, and
  internal links to same-area terms for crawl depth. This is the §2.4 programmatic SEO
  base.
- `/exam` guide with FAQPage structured data on six high-intent queries.
- `/courses` with Course structured data for all three courses; `/about`.
- EducationalOrganization JSON-LD in the root layout.
- `sitemap.xml` (341 URLs) and `robots.txt` generated from the content source.
- Per-page canonical URLs; legal placeholders marked noindex.
- `lib/exam.ts` centralizes exam facts and blueprint weights so a regulatory change is a
  one-file edit rather than a hunt through JSX.

Lint, typecheck, and build all pass; 348 static pages generated.

## 2026-08-08 — Course 2 (Practice) Units 1–3

- Authored Practice Unit 1 (Starting Your Practice): brokerage compensation models with net-income arithmetic at realistic transaction counts, the independent-contractor/employee duality, team structures and California team-name rules, a four-number business plan built backward from an income goal, the costs new agents omit, and E&O scope and exclusions. Worked examples compare two brokerage offers at both 6 and 2 transactions to show fixed fees dominate at low volume. 18-question bank.
- Authored Practice Unit 2 (Prospecting & Lead Generation): the conversion hierarchy of lead sources, sphere-of-influence construction, geographic farm selection by turnover and competition, the legal rules of outreach (DNC, autodialer exposure on texts, CAN-SPAM), FSBO and expired-listing practice, referral fee rules including the unlicensed-payee prohibition and RESPA, fair housing risk in ad targeting, and CPL/ROI measurement. Worked examples show farm selection math and an ROI comparison where the higher cost-per-lead source returns nearly double. 18-question bank.
- Authored Practice Unit 3 (Fair Housing in Practice & Implicit Bias) — **the SB 263 required component**, built as participatory activities rather than reading:
  - **Activity 1** scripted response drill: four live scenarios requiring written responses plus recorded verbal delivery, with model language.
  - **Activity 2** personal service audit: structured data collection on response times, showing counts, and follow-up, with written pattern analysis. Built on the premise that bias is measurable but not introspectable.
  - **Activity 3** case study analysis: four composite cases (paired testing, disability accommodation, advertising copy, and a silent differential-service case) with structured analytical questions.
  - **Activity 4** paired role-play with debrief questions.
  - **Activity 5** written personal practice standard covering response, intake, criteria, advertising, refusal script, and audit schedule.
  - 20-question assessment. Activities are required in addition and are recorded for the completion record and potential DRE audit.
- Question bank now 433 items, all validated.
- Note: practice-disclosures coverage is now 41% against a 25% blueprint target — expected, since the Practice course concentrates there. Exam-simulator fill items will need to rebalance toward agency and valuation.

## 2026-08-08 — Course 2 (Practice) Units 4–6

- Authored Practice Unit 4 (Listing Presentations & Seller Counseling): pre-appointment research including vesting and early title work, the required disclosure sequence (agency disclosure before listing agreement), structuring the presentation around the seller's three decisions, pricing counsel and the overpricing trap, listing agreement completion points, objection handling within antitrust limits, and when to decline a listing. Worked examples cover a full seller's net sheet with proration, an overpricing conversation built on expireds, and a life-estate vesting problem caught at the appointment.
- Authored Practice Unit 5 (Pricing Property): comparable selection hierarchy and criteria, adjustment direction and order, deriving adjustment values through paired sales analysis, net and gross adjustment guardrails, why price per square foot misleads across size differences, months of inventory and absorption, and presenting a range with stated assumptions. Worked examples include a full three-comparable adjustment grid with reconciliation by reliability rather than averaging, a derived pool adjustment, the per-square-foot extrapolation trap, and a sale-to-list ratio argument worth $51,200 on an $800,000 home.
- Authored Practice Unit 6 (Marketing Listings & Advertising Compliance): the scope of solicitation materials, identification requirements and blind ads across every medium, writing compliant copy with a table of problem phrases, puffing versus factual representation, photography rules covering virtual staging, digital alteration, AI-generated imagery, and photo copyright, advertising other brokers' listings and sold properties, and digital channel compliance. Worked examples include a full line-by-line rewrite of non-compliant copy, an Instagram blind ad, virtual staging that concealed a defect, and a square footage misrepresentation.
- Question bank now 489 items, all validated.
