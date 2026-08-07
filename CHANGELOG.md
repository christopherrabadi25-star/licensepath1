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
