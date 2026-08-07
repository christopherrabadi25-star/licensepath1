# CLAUDE.md — LicensePath Real Estate Academy

You are building **LicensePath Real Estate Academy**: a California DRE pre-licensing school where aspiring real estate agents buy approved courses, complete them online with an AI tutor, and prepare to pass the California Salesperson Exam. This file is the project constitution. Read it at the start of every session and treat it as ground truth. If it grows unwieldy, propose splitting deep sections into `/docs/*.md` and importing them with `@docs/...` references — but never delete requirements, only relocate them.

**Founders:** Christopher Rabadi (CA DRE Salesperson #02246356, The Rabadi Group at Agency 8 Real Estate Group) and Ramzi Rabadi (CA DRE #01738777, 18+ years, $100M+ combined transaction volume). Ramzi is the designated content reviewer / instructor-of-record candidate. LicensePath is also the recruiting pipeline for the family's planned brokerage, Rabadi Realty.

---

## 1. Mission & Positioning

- **Mission:** Get students from zero to licensed California agent faster and with higher exam pass rates than legacy schools, using AI tutoring grounded in our own DRE-approved curriculum.
- **One-liner:** "The AI-powered California real estate school — built by agents who actually sell."
- **Positioning vs. competitors (Colibri/Real Estate Express, The CE Shop, Allied, AceableAgent):** They sell static PDFs and video libraries. We sell an adaptive system: every lesson has an AI tutor that answers questions 24/7 grounded in the exact approved course text, unlimited practice questions, and exam simulation matched to the real DRE exam blueprint.
- **Moat:** (1) AI tutor grounded in proprietary approved content, (2) founders are practicing top-producing agents (credibility + real-world examples), (3) brokerage recruiting pipeline makes each student worth far more than course revenue, (4) family business network for distribution.

---

## 2. Business Plan

### 2.1 Market

- California has ~430,000+ real estate licensees; tens of thousands sit for the salesperson exam annually. Even in slow markets, license churn creates continuous demand.
- ICP #1: Career-switchers 22–45 in SoCal (San Gabriel Valley, Inland Empire, LA, OC) who want a self-paced online path.
- ICP #2: College students / recent grads (LMU, Claremont Colleges, community colleges) adding a license as an income stream.
- ICP #3 (Phase 2): Existing licensees needing 45-hour CE renewal packages.

### 2.2 Revenue Model & Pricing Structure

| Tier | Price | What's included |
|---|---|---|
| **Exam Prep Only** | $79 | Question bank (1,500+ Qs), unlimited simulated exams, flashcards, AI tutor for exam prep. For students who took courses elsewhere. |
| **LicensePath Core** | $179 | All 3 statutory 45-hr courses, unit quizzes, course final exams, completion certificates, 12-month access. |
| **LicensePath Plus** ⭐ flagship | $279 | Core + full AI tutor on every lesson, complete exam prep engine, spaced-repetition flashcards, wrong-answer explanations, progress analytics. |
| **LicensePath Premium** | $429 | Plus + 2×/month live Zoom workshops with Christopher/Ramzi, one 1:1 mentorship call, resume review, and a fast-track interview with Rabadi Realty / Agency 8 upon licensing. |

Pricing rules:

- Founding cohort: first 100 students get ~40% off (Core $99 / Plus $169 / Premium $259). Countdown + seat counter on site.
- 3-installment payment plan on Plus and Premium via Stripe.
- B2B: brokerage bulk seats at $149/seat, 10-seat minimum (recruiting tool for other brokers).
- Upsell path: Exam Prep buyers → CE packages later; Core → Plus upgrade in-app at prorated price.
- "Pass guarantee" (free extended access or refund if student fails state exam after completing our full program) — **draft it, but flag for attorney review before publishing.**
- Phase 2 product line: 45-hour CE renewal packages, broker-license course bundle.

### 2.3 Unit Economics & Targets

- Marginal COGS ≈ hosting + AI tutor API usage (budget $2–5/student/course; enforce per-student token budgets and caching).
- CAC target < $60 blended (organic Instagram/TikTok content engine + Google Ads on "california real estate license online" cluster + referrals).
- Referral program: $25 credit per enrolled referral.
- Strategic LTV: a student recruited into Rabadi Realty is worth multiples of course revenue — track "intends to join a brokerage" in onboarding survey and route Premium grads to recruiting.
- Year 1 target (post-DRE-approval): 100 founding students in first 90 days; ~400 students / ~$80–100K revenue. Year 2: 1,200 students + CE line.

### 2.4 Go-To-Market

- Lead magnet: free "Could you pass the California exam?" 20-question mini-diagnostic (built from the question bank) → email capture → 7-email nurture sequence → checkout.
- Content engine: short-form video (exam question of the day, "agent explains" series), leveraging The Rabadi Group's existing Instagram infrastructure.
- Local funnels: LMU/Claremont campus ambassadors, St. Joseph community network, Agency 8 agent referrals.
- SEO: programmatic pages per glossary term ("What is a lis pendens? | LicensePath") — the 500-term glossary doubles as the SEO base.

---

## 3. Regulatory & Compliance — NON-NEGOTIABLES

These rules shape the entire product. Enforce them **server-side, in code and database constraints — never client-side only.**

### 3.1 California salesperson licensing path the product serves

1. Student is 18+, completes **three 45-hour college-level courses**: (1) Real Estate Principles, (2) Real Estate Practice, (3) one elective — LicensePath's elective is **Legal Aspects of Real Estate**.
2. Student applies for the state exam (exam/license application + Live Scan fingerprinting — link out; we don't process these).
3. **California Salesperson Exam: 150 multiple-choice questions, 3 hours 15 minutes, 70% (105 correct) to pass.** Our entire exam-prep engine is built to this spec.

### 3.2 Course-delivery rules to enforce in code

- **Pacing:** A student may not complete more than one 45-hour course within any 18-day period; all three courses therefore take a minimum of ~54 days. Implement as server-computed `earliest_final_exam_unlock_at` timestamps per enrollment. Hard-block early final-exam attempts.
- **Seat time:** Track engaged time per lesson (heartbeat pings; pause after 10 min idle). Store in `seat_time_logs`. Surface cumulative hours per course to student and admin.
- **Final exams:** Closed-book, timed, served from a rotating question pool (each attempt gets a distinct form), identity re-verification step before unlock, passing threshold configurable and defaulted to 70% (set ≥ whatever current DRE regs require — see §14). Limited retakes with a different exam form.
- **Certificates:** On pass, generate a course-completion certificate (PDF) with student name, course, hours, school info, and completion date; store immutably; make available for the student's exam application.
- **Records:** Retain enrollment, seat-time, exam, and certificate records for at least 5 years (verify exact period — §14). Build export tooling for DRE audits.
- **Marketing truthfulness:** The site must NOT say "DRE-approved" until approval letters are in hand. Until then: "Pending DRE approval." This is a hard content rule everywhere, including meta tags and ads.

### 3.3 DRE approval roadmap (tracked as project tasks, not code)

1. Form the LicensePath legal entity; finalize ownership.
2. Prepare and submit DRE statutory course approval applications (RE 306-series forms — verify current form numbers, fees, and requirements at dre.ca.gov before filing; see §14).
3. Submit complete course materials per course: full text, final exams, quizzes, hour breakdown, and course outline — everything in `/content` must be packaged for this submission.
4. Practice course must include the post-2024 required components: **implicit bias training and an expanded fair housing component with interactive/participatory elements** (SB 263). This is built into Course 2's outline below.
5. Confirm private-postsecondary (BPPE) exemption status for schools offering solely DRE-approved courses (§14).
6. Expect a multi-month review; sequence marketing launch after approval.

### 3.4 Legal guardrails

- Required enrollment agreement with cancellation/refund terms per DRE rules (draft, then attorney review — §14).
- Privacy policy + ToS; treat student records as sensitive; no selling data.
- Accessibility: WCAG 2.1 AA target across the student app.
- AI tutor must never present itself as giving legal, tax, or investment advice (see §10).
- All generated course content is DRAFT until reviewed by Ramzi Rabadi (DRE #01738777) and approved by DRE. Maintain review status per unit in `/content/STATUS.md`.

---

## 4. Tech Stack & Engineering Conventions

- **Stack:** Next.js 14+ (App Router) · TypeScript strict · Tailwind + shadcn/ui · Supabase (Auth, Postgres, RLS on every table, pgvector, Storage) · Stripe (Checkout + Billing + webhooks) · Vercel · Resend (email) · Anthropic API for the tutor.
- All Anthropic/Stripe keys server-side only. Tutor calls go through `/api/tutor`; never expose keys client-side.
- Supabase Row Level Security on by default; students can only read their own rows; content tables readable only with active entitlement.
- Conventional commits; `npm run lint`, `typecheck`, and tests must pass before any task is reported complete.
- Migrations via Supabase CLI, committed to repo. Ask before destructive migrations.
- Never commit secrets; use `.env.local` + Vercel env vars.

## 5. Core Data Model (initial)

`users` · `profiles` · `products` (tiers) · `purchases` / `entitlements` · `courses` · `units` · `lessons` · `enrollments` (incl. `started_at`, `earliest_final_unlock_at`, `completed_at`) · `seat_time_logs` · `quiz_questions` (bank, tagged by course/unit/exam-blueprint-area/difficulty) · `quiz_attempts` + `attempt_answers` · `final_exam_forms` · `certificates` · `flashcards` + `srs_reviews` · `tutor_conversations` · `leads` (mini-diagnostic funnel).

## 6. Product Surfaces

1. **Marketing site:** home, pricing, course catalog, glossary (SEO pages), free diagnostic quiz, blog, about (leverage founders' track record), compliance-truthful copy.
2. **Student app:** dashboard (progress, pacing countdowns, streaks), course player (lesson text + key terms + examples), quizzes, final exams, exam-prep center, AI tutor panel on every lesson, certificates.
3. **Admin:** content management + review workflow, student records, seat-time/exam audit exports, revenue dashboard, DRE submission packager (compiles `/content` into a reviewable bundle).

---

## 7. Course Catalog & Architecture

Three statutory courses, 45 hours each. Every course = units → lessons → quiz → course final. Hour allocation ≈ 2.5 hrs/unit across reading, examples, and assessment; log actual seat time.

### Course 1 — Real Estate Principles (18 units)

1. **The Real Estate Business & California License Law** — industry structure, DRE's role, license types & requirements, the Real Estate Law (B&P Code), Realtor® vs. licensee. *Key terms: DRE, commissioner, salesperson, broker, reciprocity, NAR.*
2. **Property: Real vs. Personal, Fixtures & Appurtenances** — land, improvements, bundle of rights, fixtures tests (MARIA), trade fixtures, emblements. *Key terms: real property, personal property, fixture, appurtenance, littoral/riparian rights.*
3. **Estates & Interests in Real Property** — freehold vs. less-than-freehold, fee simple absolute/defeasible, life estates, leasehold estates. *Key terms: fee simple, life estate, remainder, reversion, estate for years, periodic tenancy.*
4. **Ownership & How Title Is Held** — severalty, joint tenancy (4 unities), tenancy in common, community property & CP with right of survivorship, trusts, partnerships/LLCs. *Key terms: unity of time/title/interest/possession, right of survivorship, undivided interest.*
5. **Encumbrances: Liens, Easements & Restrictions** — voluntary/involuntary liens, mechanics' liens, judgment liens, easements (appurtenant/in gross, creation & termination), encroachments, licenses, CC&Rs. *Key terms: lien, easement, dominant/servient tenement, prescription, lis pendens.*
6. **Agency & Fiduciary Duties** — creation of agency, fiduciary duties (OLD CAR), dual agency, designated agency, agency disclosure requirements, termination. *Key terms: fiduciary, principal, dual agency, ostensible agency, ratification.*
7. **Contract Law Fundamentals** — elements of a valid contract, capacity, consideration, statute of frauds, void/voidable/unenforceable, performance, breach & remedies. *Key terms: offer, acceptance, consideration, rescission, liquidated damages, specific performance, novation.*
8. **Real Estate Contracts in Practice** — listing agreements (open/exclusive agency/exclusive right), buyer representation, the CA Residential Purchase Agreement structure, counteroffers, options, contingencies. *Key terms: exclusive right to sell, safety clause, option, contingency, "time is of the essence."*
9. **Disclosures in Residential Transactions** — TDS, Natural Hazard Disclosure, agency disclosure, lead-based paint, Megan's Law, death/AIDS disclosure rules, material facts. *Key terms: TDS, NHD, material fact, as-is, stigmatized property.*
10. **Escrow & Title Insurance** — escrow requirements & lifecycle, title search, abstract, CLTA vs. ALTA policies, preliminary reports, closing roles. *Key terms: escrow, neutral depository, chain of title, marketable title, preliminary report.*
11. **Real Estate Finance I: Instruments & Foreclosure** — promissory notes, trust deeds vs. mortgages, parties, judicial vs. non-judicial foreclosure, trustee's sale timeline, deficiency rules, alienation/acceleration clauses. *Key terms: trustor, trustee, beneficiary, power of sale, reinstatement, deed in lieu.*
12. **Real Estate Finance II: Markets, Loans & Programs** — primary/secondary markets, conventional vs. FHA/VA/CalVet, PMI/MIP, amortization, points, ARMs, TILA/Reg Z, RESPA, predatory-lending rules. *Key terms: LTV, PITI, discount points, APR, conforming loan, seller financing, wraparound.*
13. **Appraisal & Valuation** — value principles (substitution, highest & best use, etc.), sales comparison, cost, and income approaches, GRM, reconciliation, CMA vs. appraisal. *Key terms: market value, capitalization rate, depreciation (physical/functional/economic), gross rent multiplier.*
14. **Land Use, Planning & Zoning** — police power, general plan, zoning & variances, eminent domain vs. inverse condemnation, subdivision laws, environmental basics (CEQA overview). *Key terms: variance, nonconforming use, condemnation, dedication, subdivision map act.*
15. **Fair Housing & Ethics** — federal Fair Housing Act & protected classes, CA Unruh & FEHA, redlining/steering/blockbusting, advertising rules, ethical practice. *Key terms: protected class, steering, blockbusting, redlining, familial status.*
16. **Real Estate Taxation** — property tax & Prop 13, supplemental/transfer taxes, exemptions, income-tax basics for homeowners & investors, 1031 exchange overview, withholding (FIRPTA/CA). *Key terms: ad valorem, assessed value, basis, capital gain, boot, documentary transfer tax.*
17. **Landlord–Tenant & Property Management** — lease types & essential terms, rights & duties, security deposits, eviction process overview, habitability, management agreements, intro to rent regulation. *Key terms: gross/net lease, assignment vs. sublease, unlawful detainer, constructive eviction.*
18. **The Transaction Lifecycle, Trust Funds & Career Launch** — offer-to-close walkthrough, prorations & closing math, trust fund handling rules, recordkeeping, choosing a brokerage, capstone review. *Key terms: proration, impound account, trust fund, commingling, conversion.*

### Course 2 — Real Estate Practice (15 units)

1. Starting your practice: brokerage models, teams, compensation, business planning.
2. Prospecting & lead generation (spheres, farming, digital).
3. **Fair housing in practice + implicit bias (SB 263 required component)** — interactive scenarios and role-play exercises; case studies of discriminatory practice and correction. Build as participatory activities, not just reading.
4. Listing presentations & seller counseling.
5. Pricing property: CMA methodology and adjustments.
6. Marketing listings & advertising compliance.
7. Working with buyers: consultations, showings, agency duties in practice.
8. Writing & negotiating offers; multiple-offer strategy.
9. Contract-to-close: contingency management, timelines, escrow coordination.
10. Financing the buyer: prequalification vs. preapproval, loan process, working with lenders.
11. Disclosures & risk management in practice; avoiding lawsuits & license discipline.
12. **Trust funds & recordkeeping in practice** (deposits, handling deadlines, broker records).
13. Escrow, title & closing procedures in practice; closing statements.
14. Property management & leasing basics for agents.
15. Building a compliant, ethical long-term business; technology & AI tools; capstone.

### Course 3 — Legal Aspects of Real Estate (15 units)

1. Sources of real estate law & the court system. 2. Law of agency (deep dive & case law). 3. Contract law deep dive: formation defenses, interpretation, remedies. 4. Real property interests & conveyancing. 5. Deeds, recording, priorities & title problems. 6. Escrow & closing law; RESPA in depth. 7. Finance law: security instruments, foreclosure litigation, anti-deficiency rules. 8. Landlord–tenant law in depth. 9. Land use & environmental law. 10. Fair housing & civil rights law (federal + CA statutes & enforcement). 11. Easements, boundaries, nuisance & neighbor disputes. 12. Construction, mechanics' liens & new-home law. 13. Common interest developments & HOA law (Davis-Stirling overview). 14. Real estate litigation, ADR & license discipline. 15. Regulatory compliance capstone.

---

## 8. Content Generation Spec — how Claude Code writes every unit

Generate content **one unit at a time**, self-review against the checklist, update `/content/STATUS.md`, then proceed. Directory layout:

```
/content
  /principles/unit-01.mdx … unit-18.mdx
  /practice/unit-01.mdx … unit-15.mdx
  /legal-aspects/unit-01.mdx … unit-15.mdx
  /glossary/glossary.json          (target 500+ terms)
  /question-bank/{course}/unit-XX.json
  /exam-sim/blueprint.json
  STATUS.md                        (unit → draft / self-reviewed / Ramzi-approved / DRE-submitted)
```

**Every unit MDX must contain, in order:**

1. Frontmatter: course, unit number, title, estimated hours, exam-blueprint areas covered.
2. **Learning objectives** (5–8, measurable: "define," "distinguish," "calculate").
3. **Lesson body: 2,500–4,000 words** in 4–7 sections with clear headings. Plain, direct teaching voice; California-specific throughout; cite code sections generically where relevant (e.g., "under the Statute of Frauds (Civil Code §1624)") and flag any citation you are not certain of with `<!-- VERIFY -->`.
4. **3+ worked examples / mini case studies** drawn from realistic SoCal transactions (the founders' market: San Gabriel Valley, Inland Empire, LA, OC). Include at least one math walkthrough wherever the topic involves calculations (prorations, LTV, cap rates, commissions, transfer tax).
5. **Key terms box** — every term listed in §7 for that unit, plus any others introduced, each with a 1–2 sentence definition. These feed `glossary.json`.
6. **Exam tips** — 3–5 bullets on how this topic is tested on the state exam and common traps.
7. **Unit quiz: 15–20 original multiple-choice questions** (4 options, one correct) with a written rationale for every option (why right / why wrong). Store in the unit's question-bank JSON, not just prose.

**Question JSON schema:**

```json
{ "id": "PRIN-07-014", "course": "principles", "unit": 7,
  "blueprint_area": "contracts", "difficulty": 2,
  "stem": "...", "options": ["A","B","C","D"], "answer": 1,
  "rationales": ["...","...","...","..."], "terms": ["consideration"] }
```

**Originality & accuracy rules (hard requirements):**

- 100% original prose and questions. Never copy from existing schools, textbooks, or prep providers. Never reproduce actual DRE exam questions — model the *style and blueprint*, not the items.
- Teach current California law; when a rule has changed recently or you're unsure of the current figure/threshold, insert `<!-- VERIFY -->` rather than guessing confidently.
- Reading level ≈ accessible college; short paragraphs; define every term at first use.
- Consistent voice across all 48 units; second person ("you, the agent…").

## 9. Exam Prep Engine

**Target: the California Salesperson Exam — 150 questions, 3h15m, 70% to pass.** Build everything to the DRE's published content blueprint (reverify current weightings before launch — §14):

| Blueprint area | ~Weight |
|---|---|
| Practice of Real Estate & Disclosures (incl. trust funds, fair housing) | 25% |
| Laws of Agency & Fiduciary Duties | 17% |
| Property Ownership & Land Use Controls | 15% |
| Property Valuation & Financial Analysis | 14% |
| Contracts | 12% |
| Financing | 9% |
| Transfer of Property | 8% |

- **Question bank: 1,500+ original questions** distributed per the weights above (unit quizzes contribute; author additional exam-level items to fill each area, tagged by difficulty 1–3).
- **Simulator:** full 150-question timed exams assembled to blueprint proportions with per-area score reports; unlimited attempts (Plus+).
- **Adaptive drilling:** weakest-area practice sets; every wrong answer offers "Explain this to me" → AI tutor with the question, the student's choice, and the rationale in context.
- **Flashcards:** auto-generated from `glossary.json`, spaced-repetition scheduling (`srs_reviews`).
- **Readiness score:** rolling estimate from recent performance vs. blueprint; gate "you're ready to book the exam" messaging at a defensible threshold (e.g., ≥80% on two consecutive simulations).
- **Vocab sprints & math drills** (prorations, commissions, LTV, cap rate, transfer tax) as standalone modes.

## 10. AI Tutor Spec

- Route: `POST /api/tutor` (server-side Anthropic API, streaming). Panel available on every lesson and every question review (Plus/Premium; limited taste on Core).
- **Grounding:** retrieve relevant chunks from our own course content via pgvector; instruct the model to answer from LicensePath curriculum and cite the unit ("see Principles Unit 11"). If the answer isn't in the curriculum, say so and point to the closest unit.
- **Guardrails (system prompt requirements):** educational purposes only; never legal/tax/investment advice — redirect those to "consult a California real estate attorney/CPA"; never claim DRE affiliation; never reveal or fabricate actual state-exam questions; stay on real estate education topics.
- Log conversations (`tutor_conversations`) for QA; per-student daily token budget; cache frequent Q&A.

## 11. Brand & UI

- Working tokens (confirm final brand with Christopher before public launch): Primary navy `#0B1F3A`, accent gold `#C9A96E` (continuity with The Rabadi Group), success emerald, warm off-white surfaces. Display type: Outfit; body: Inter. Clean, credible, modern — closer to a fintech than a night school. Dark-on-light for study surfaces (long reading), dark marketing hero acceptable.
- Mobile-first: most studying happens on phones. Course player must be excellent at 390px.
- Component library: shadcn/ui, customized via tokens in `globals.css` / Tailwind config.

## 12. Build Phases & Definition of Done

0. Repo, CI (lint/typecheck/test on PR), Supabase project, env scaffolding, brand tokens.
1. Auth + student dashboard shell + entitlements model.
2. Course player + seat-time tracking (heartbeats, idle pause) + progress.
3. Quiz engine → final-exam engine with pacing enforcement (`earliest_final_unlock_at`), rotating forms, identity re-verification, retake limits.
4. Stripe products/checkout/webhooks → entitlements; installment plans; founding-cohort pricing.
5. Content generation: all 48 units per §8 (Principles first, in order), glossary, unit banks. Update STATUS.md continuously.
6. Exam prep engine per §9 (bank fill, simulator, SRS, readiness score).
7. AI tutor per §10.
8. Admin: review workflow, records/exports, certificates (PDF), DRE submission packager.
9. Marketing site + free diagnostic funnel + glossary SEO pages; a11y pass; launch checklist.

**Definition of done, every phase:** lint + typecheck + tests green · RLS verified on new tables · mobile viewport checked · no client-side secrets · compliance rules in §3 not weakened · CHANGELOG.md updated.

## 13. Working Agreements for Claude Code

- Plan before multi-file changes; show the plan for anything touching payments, exams, seat time, or certificates.
- Never mark content "approved" — only humans move STATUS.md past `self-reviewed`.
- Ask before destructive migrations or deleting content files.
- When uncertain about a legal/regulatory figure, use `<!-- VERIFY -->` and add it to §14 — do not guess silently.
- Keep this file current: when a decision here changes, update CLAUDE.md in the same PR.

## 14. VERIFY BEFORE LAUNCH (running list — resolve with dre.ca.gov + attorney)

- [ ] Current DRE course-approval forms, fees, and submission requirements (RE 306-series) and processing timelines.
- [ ] Exact regulation text for the 18-day/course-pacing rule and permissible final-exam administration online (identity verification standards).
- [ ] DRE minimum passing score and retake rules for course final exams; adjust configs if regs differ from 70% default.
- [ ] Required record-retention period for student records.
- [ ] SB 263 implicit-bias & fair-housing component specs for the Practice course (hours/interactivity requirements).
- [ ] BPPE exemption confirmation for a school offering solely DRE-approved courses.
- [ ] Enrollment agreement + cancellation/refund disclosure requirements; "pass guarantee" legality.
- [ ] Statutory citations flagged `<!-- VERIFY -->` inside course content.
- [ ] Final brand identity sign-off; trademark usage guidelines for "LicensePath."
