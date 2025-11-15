import Link from "next/link";
import Image from "next/image";
import {
  RiArrowRightSLine,
  RiShieldCheckLine,
  RiPercentLine,
  RiHandCoinLine,
  RiBarChartFill,
  RiCheckboxCircleFill,
  RiCalculatorLine,
  RiQuestionLine,
} from  "react-icons/ri"; // Using /index.js for Server Components
import { FaqAccordion } from "@/app/components/FaqAccordion"; // Ensure this path is correct
import { MockProfitMarginHero } from "../components/MockProfitMarginHero";
// 1. This is your Server Component page.
// It exports metadata and renders the page.
export const metadata = {
  title: "Free Profit Margin Calculator | Calculate Margin & Markup",
  description:
    "Instantly calculate your profit margin, gross profit, and markup with our free online calculator. Simple, fast, and no signup required. Perfect for pricing products.",
  keywords: [
    "profit margin calculator",
    "free profit margin calculator",
    "how to calculate profit margin",
    "profit margin formula",
    "markup calculator",
    "gross profit margin calculator",
    "net profit margin",
    "margin vs markup",
    "business profit calculator",
  ],
};

// --- FAQ Content ---
const faqs = [
  {
    question: "What is the difference between Profit Margin and Markup?",
    answer:
      "It's a common confusion! **Profit Margin** is your profit as a percentage of your *revenue* (selling price). **Markup** is your profit as a percentage of your *cost*. For example, if you buy a an item for $50 (Cost) and sell it for $100 (Revenue), your profit is $50. Your *Markup* is 100% ($50 profit / $50 cost), but your *Profit Margin* is 50% ($50 profit / $100 revenue).",
  },
  {
    question: "How do I calculate profit margin? (Formula)",
    answer:
      "The profit margin formula is: **Profit Margin % = (Net Profit / Revenue) * 100**. Net Profit is your Revenue minus your Cost (Revenue - Cost). Our free profit margin calculator does this for you instantly.",
  },
  {
    question: "Is this profit margin calculator completely free?",
    answer:
      "Yes. Our calculator is 100% free, with no sign-ups or limitations. All calculations are done in your browser, and we never save or see your financial data.",
  },
  {
    question: "What is a 'good' profit margin?",
    answer:
      "A 'good' profit margin varies wildly by industry. A retail or grocery store might have a thin margin (5-10%), while a software or consulting business might have a very high margin (50-80%). The key is to know *your* margin so you can price products effectively and ensure your business is healthy.",
  },
];

// --- Main Page Component ---
export default function ProfitMarginLandingPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] py-24 sm:py-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
                Free Profit Margin Calculator
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Find Your Profit,
                Margin, & Markup
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Instantly.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                Are you pricing your products correctly? Use our free profit margin calculator to find your profit, margin, and markup in one click. No math required.
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
              <MockProfitMarginHero /> {/* Use your new component here! */}
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Stop Guessing. Start Knowing.
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Our free profit calculator gives you the key numbers you need to price your products and grow your business.
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
                Instantly see your gross profit (the raw cash you make on a sale) in dollars.
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
                Understand your profitability as a percentage of your revenue. This is the most important metric for business health.
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
                See your profit as a percentage of your cost. This is crucial for setting a correct and consistent pricing strategy.
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
              Understanding the difference between profit margin and markup is the most important step in pricing your products. Our calculator gives you both, instantly.
            </p>
          </div>
          <div className="mt-16 prose prose-lg lg:prose-xl dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400">
            <h3>The Profit Margin Formula</h3>
            <p>
              **Profit Margin** is your profit's percentage of the **selling price (revenue)**. This formula tells you how much profit your business makes for every dollar it earns.
            </p>
            <pre className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4"><code>
              Profit Margin % = ( (Revenue - Cost) / Revenue ) * 100
            </code></pre>
            <p>
              <strong>Example:</strong> You sell a product for $100. It cost you $70.
              <br />
              ($100 - $70) / $100 = 0.30
              <br />
              Your **Profit Margin is 30%**.
            </p>

            <h3 className="mt-12">The Markup Formula</h3>
            <p>
              **Markup** is your profit's percentage of the **cost**. This formula tells you how much you've "marked up" your product from its original cost.
            </p>
            <pre className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4"><code>
              Markup % = ( (Revenue - Cost) / Cost ) * 100
            </code></pre>
            <p>
              <strong>Example:</strong> You sell a product for $100. It cost you $70.
              <br />
              ($100 - $70) / $70 = 0.428
              <br />
              Your **Markup is 42.8%**.
            </p>
            
            <h3 className="mt-12">Why Does This Matter?</h3>
            <p>
              If you confuse markup and margin, you can accidentally underprice your products and lose money. Many businesses aim for a "30% margin" but mistakenly calculate a "30% markup," which is a much lower profit margin. Our free calculator provides both numbers clearly, so you can price with confidence.
            </p>
          </div>
        </div>
      </section>
      
      {/* --- FAQ Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="relative isolate overflow-hidden bg-blue-600 dark:bg-blue-800 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Know Your Numbers. Price with Confidence.
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200">
              Use our free profit margin calculator to find your profitability in seconds.
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
              <circle cx={512} cy={512} r={512} fill="url(#gradient-cta)" fillOpacity="0.7" />
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