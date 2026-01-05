/* File: app/profit-margin-calculator/page.jsx */

import Link from "next/link";
// import Image from "next/image"; // Removed - Not used
import {
  RiArrowRightSLine,
  // RiShieldCheckLine, // Removed - Not used
  RiPercentLine,
  RiHandCoinLine,
  RiBarChartFill,
  RiCheckboxCircleFill,
  // RiCalculatorLine, // Removed - Not used
  // RiQuestionLine, // Removed - Not used
} from "react-icons/ri";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { MockProfitMarginHero } from "@/app/components/MockProfitMarginHero"; // <-- MODIFIED: Consistent path

// --- Metadata (Already Excellent) ---
export const metadata = {
  // Title targets "Profit Margin" and "Markup" (59 Characters)
  title: "Free Profit Margin Calculator & Markup Tool | SmoothLedger",
  description:
    "Instantly calculate gross profit margin, markup percentage, and net profit. 100% free online calculator with reverse margin mode. No signup required.",
  keywords: [
    "profit margin calculator",
    "free profit margin calculator",
    "how to calculate profit margin",
    "profit margin formula",
    "markup calculator",
    "gross profit margin calculator",
    "reverse margin calculator",
    "margin vs markup",
    "sales price calculator",
  ],
  alternates: {
    canonical: 'https://smoothledger.com/profit-margin-calculator', 
  },
  openGraph: {
    title: "Free Profit Margin Calculator & Markup Tool | SmoothLedger",
    description:
      "Instantly calculate gross profit margin, markup percentage, and net profit. 100% free online calculator with reverse margin mode.",
    url: "https://smoothledger.com/profit-margin-calculator",
    siteName: "SmoothLedger",
    images: [
      {
        url: "https://smoothledger.com/SLlogo1.png",
        width: 1200,
        height: 630,
        alt: "Free Profit Margin and Markup Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// --- FAQ Content ---
const faqs = [
  {
    question: "What is the difference between Gross Profit and Net Profit?",
    answer:
      "**Gross Profit** is your Revenue minus the Cost of Goods Sold (COGS). It's the profit you make on the product itself. **Net Profit** is your 'bottom-line' profit *after* you subtract all other business expenses (like rent, marketing, salaries, etc.) from your gross profit. This calculator focuses on Gross Profit Margin.",
  },
  {
    question: "What is a 'good' profit margin?",
    answer:
      "A 'good' profit margin varies wildly by industry. A retail or grocery store might have a thin margin (5-10%), while a software or consulting business might have a very high margin (50-80%). The key is to know *your* margin so you can price products effectively and ensure your business is healthy.",
  },
  {
    question: "Can I use this profit margin calculator for services?",
    answer:
      "Yes, absolutely. For a service, your 'Cost' would be the direct costs associated with providing that service (e.g., your own hourly wage, software costs, contractor fees). The 'Revenue' is what you charge the client. It works exactly the same way.",
  },
  {
    question: "Is this calculator secure? Is my data saved?",
    answer:
      "Yes, it is 100% secure. All calculations are done in your own browser. We do not (and cannot) see, save, or store any of the numbers you enter. It is completely private and anonymous.",
  },
];

// --- Main Page Component ---
export default function ProfitMarginLandingPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* --- ADDED: JSON-LD Schema for SoftwareApplication --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SmoothLedger Profit Margin Calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
            },
            description:
              "A free online tool to calculate profit margin, markup, and gross profit instantly.",
          }),
        }}
      />
      {/* --- Hero Section --- */}
      {/* --- MODIFIED: Padding adjusted --- */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] py-20 sm:py-24">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
                Free Profit Margin Calculator
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Find Your Profit, Margin, & Markup
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Instantly.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                Are you pricing your products correctly? Use our free profit
                margin calculator to find your profit, margin, and markup in one
                click. No math required.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/profit-margin-calculator/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Start Calculating
                  <RiArrowRightSLine className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="mt-8 flex justify-center lg:justify-start gap-x-6 gap-y-2 flex-wrap">
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  Calculates Margin & Markup
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  No Sign-up Required
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  100% Free
                </span>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative lg:mt-0 mt-12">
              <MockProfitMarginHero />
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* --- MODIFIED: SEO H2 --- */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Features of Our Free Profit Calculator
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Our tool gives you the key numbers you need to price your products
              and grow your business.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiHandCoinLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Gross Profit
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Instantly see your gross profit (the raw cash you make on a
                sale) in dollars.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiPercentLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Profit Margin (%)
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Understand your profitability as a percentage of your revenue.
                This is the most important metric for business health.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiBarChartFill className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Markup (%)
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                See your profit as a percentage of your cost. This is crucial for
                setting a correct and consistent pricing strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEO Content Block (Margin vs Markup) --- */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Profit Margin vs. Markup: The Critical Difference
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Understanding the difference between profit margin and markup is
              the most important step in pricing your products. Our calculator
              gives you both, instantly.
            </p>
          </div>
          <div className="mt-16 prose prose-lg lg:prose-xl dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400">
            <h3>The Profit Margin Formula</h3>
            <p>
              <strong>Profit Margin</strong> is your profit's percentage of the{" "}
              <strong>selling price (revenue)</strong>. This formula tells you
              how much profit your business makes for every dollar it earns.
            </p>
            <pre className="bg-slate-100 overflow-x-auto dark:bg-slate-800 rounded-lg p-4">
              <code>Profit Margin % = ( (Revenue - Cost) / Revenue ) * 100</code>
            </pre>
            <p>
              <strong>Example:</strong> You sell a product for $100. It cost you
              $70.
              <br />
              ($100 - $70) / $100 = 0.30
              <br />
              Your <strong>Profit Margin is 30%</strong>.
            </p>

            <h3 className="mt-12">The Markup Formula</h3>
            <p>
              <strong>Markup</strong> is your profit's percentage of the{" "}
              <strong>cost</strong>. This formula tells you how much you've
              "marked up" your product from its original cost.
            </p>
            <pre className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto">
              <code>Markup % = ( (Revenue - Cost) / Cost ) * 100</code>
            </pre>
            <p>
              <strong>Example:</strong> You sell a product for $100. It cost you
              $70.
              <br />
              ($100 - $70) / $70 = 0.428
              <br />
              Your <strong>Markup is 42.8%</strong>.
            </p>

            <h3 className="mt-12">Why Does This Matter?</h3>
            <p>
              If you confuse markup and margin, you can accidentally underprice
              your products and lose money. Many businesses aim for a "30%
              margin" but mistakenly calculate a "30% markup," which is a much
              lower profit margin. Our <strong>free profit margin
              calculator</strong> provides both numbers clearly, so you can price
              with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* --- MODIFIED: SEO H2 --- */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Profit Margin & Markup FAQs
            </h2>
          </div>
          <div className="mt-12">
            {/* --- MODIFIED: Passing in new FAQs --- */}
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* --- Final CTA Section (Already Good) --- */}
      <section className="bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="relative isolate overflow-hidden bg-blue-600 dark:bg-blue-800 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Know Your Numbers. Price with Confidence.
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200">
              Use our free profit margin calculator to find your profitability in
              seconds.
            </p>
            <Link
              href="/profit-margin-calculator/create"
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              Start Calculating for Free
              <RiArrowRightSLine className="ml-2 h-5 w-5" />
            </Link>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#gradient-cta)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="gradient-cta">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#3B82F6" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}