import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});
const body = Public_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LicensePath — California Real Estate License Courses & Exam Prep",
    template: "%s | LicensePath",
  },
  description:
    "How to get a California real estate salesperson license: the three required 45-hour courses, the 150-question state exam, and what the process actually costs. Course approval pending with the California DRE.",
  metadataBase: new URL("https://licensepath.com"),
  openGraph: {
    type: "website",
    siteName: "LicensePath Real Estate Academy",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

const nav = [
  { href: "/exam", label: "The exam" },
  { href: "/courses", label: "Courses" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
];

/** Organization-level structured data. Course-level JSON-LD lives on /courses. */
const orgLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "LicensePath Real Estate Academy",
  description:
    "California real estate pre-licensing education. Course approval pending with the California Department of Real Estate.",
  url: "https://licensepath.com",
  areaServed: { "@type": "State", name: "California" },
  founder: [
    { "@type": "Person", name: "Christopher Rabadi" },
    { "@type": "Person", name: "Ramzi Rabadi" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[color:var(--ink)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <header
          className="sticky top-0 z-40 border-b backdrop-blur"
          style={{ borderColor: "var(--rule)", background: "color-mix(in srgb, var(--paper) 88%, transparent)" }}
        >
          <div className="wrap flex h-14 items-center justify-between gap-6">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-display text-[1.05rem] font-semibold tracking-tight">
                LicensePath
              </span>
              <span className="anno hidden sm:inline">California</span>
            </Link>
            <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
              {nav.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm transition hover:text-[color:var(--ink)]"
                  style={{ color: "var(--ink-3)" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link href="/#notify" className="btn btn-ink !px-4 !py-2 !text-xs">
              Get launch updates
            </Link>
          </div>
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="mt-24 border-t" style={{ borderColor: "var(--rule)", background: "var(--paper-2)" }}>
          <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="font-display text-lg font-semibold">LicensePath</p>
              <p className="measure mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-3)" }}>
                California real estate pre-licensing education, written by licensed California
                agents.
              </p>
            </div>
            {[
              {
                h: "Learn",
                links: [
                  ["/exam", "The California exam"],
                  ["/courses", "The three courses"],
                  ["/glossary", "Real estate glossary"],
                ],
              },
              {
                h: "Company",
                links: [
                  ["/about", "About the founders"],
                  ["/#notify", "Launch updates"],
                ],
              },
              {
                h: "Legal",
                links: [
                  ["/legal/privacy", "Privacy policy"],
                  ["/legal/terms", "Terms of service"],
                ],
              },
            ].map((col) => (
              <div key={col.h}>
                <h2 className="anno">{col.h}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} className="transition hover:underline" style={{ color: "var(--ink-2)" }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/*
            COMPLIANCE — CLAUDE.md §3.2. This notice is in the root layout so it
            appears on every page automatically and cannot be omitted from a new
            one. Do not soften this language until DRE approval letters are in hand.
          */}
          <div className="border-t" style={{ borderColor: "var(--rule)" }}>
            <div className="wrap py-7">
              <p className="anno" style={{ color: "var(--gold-deep)" }}>
                Course approval pending
              </p>
              <p className="mt-2 max-w-4xl text-xs leading-relaxed" style={{ color: "var(--ink-3)" }}>
                LicensePath courses have not yet been approved by the California Department of Real
                Estate. They are not currently offered for sale and cannot currently be used to
                satisfy California salesperson licensing requirements. LicensePath is an independent
                company and is not affiliated with, endorsed by, or acting on behalf of the
                California Department of Real Estate. Nothing on this site is legal, tax, or
                financial advice.
              </p>
              <p className="mt-5 text-xs" style={{ color: "var(--ink-4)" }}>
                © {new Date().getFullYear()} LicensePath Real Estate Academy
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
