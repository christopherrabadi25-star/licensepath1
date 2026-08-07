# LicensePath Real Estate Academy

The AI-powered California real estate school — built by agents who actually sell.

LicensePath is a California DRE pre-licensing school (pending DRE approval) where aspiring agents complete the three statutory 45-hour courses online with an AI tutor grounded in our own curriculum, then prepare to pass the California Salesperson Exam (150 questions, 3 hours 15 minutes, 70% to pass).

## Repository layout

```
CLAUDE.md            Project constitution — business plan, compliance rules, course catalog, build spec
/content
  /principles/       Course 1 — Real Estate Principles (18 units, MDX)
  /practice/         Course 2 — Real Estate Practice (15 units, MDX)
  /legal-aspects/    Course 3 — Legal Aspects of Real Estate (15 units, MDX)
  /glossary/         glossary.json — master term glossary (target 500+ terms; feeds flashcards + SEO pages)
  /question-bank/    Original multiple-choice questions per course/unit (JSON)
  /exam-sim/         blueprint.json — exam simulator blueprint + sample exam-level items
  STATUS.md          Per-unit review status (draft → self-reviewed → Ramzi-approved → DRE-submitted)
```

## Compliance posture

- All course content in this repository is **DRAFT** until reviewed by Ramzi Rabadi (DRE #01738777) and approved by the California DRE.
- All prose and questions are **100% original**. Nothing is copied from existing schools, textbooks, or prep providers, and no actual DRE exam items are reproduced — practice questions model the published exam *blueprint and style* only.
- Marketing copy must say "Pending DRE approval" until approval letters are in hand.

See `CLAUDE.md` §3 and §14 for the full compliance rules and the verify-before-launch list.
