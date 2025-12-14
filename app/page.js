import HomePageClient from "./components/HomePageClient";

// Optimized Metadata for Home Page
export const metadata = {
  title: "Free Financial Tools for Freelancers & Small Business | SmoothLedger",
  description:
    "The ultimate free financial toolbox. Create professional invoices, payslips, and quotes in seconds. Calculate loans and profit margins. No signup required.",
  keywords: [
    "free financial tools",
    "invoice generator",
    "payslip maker",
    "quotation generator",
    "loan calculator",
    "profit margin calculator",
    "freelance tools",
    "small business finance tools",
    "no signup invoice",
    "pdf generator tools",
  ],
  openGraph: {
    title: "Free Financial Tools for Freelancers | SmoothLedger",
    description:
      "Create professional invoices, payslips, and quotes in seconds. 100% free, no signups, no login required.",
    url: "https://smoothledger.com",
    siteName: "SmoothLedger",
    images: [
      {
        url: "https://smoothledger.com/SLlogo1.png",
        width: 1200,
        height: 630,
        alt: "SmoothLedger Financial Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}