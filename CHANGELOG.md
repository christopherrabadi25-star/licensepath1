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
