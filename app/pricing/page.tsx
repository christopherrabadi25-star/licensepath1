import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Planned California course pricing", robots: { index: false, follow: false } };

const tiers = [
  { name: "Exam Prep", price: "$79", description: "For candidates who completed qualifying education elsewhere.", features: ["Original California practice questions", "Full blueprint-based exam simulations", "Explanations for every answer", "Readiness dashboard"] },
  { name: "Complete", price: "$179", description: "The full California salesperson education path.", featured: true, features: ["All three required 45-hour courses", "48 guided learning units", "Lesson practice and unit quizzes", "Exam prep included", "12 months planned access"] },
  { name: "Complete + Support", price: "$279", description: "The full path with more structure and guided support.", features: ["Everything in Complete", "Adaptive study recommendations", "Live group review sessions", "Priority learner support"] },
];

export default function PricingPage() {
  return <>
    <section className="pricing-hero"><div className="wrap pricing-heading"><p className="eyebrow">California · planned pricing</p><h1>A serious education.<br /><em>Without the legacy markup.</em></h1><p>Clear pricing for a connected course experience. These plans are a preview—not an offer for sale. Enrollment will open only after California DRE approval.</p></div></section>
    <section className="wrap pricing-section">
      <div className="approval-banner"><span>COURSE STATUS</span><strong>California approval pending</strong><p>No checkout is live and no payment is being collected.</p></div>
      <div className="pricing-grid">{tiers.map((tier) => <article className={`pricing-card${tier.featured ? " is-featured" : ""}`} key={tier.name}>{tier.featured && <span className="pricing-badge">THE COMPLETE PATH</span>}<p className="eyebrow">{tier.name}</p><p className="price">{tier.price}</p><p className="price-note">planned one-time price</p><p className="tier-description">{tier.description}</p><ul>{tier.features.map((feature) => <li key={feature}><span aria-hidden>✓</span>{feature}</li>)}</ul><Link href="/#notify" className={tier.featured ? "button button-primary" : "button button-outline"}>Join for launch updates <span aria-hidden>→</span></Link></article>)}</div>
      <div className="pricing-promise"><div><p className="eyebrow">Our pricing promise</p><h2>Pay for teaching—not a dated platform, confusing upgrades, or artificial urgency.</h2></div><p>Founding-cohort pricing will be finalized after approval and before enrollment opens. We will show exactly what each plan contains, honor the published price, and never use a fake countdown timer to force a decision.</p></div>
    </section>
  </>;
}
