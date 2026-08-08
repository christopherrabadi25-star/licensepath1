import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LicensePath handles student and prospective student data.",
  alternates: { canonical: "/legal/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="wrap py-16">
      <p className="anno">Legal</p>
      <h1 className="mt-4 text-4xl font-semibold">Privacy policy</h1>
      <p className="measure mt-6 leading-relaxed" style={{ color: "var(--ink-2)" }}>
        This page is a placeholder. A complete privacy policy is being prepared with counsel and
        will be published before enrollment opens.
      </p>
      <p className="measure mt-4 leading-relaxed" style={{ color: "var(--ink-3)" }}>
        Two commitments hold regardless: we treat student records as sensitive, and we do not sell
        or share student data.
      </p>
    </article>
  );
}
