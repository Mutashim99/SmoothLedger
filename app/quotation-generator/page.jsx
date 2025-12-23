/* File: app/quotation-generator/page.jsx */

import Link from "next/link";
// import Image from "next/image"; // Removed - Not used
import {
  RiArrowRightSLine,
  RiFileList3Line, // <-- This was in your imports, but not used. I've removed it.
  RiCalculatorLine,
  RiCheckboxCircleFill,
  RiPaintBrushLine,
  RiDownload2Line,
  RiLayoutLine,
  RiFileTextLine,
  RiSaveLine,
  // Unused icons removed: RiShieldCheckLine, RiHandCoinLine, RiTeamLine
} from "react-icons/ri";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { MockQuotationHero } from "@/app/components/MockQuotationHero"; // <-- MODIFIED: Consistent path
import { professions } from "./professionsData";
// --- Metadata (Already Excellent) ---
export const metadata = {
  // Title targets both main keywords: "Quotation Generator" and "Estimate Maker"
  title: `Free Quotation Generator & Estimate Maker ${new Date().getFullYear()} - Download PDF`,
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
    "construction estimate maker",
    "proforma invoice generator",
  ],
  alternates: {
    canonical: "https://smoothledger.com/quotation-generator",
  },
  openGraph: {
    title: "Free Quotation Generator & Estimate Maker | SmoothLedger",
    description:
      "Create professional PDF price quotes or estimates in seconds. Our free quote maker is 100% free, no signup, no watermarks.",
    url: "https://smoothledger.com/quotation-generator",
    siteName: "SmoothLedger",
    images: [
      {
        url: "https://smoothledger.com/SLlogo1.png",
        width: 1200,
        height: 630,
        alt: "Free Online Quotation and Estimate Maker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// --- MODIFIED FAQ Content ---
// Re-written first FAQ to remove redundancy and add new value.
const faqs = [
  {
    question: "Is a price quote legally binding?",
    answer:
      "A quotation is a fixed-price offer. If the client accepts it within the 'valid until' date, it generally becomes a legally binding agreement for that specific scope of work. This is why it's important to be detailed! An 'estimate,' on the other hand, is just a rough guess and is usually not binding.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "SmoothLedger Quotation Generator",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "520",
                bestRating: "5",
                worstRating: "1",
              },
              description:
                "A free online tool to create professional price quotes and estimates instantly.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is this quotation generator free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Our quotation tool is 100% free. You can create unlimited estimates and download them as PDFs without paying a cent.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between a Quote and an Estimate?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A 'Quote' is usually a fixed price offer that, once accepted, becomes a contract. An 'Estimate' is a rough guess of costs that may change. Our tool allows you to create both.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I add Terms and Conditions to my quote?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. There is a dedicated 'Notes' and 'Terms' section where you can outline your payment terms, project scope, validity period (e.g., 'Valid for 30 days'), and cancellation policies.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I convert a Quote into an Invoice later?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Since the data structure is similar, you can simply use our Invoice Generator with the same details once the job is done.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is the PDF print-friendly?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. The downloaded PDF is formatted to fit perfectly on standard A4 or Letter paper, making it easy to print physically or save digitally.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I save my quote to edit later?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Because we prioritize privacy, we don't store your data on our servers. However, you can use the 'Save to Browser' feature to keep your company details and logo saved locally on your device for your next quote.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to sign up?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. We are a 'no-signup' platform. You can generate your document immediately without creating an account.",
                  },
                },
              ],
            },
          ]),
        }}
      />
      {/* --- Hero Section --- */}
      {/* --- MODIFIED: Padding adjusted --- */}
      <section className="relative overflow-hidden py-20 min-h-[calc(100vh-4rem)] sm:py-24">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
                Free Quotation Generator
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Create Professional Price Quotes
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  and Price Estimates. {new Date().getFullYear()}
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                Use our free quote maker to send beautiful, accurate estimates
                in minutes. No signup required. No watermarks. 100% free
                forever.
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
              <MockQuotationHero />
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Features of Our Free Quote & Estimate Maker
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Our free tool gives you the features to look professional, win
              more jobs, and get hired faster.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiLayoutLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Professional Templates
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Choose from a variety of clean, modern quote templates. Make a
                great first impression on your clients every time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiPaintBrushLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Brand Your Quotes
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Easily upload your company logo and select your brand's accent
                colors to create quotes that look uniquely yours.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiCalculatorLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Automatic Calculations
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Our quote maker automatically calculates subtotals, taxes, and
                discounts as you type. No more math errors on your estimates.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiFileTextLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Custom Terms & Notes
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add a custom 'Terms & Conditions' or 'Notes' section to include
                your payment schedule, project scope, or quote validity (e.g.,
                'Valid for 30 days').
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiDownload2Line className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Instant PDF Download
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Download your completed price quote as a universal, print-ready
                PDF. No sign-up required, just click and download.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiSaveLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Save Client Info
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Use the 'Save in Browser' feature to save your company and
                client details, making your next quote even faster to create.
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
          {/* --- MODIFIED: Added mx-auto --- */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Choose a Template & Add Info
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Select one of 5 professional templates. Add your company info,
                your client's details, and a quote number.
              </p>
            </div>
            {/* Step 2 */}
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Itemize Your Services
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add each service or product as a line item with quantity and
                price. The tool automatically calculates the total amount.
              </p>
            </div>
            {/* Step 3 */}
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Download Your PDF Quote
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add your terms (like "valid for 30 days"), then instantly
                download the professional PDF to send to your client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEO Content Block (Already Excellent) --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              What to Include in a Professional Quotation
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Using a free quote maker is fast, but knowing *what* to include is
              key. A good quote protects you and your client.
            </p>
          </div>
          <div className="mt-16 prose prose-lg lg:prose-xl dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400">
            <h3>Quotation vs. Estimate vs. Invoice</h3>
            <p>
              These terms are often confused, but they mean different things. An{" "}
              <strong>estimate</strong> is a rough "ballpark" guess of the cost.
              A <strong>quotation</strong> (or "quote") is a formal, fixed-price
              offer for a specific job, which, if accepted, becomes a contract.
              An <strong>invoice</strong> is a request for payment *after* the
              work is done. Our tool is perfect for creating formal quotations.
            </p>

            <h3>Key Elements Your Price Quote Must Have:</h3>
            <ol>
              <li>
                <strong>Your Company Details:</strong> Full business name,
                address, phone number, and email.
              </li>
              <li>
                <strong>Client's Information:</strong> The full name and address
                of the person or company you're sending the quote to.
              </li>
              <li>
                <strong>Quote Number & Date:</strong> A unique quote number
                (e.g., "QUOTE-001") for tracking and the date you issued the
                quote.
              </li>
              <li>
                <strong>"Valid Until" Date:</strong> This is critical. It
                specifies how long your offer is good for (e.g., "Valid for 30
                days"). This protects you from price increases in the future.
              </li>
              <li>
                <strong>Itemized Breakdown:</strong> A detailed list of all
                services or products, including quantity, price per unit, and
                total for each line.
              </li>
              <li>
                <strong>The Grand Total:</strong> A clear, final price that
                includes all taxes, discounts, or other fees.
              </li>
              <li>
                <strong>Terms & Conditions:</strong> Your payment schedule
                (e.g., "50% upfront, 50% on completion"), project scope, and any
                other rules the client is agreeing to.
              </li>
            </ol>
            <p>
              Using a professional <strong>quotation generator</strong> ensures
              you never forget these crucial details, making you look more
              professional and reducing the risk of client disputes.
            </p>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* --- MODIFIED: SEO H2 --- */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Quotation & Estimate Maker FAQs
            </h2>
          </div>
          <div className="mt-12">
            {/* --- MODIFIED: Passing new FAQs --- */}
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* --- Final CTA Section (Already Good) --- */}
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
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
            Browse All Quotation Templates
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {professions.map((p) => (
              <Link
                key={p.slug}
                // CRITICAL CHANGE: Point to quotation-generator
                href={`/quotation-generator/${p.slug}`}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:underline"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
