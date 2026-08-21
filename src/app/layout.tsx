import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { MotionRoot } from "@/components/motion/MotionRoot";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CartProvider } from "@/components/commerce/CartProvider";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import {
  ADDRESS,
  GEO,
  GOOGLE_URL,
  OPENING_HOURS_SPEC,
  PHONES,
  SERVICE_AREA,
  SITE,
} from "@/lib/site";

// `latin-ext` is required — č, š and ž live outside the basic latin
// subset and would otherwise fall back to a different typeface.
const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Servis in prodaja klim, toplotnih črpalk in bele tehnike | Dolenjska",
    template: `%s | ${SITE.name}`,
  },
  description:
    "Servis in montaža klimatskih naprav, toplotnih črpalk, bele tehnike ter gostinske opreme na Dolenjskem in v Posavju. Uradni serviser vodilnih znamk. Pokličite 07 30 99 010.",
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sl_SI",
    siteName: SITE.name,
    url: SITE.url,
    title:
      "Servis in prodaja klim, toplotnih črpalk in bele tehnike | Dolenjska",
    description:
      "Servis in montaža klimatskih naprav, toplotnih črpalk in bele tehnike na Dolenjskem in v Posavju. Uradni serviser vodilnih znamk.",
    images: [
      {
        url: "/images/og-emt.jpg",
        width: 1200,
        height: 630,
        alt: "Klimatska naprava v spalnici — Elektromehanika Turk.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Servis in prodaja klim, toplotnih črpalk in bele tehnike | Dolenjska",
    description:
      "Servis in montaža klimatskih naprav, toplotnih črpalk in bele tehnike na Dolenjskem in v Posavju.",
    images: ["/images/og-emt.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#12151A",
  colorScheme: "light",
};

/**
 * Only verified facts are emitted. `aggregateRating` is deliberately
 * absent: Google publishes no review count for this profile, and a
 * rating without one is not valid structured data. Coordinates and the
 * profile link come from the Google Business Profile listing.
 */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": `${SITE.url}/#organizacija`,
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: PHONES.map((p) => p.tel),
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    postalCode: ADDRESS.postalCode,
    addressLocality: ADDRESS.city,
    addressCountry: ADDRESS.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  sameAs: [GOOGLE_URL],
  openingHoursSpecification: OPENING_HOURS_SPEC,
  areaServed: SERVICE_AREA.map((name) => ({ "@type": "City", name })),
  knowsLanguage: "sl-SI",
};

/**
 * Adds `.js-anim` before first paint so pre-reveal elements start hidden
 * without a flash. Runs only when motion is welcome — with reduced
 * motion or no JS, nothing is ever hidden.
 *
 * The timeout is the safety net: `.js-anim` is what holds those elements
 * at opacity 0, so if the motion chunk never arrives — offline, a failed
 * asset, a JS error — the class is dropped and every section becomes
 * visible. MotionProvider clears the timer once it has taken over.
 * Animation must never be able to gate access to content.
 */
const revealBootstrap = `(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;var d=document.documentElement;d.classList.add("js-anim");window.__emtRevealFallback=setTimeout(function(){d.classList.remove("js-anim")},4000)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sl"
      className={`${geist.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#vsebina"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-[10px] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-on-dark"
        >
          Preskoči na vsebino
        </a>

        <MotionRoot />
        <CartProvider>
          <Navbar />

          {/* Clearance for the fixed mobile action bar lives on the footer's
              bottom row — that is the content the bar would otherwise cover. */}
          {/* tabIndex={-1} so the skip link actually moves focus here, not
              just the scroll position. */}
          <main id="vsebina" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>

          <Footer />
          <MobileBottomBar />
          <CartDrawer />
        </CartProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </body>
    </html>
  );
}
