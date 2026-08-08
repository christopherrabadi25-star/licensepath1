import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the LicensePath website and courses.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <article className="wrap py-16">
      <p className="anno">Legal</p>
      <h1 className="mt-4 text-4xl font-semibold">Terms of service</h1>
      <p className="measure mt-6 leading-relaxed" style={{ color: "var(--ink-2)" }}>
        This page is a placeholder. Complete terms, along with the enrollment agreement and
        cancellation and refund policy required for a California real estate school, are being
        prepared with counsel and will be published before enrollment opens.
      </p>
      <p className="measure mt-4 leading-relaxed" style={{ color: "var(--ink-3)" }}>
        Nothing on this site is legal, tax, or financial advice.
      </p>
    </article>
  );
}
