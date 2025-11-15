import Link from "next/link";
import Image from "next/image";
import {
  RiArrowRightSLine,
  RiShieldCheckLine,
  RiFileList3Line,
  RiCalculatorLine,
  RiCheckboxCircleFill,
  RiPaintBrushLine,
  RiDownload2Line,
  RiHandCoinLine,
  RiTeamLine,
} from  "react-icons/ri"; // IMPORTANT: /index.js is required for Server Components
import { FaqAccordion } from "@/app/components/FaqAccordion"; // Ensure this path is correct
import { MockQuotationHero } from "../components/MockQuotationHero";

// 1. This is your Server Component page.
// It exports metadata and renders the page.
export const metadata = {
  title: "Free Quotation Generator | Make PDF Quotes (No Signup)",
  description:
    "Create professional PDF price quotes or estimates in seconds. Our free quote maker is 100% free, no signup, no watermarks. Choose a template, add your logo, and win more jobs.",
  keywords: [
    "free quotation generator",
    "quote maker",
    "estimate maker",
    "create quotation online",
    "free price quote template",
    "pdf quote generator",
    "business quote generator",
    "no signup quote tool",
    "freelance quotation",
    "how to make a price quote",
  ],
};

// --- FAQ Content ---
const faqs = [
  {
    question: "What's the difference between a quotation, an estimate, and an invoice?",
    answer:
      "A quotation (or estimate) is an offer to do a job for a specific price. An invoice is a bill, or a request for payment for a job that has been *completed*. You send a quote to win the job, and you send an invoice to get paid for the job.",
  },
  {
    question: "Is this quote generator completely free?",
    answer:
      "Yes, 100%. Our free quotation generator allows you to create, customize, and download unlimited PDF quotes with no watermarks and no hidden fees. All templates and features are free.",
  },
  {
    question: "Do I need to sign up to make a quote?",
    answer:
      "No account is needed. You can use our quote maker instantly without providing an email or password. We also offer a free 'Save in Browser' feature for your convenience, which does not send any data to our servers.",
  },
  {
    question: "Can I add my business logo and terms & conditions?",
    answer:
      "Absolutely. You can upload your own logo, choose custom colors, and edit the 'Terms & Conditions' section on every quote to include your own payment terms or project details.",
  },
];

// --- Main Page Component ---
export default function QuotationGeneratorLandingPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden py-24 min-h-[calc(100vh-4rem)] sm:py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
                Free Quotation Generator
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Create Professional
                Price Quotes
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> and Win More Jobs.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                Use our free quote maker to send beautiful, accurate estimates in minutes. No signup required. No watermarks. 100% free forever.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/quotation-generator/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Create Your Free Quote
                  <RiArrowRightSLine className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="mt-8 flex justify-center lg:justify-start gap-x-6 gap-y-2 flex-wrap">
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  Free PDF Quotes
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  No Sign-up
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  Professional Templates
                </span>
              </div>
            </div>
            
            {/* Image Content */}
            <div className="relative lg:mt-0 mt-12">
              <MockQuotationHero /> {/* Use your new component here! */}
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              An Estimate Maker Built for Speed and Professionalism
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Stop sending quotes in Word or Excel. Our free quote maker gives you the tools to look professional and get hired faster.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiPaintBrushLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Brand Your Quotes
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Upload your logo, pick your brand colors, and choose a template to create a professional price quote that matches your business.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiCalculatorLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Automatic Calculations
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Automatically calculates subtotals, taxes, and discounts as you type. No more math errors on your price estimates.
              
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiDownload2Line className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Instant PDF Download
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Download your completed quotation as a universal, print-ready PDF. No sign-up required, just click and download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- How To Use Section --- */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              How to Create a Price Quote
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Create a professional business quote in three simple steps.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold">1</div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Choose a Template & Add Info
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Select one of 5 professional templates. Add your company info, your client's details, and a quote number.
              </p>
            </div>
            {/* Step 2 */}
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold">2</div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Itemize Your Services
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add each service or product as a line item with quantity and price. The tool automatically calculates the total amount.
              </p>
            </div>
            {/* Step 3 */}
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold">3</div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Download Your PDF Quote
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add your terms (like "valid for 30 days"), then instantly download the professional PDF to send to your client.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- SEO Content Block --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              What to Include in a Professional Quotation
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Using a free quote maker is fast, but knowing *what* to include is key. A good quote protects you and your client.
            </p>
          </div>
          <div className="mt-16 prose prose-lg lg:prose-xl dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400">
            <h3>Quotation vs. Estimate vs. Invoice</h3>
            <p>
              These terms are often confused, but they mean different things. An **estimate** is a rough "ballpark" guess of the cost. A **quotation** (or "quote") is a formal, fixed-price offer for a specific job, which, if accepted, becomes a contract. An **invoice** is a request for payment *after* the work is done. Our tool is perfect for creating formal quotations.
            </p>
            
            <h3>Key Elements Your Price Quote Must Have:</h3>
            <ol>
              <li><strong>Your Company Details:</strong> Full business name, address, phone number, and email.</li>
              <li><strong>Client's Information:</strong> The full name and address of the person or company you're sending the quote to.</li>
              <li><strong>Quote Number & Date:</strong> A unique quote number (e.g., "QUOTE-001") for tracking and the date you issued the quote.</li>
              <li><strong>"Valid Until" Date:</strong> This is critical. It specifies how long your offer is good for (e.g., "Valid for 30 days"). This protects you from price increases in the future.</li>
              <li><strong>Itemized Breakdown:</strong> A detailed list of all services or products, including quantity, price per unit, and total for each line.</li>
              <li><strong>The Grand Total:</strong> A clear, final price that includes all taxes, discounts, or other fees.</li>
              <li><strong>Terms & Conditions:</strong> Your payment schedule (e.g., "50% upfront, 50% on completion"), project scope, and any other rules the client is agreeing to.</li>
            </ol>
            <p>
              Using a professional quotation generator ensures you never forget these crucial details, making you look more professional and reducing the risk of client disputes.
            </p>
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
              Ready to Win More Jobs?
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200">
              Create your first professional price quote in under 60 seconds.
            </p>
            <Link
              href="/quotation-generator/create"
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              Start for Free
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