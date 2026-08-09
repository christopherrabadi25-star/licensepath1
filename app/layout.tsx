import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap", axes: ["SOFT", "WONK", "opsz"] });
const body = Public_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "LicensePath — Modern real estate licensing education", template: "%s | LicensePath" },
  description: "A modern real estate licensing school built state by state. California pre-licensing is the first path in development. Course approval pending.",
  metadataBase: new URL("https://licensepath.com"),
  openGraph: { type: "website", siteName: "LicensePath", locale: "en_US", title: "LicensePath — Learn the work. Earn the license.", description: "Modern real estate licensing education, built state by state. California first." },
  twitter: { card: "summary_large_image", title: "LicensePath — Modern real estate licensing education", description: "Learn the work. Earn the license. California is the first path in development." },
  robots: { index: true, follow: true },
};

const nav = [
  { href: "/courses", label: "California course" },
  { href: "/exam", label: "Exam guide" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "Our approach" },
];

const orgLd = {
  "@context": "https://schema.org", "@type": "EducationalOrganization", name: "LicensePath",
  description: "A modern real estate licensing school building state-specific education, beginning with California.",
  url: "https://licensepath.com", areaServed: { "@type": "Country", name: "United States" },
  founder: [{ "@type": "Person", name: "Christopher Rabadi" }, { "@type": "Person", name: "Ramzi Rabadi" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <header className="site-header">
          <div className="wrap nav-shell">
            <Link href="/" className="brand" aria-label="LicensePath home"><span className="brand-mark">LP</span><span>LicensePath</span></Link>
            <nav aria-label="Main navigation" className="main-nav">
              {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </nav>
            <div className="nav-actions"><Link href="/sign-in" className="sign-in-link">Sign in</Link><Link href="/#notify" className="nav-cta">Get early access <span aria-hidden>→</span></Link></div>
          </div>
        </header>

        <main id="main" className="flex-1">{children}</main>

        <footer className="site-footer">
          <div className="wrap footer-main">
            <div className="footer-brand"><Link href="/" className="brand"><span className="brand-mark">LP</span><span>LicensePath</span></Link><p>Real estate education built for the career ahead—not the course behind you.</p><span>California first. More states to follow.</span></div>
            <div><h2>Explore</h2><Link href="/courses">California course</Link><Link href="/exam">Exam guide</Link><Link href="/pricing">Planned pricing</Link><Link href="/glossary">Glossary</Link></div>
            <div><h2>Company</h2><Link href="/about">Our approach</Link><Link href="/#notify">Launch updates</Link><Link href="/learn">Curriculum preview</Link></div>
            <div><h2>Legal</h2><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link></div>
          </div>
          <div className="wrap compliance-block">
            <div><strong>California course approval pending</strong><span>Important enrollment notice</span></div>
            <p>LicensePath’s California courses have not yet been approved by the California Department of Real Estate. They are not offered for sale and cannot currently satisfy California salesperson licensing requirements. LicensePath is independent and is not affiliated with or endorsed by the California DRE. Nothing on this site is legal, tax, or financial advice.</p>
          </div>
          <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} LicensePath</span><span>Built for future real estate professionals across the United States.</span></div>
        </footer>
      </body>
    </html>
  );
}
