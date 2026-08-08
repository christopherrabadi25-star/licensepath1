import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Outfit({ subsets: ["latin"], variable: "--font-display", display: "swap" });

/**
 * COMPLIANCE (CLAUDE.md §3.2): the site must NOT claim "DRE-approved" until
 * approval letters are in hand. Until then, all copy — including metadata —
 * says "pending DRE approval". Do not weaken this without approval letters.
 */
export const metadata: Metadata = {
  title: {
    default: "LicensePath Real Estate Academy | California Salesperson Exam Prep",
    template: "%s | LicensePath",
  },
  description:
    "California real estate pre-licensing courses and exam preparation, built by practicing California agents. Course approval pending with the California DRE.",
  metadataBase: new URL("https://licensepath.com"),
};

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/exam", label: "The CA Exam" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <header className="border-b border-navy/10 bg-white">
          <div className="container-content flex h-16 items-center justify-between gap-6">
            <Link href="/" className="font-display text-lg font-bold text-navy">
              LicensePath
            </Link>
            <nav aria-label="Main" className="hidden gap-7 md:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-navy/80 transition hover:text-navy"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link href="/pricing" className="btn-primary !px-4 !py-2 text-sm">
              Get started
            </Link>
          </div>
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="mt-20 border-t border-navy/10 bg-navy text-white/80">
          <div className="container-content grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-lg font-bold text-white">LicensePath</p>
              <p className="mt-3 text-sm leading-relaxed">
                California real estate education built by agents who actually sell.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Courses</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/courses">Real Estate Principles</Link></li>
                <li><Link href="/courses">Real Estate Practice</Link></li>
                <li><Link href="/courses">Legal Aspects of Real Estate</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Company</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/about">About the founders</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/exam">The California exam</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Legal</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/legal/privacy">Privacy policy</Link></li>
                <li><Link href="/legal/terms">Terms of service</Link></li>
              </ul>
            </div>
          </div>

          {/* Compliance notice — required until DRE approval letters are in hand (§3.2) */}
          <div className="border-t border-white/15">
            <div className="container-content py-6 text-xs leading-relaxed text-white/70">
              <p className="font-semibold text-white/90">Course approval pending</p>
              <p className="mt-1 max-w-3xl">
                LicensePath courses are pending approval by the California Department of Real
                Estate. Courses are not yet offered for sale and cannot yet be used to satisfy
                California salesperson licensing requirements. LicensePath is not affiliated with
                or endorsed by the California Department of Real Estate.
              </p>
              <p className="mt-4">
                © {new Date().getFullYear()} LicensePath Real Estate Academy. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
