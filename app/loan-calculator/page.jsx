/* File: app/loan-calculator/page.jsx */

import Link from "next/link";
// import Image from "next/image"; // Removed - Not used
import {
  RiArrowRightSLine,
  RiShieldCheckLine,
  // RiUserSearchLine, // Removed - Not used
  RiPieChart2Line,
  RiTableLine,
  // RiCalendar2Line, // Removed - Notused
  RiCheckboxCircleFill,
  RiBankLine,
  RiHome4Line,
  RiCarLine,
} from "react-icons/ri";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { MockLoanCalcHero } from "@/app/components/MockLoanCalcHero"; // <-- MODIFIED: Consistent path

// --- Metadata (Already Excellent) ---
export const metadata = {
  // Title targets the tool name AND the specific feature users hunt for
  title: "Free Loan Calculator & Amortization Schedule | SmoothLedger",
  description:
    "Calculate monthly payments, total interest, and view full amortization schedules instantly. Free tool for mortgages, car loans, and personal loans.",
  keywords: [
    "free loan calculator",
    "amortization schedule calculator",
    "mortgage payment calculator",
    "car loan calculator",
    "personal loan calculator",
    "loan amortization table",
    "EMI calculator",
    "calculate monthly interest",
    "simple loan calculator",
  ],
  alternates: {
    canonical: 'https://smoothledger.com/loan-calculator', 
  },
  openGraph: {
    title: "Free Loan Calculator & Amortization Schedule | SmoothLedger",
    description:
      "Calculate monthly payments, total interest, and view full amortization schedules instantly. Free tool for mortgages, car loans, and personal loans.",
    url: "https://smoothledger.com/loan-calculator",
    siteName: "SmoothLedger",
    images: [
      {
        url: "https://smoothledger.com/SLlogo1.png",
        width: 1200,
        height: 630,
        alt: "Free Loan and Amortization Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// --- FAQ Content ---
const faqs = [
  {
    question: "Is this loan calculator completely free?",
    answer:
      "Yes. Our loan calculator is 100% free to use, with no sign-ups, ads, or limitations. You can run as many calculations as you need.",
  },
  {
    question: "What is an amortization schedule?",
    answer:
      "An amortization schedule is a complete table of your loan payments. It shows you exactly how much of each monthly payment goes towards the principal (the loan balance) and how much goes towards interest, for the entire life of the loan.",
  },
  {
    question: "Can I use this for a mortgage or a car loan?",
    answer:
      "Absolutely. This tool works perfectly as a mortgage calculator, car loan calculator, or for any fixed-rate personal loan. Just enter your total loan amount, interest rate, and the loan term in years.",
  },
  {
    question: "Is my financial data saved?",
    answer:
      "No. All calculations are performed directly in your browser. We do not see, save, or store any of the numbers you enter. It's completely private and secure.",
  },
];

// --- Main Page Component ---
export default function LoanCalculatorLandingPage() {
  return (
    <div className="bg-white dark:bg-slate-950 ">
      {/* --- ADDED: JSON-LD Schema for FinanceApplication --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SmoothLedger Loan Calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
            },
            description:
              "A free online tool to calculate loan payments, interest, and amortization schedules instantly.",
            featureList: [
              "Monthly Payment Calculation",
              "Total Interest Calculation",
              "Amortization Schedule",
              "Pie Chart Visualization",
            ],
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
                Free Loan Calculator
              </span>
              {/* --- MODIFIED: Minor H1 Tweak --- */}
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
                See Your Monthly Payments &
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Total Interest Instantly.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                Don't guess your payments. Our free loan calculator makes it
                easy to find your monthly payment, see the total interest, and
                view a full amortization schedule.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/loan-calculator/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Start Calculating
                  <RiArrowRightSLine className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="mt-8 flex justify-center lg:justify-start gap-x-6 gap-y-2 flex-wrap">
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  100% Free
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  No Sign-up Required
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  Full Amortization Table
                </span>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative lg:mt-0 mt-12">
              <MockLoanCalcHero />
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
              Key Features of Our Loan Payment Calculator
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Our calculator goes beyond just the monthly payment. We provide
              all the details you need to make a smart financial decision.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiPieChart2Line className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Visualize Your Payments
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                See a clear, interactive pie chart that breaks down your total
                payment into principal vs. total interest.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiTableLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Full Amortization Table
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                View a complete, year-by-year (or month-by-month) breakdown of
                your loan, showing the interest, principal, and remaining
                balance for every single payment.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiShieldCheckLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Private and Secure
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                All calculations are done instantly in your browser. We don't
                save, see, or share any of your financial data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- What is Amortization? (SEO Content) --- */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* --- MODIFIED: SEO H2 --- */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              How to Understand Your Loan: Principal, Interest, & Amortization
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Our calculator helps you understand the three key parts of any
              loan, so you can borrow smarter.
            </p>
          </div>
          <div className="mt-16 prose prose-lg lg:prose-xl dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400">
            <h3>1. Principal</h3>
            <p>
              The principal is the original amount of money you borrowed. When
              you make a payment, a portion of it goes to paying down this
              principal, and the other part goes to paying interest.
            </p>
            <h3>2. Interest Rate (APR)</h3>
            <p>
              The interest rate (or Annual Percentage Rate) is the "cost" of
              borrowing the money, expressed as a yearly percentage. A lower
              interest rate means you pay less money to the lender over the life
              of the loan.
            </p>
            <h3>3. Amortization</h3>
            <p>
              Amortization is the process of paying off a loan over time with
              regular, equal payments. In the beginning of your loan, a larger
              portion of your payment goes to interest. As you continue to pay,
              more and more of your payment goes towards the principal, reducing
      
              your loan balance faster. Our calculator generates an{" "}
              <strong>amortization schedule</strong> that shows you this entire
              process.
            </p>
          </div>
        </div>
      </section>

      {/* --- Use Cases Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* --- MODIFIED: SEO H2 --- */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Your All-in-One Mortgage, Car, & Personal Loan Calculator
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Case 1 */}
            <div className="p-6">
              <RiHome4Line className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto" />
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Mortgage Calculator
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Planning to buy a home? Enter the home price, down payment, and
                term (like 15 or 30 years) to see your monthly mortgage payment.
              </p>
            </div>
            {/* Case 2 */}
            <div className="p-6">
              <RiCarLine className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto" />
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Car Loan Calculator
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Find out how much that new car will really cost. Check your
                payments for a 3, 5, or 7-year loan to find a budget that works
                for you.
              </p>
            </div>
            {/* Case 3 */}
            <div className="p-6">
              <RiBankLine className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto" />
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Personal Loan Calculator
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Whether it's for debt consolidation or a home project, see how
                different loan amounts and interest rates will impact your
                monthly budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
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
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="relative isolate overflow-hidden bg-blue-600 dark:bg-blue-800 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Plan Your Loan?
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200">
              Get clarity on your financial future. Run your first
              calculation—it's free.
            </p>
            <Link
              href="/loan-calculator/create"
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              Start Calculating Now
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