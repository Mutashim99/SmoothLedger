import { Inter } from "next/font/google";
// import Link from "next/link"; // No longer needed here
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { ModernNavbar } from "@/app/components/ModernNavbar";
import { ModernFooter } from "@/app/components/ModernFooter"; // <-- NEW IMPORT
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
// DELETED: Removed Ri... icons, they are now in ModernFooter.jsx

const inter = Inter({ subsets: ["latin"] });

// --- NEW: ADVANCED METADATA ---
const siteConfig = {
  url: "https://smoothledger.com", // Replace with your final domain
  title: "SmoothLedger | Free Financial Tools for Freelancers",
  description:
    "Create free invoices, payslips, quotes, and calculate loans or profit margins. 100% free, no signups or login is required. The ultimate toolbox for small businesses.",
  twitterHandle: "@smoothledger", // NEW: Add your Twitter handle
};

export const metadata = {
  // NEW: This fixes the `metadataBase` warning
  metadataBase: new URL(siteConfig.url),

  // --- 1. SEO Core (from your example) ---
  title: {
    template: "%s",
    default: siteConfig.title,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico", // Points to public/favicon.ico
    shortcut: "/favicon.ico", // Explicitly for legacy browsers/Bing
  },
  keywords: [
    "free invoice generator",
    "free payslip generator",
    "free quotation generator",
    "loan calculator",
    "profit margin calculator",
    "financial tools",
    "freelance tools",
    "small business",
    "no signup",
  ],

  // --- 2. Robots & Canonical (from your example) ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": siteConfig.url,
    },
  },

  // --- 3. Brand / Icons (from your example) ---
  themeColor: "#ffffff",
  manifest: "/site.webmanifest",

  // --- 4. Open Graph (for Facebook, LinkedIn, etc.) ---
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: "SmoothLedger",
    images: [
      {
        url: `${siteConfig.url}/SLlogo1.png`,
        width: 1200,
        height: 630,
        alt: "SmoothLedger - Free Financial Tools",
      },
    ],
    locale: "en_US",
  },

  // --- 5. Twitter Cards (for Twitter) ---
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/SLlogo1.png`],
    // site: siteConfig.twitterHandle,
    // creator: siteConfig.twitterHandle,
  },

  // // --- 6. Ownership Verification (from your example) ---
  // verification: {
  //   // google: "YOUR_GOOGLE_TOKEN",
  // },
};
// --- END OF METADATA ---

// --- DELETED ---
// The entire 'function Footer() { ... }' block has been removed from this file
// and moved to app/components/ModernFooter.jsx

// --- Root Layout (Imports the new components) ---
export default function RootLayout({ children }) {
  // NEW: Define the Structured Data for your Organization and Website
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SmoothLedger",
    url: siteConfig.url,
    logo: `${siteConfig.url}/SLlogo1.png`, // Assumes you have an app/icon.png
    sameAs: [
      // "https://twitter.com/YOUR_TWITTER",
      "https://github.com/Mutashim99",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SmoothLedger",
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        // This tells Google how to search your site.
        // Even if you don't have a search bar yet, this is safe to add.
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-slate-950`}
      >
        {/* NEW: Add Structured Data scripts here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="ea88ae59-b8b2-4f9d-a2c3-182a5650fde6"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModernNavbar />
          <main className="flex-grow">{children}</main>
          <Analytics />
          <ModernFooter />{" "}
          {/* <-- UPDATED: Now using the imported Client Component */}
        </ThemeProvider>
      </body>
    </html>
  );
}
