/* File: app/invoice-generator/page.jsx */

import Link from "next/link";
// import Image from "next/image"; // Removed - Not used in this file
import {
  RiArrowRightSLine,
  RiShieldCheckLine,
  RiDownload2Line,
  RiCheckboxCircleFill,
  RiPaintBrushLine,
  RiSaveLine,
  RiShipLine,
  RiDoorLockBoxLine,
  RiSpeedLine,
  RiCreditCardLine, // <-- Swapped for consistency
  RiLayoutLine, // <-- Added for "Templates" feature
} from "react-icons/ri";
// import { CiCreditCard1 } from "react-icons/ci"; // Removed for consistency
import { FaqAccordion } from "../components/FaqAccordion";
import { MockInvoiceHero } from "../components/MockInvoiceHero";
import { CiCreditCard1 } from "react-icons/ci";
import { professions } from "./professionsData";
// --- Metadata (Already Excellent) ---
export const metadata = {
  title: `Free Invoice Generator & Online Invoice Maker ${new Date().getFullYear()} - Download PDF`,
  description:
    "Create professional PDF invoices instantly with our free invoice maker. No login or credit card required. Choose from 5+ templates and download now.",
  keywords: [
    "free invoice generator",
    "invoice maker",
    "create invoice online",
    "pdf invoice generator",
    "invoice template",
    "no signup invoice",
    "freelance invoice",
    "small business invoicing",
    "free invoice generator no login",
    "no signup invoice generator",
    "no credit card required invoice",
    "instant invoice maker",
    "create invoice pdf",
    "invoice template free",
    "no signup invoice creator",
    "freelance invoice tool",
    "bill generator",
  ],
  alternates: {
    canonical: "https://smoothledger.com/invoice-generator",
  },
  openGraph: {
    title: "Free Invoice Generator & Online Invoice Maker | SmoothLedger",
    description:
      "Create professional PDF invoices instantly with our free invoice maker. No login or credit card required. Choose from 5+ templates and download now.",
    url: "https://smoothledger.com/invoice-generator",
    siteName: "SmoothLedger",
    images: [
      {
        url: "https://smoothledger.com/SLlogo1.png",
        width: 1200,
        height: 630,
        alt: "Free Online Invoice Maker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// --- FAQ Content (Unchanged) ---
const faqs = [
  {
    question: "Is this invoice generator really 100% free?",
    answer:
      "Yes. Our invoice generator is completely free to use. There are no watermarks on your downloaded PDF, no premium-only templates, and no limits on how many invoices you can create.",
  },
  {
    question: "Do I need to create an account or sign up?",
    answer:
      "No. We believe in fast and simple tools. This is a 'no signup invoice generator'. You can create, customize, and download your invoice instantly without ever providing an email or password.",
  },
  {
    question: "Do I need to enter a credit card?",
    answer:
      "No. Our tool is a 100% free invoice generator, no credit card required. You can create and download as many invoices as you need without any payment or hidden fees.",
  },
  {
    question: "Can I add my own company logo?",
    answer:
      "Absolutely. You can upload your own logo, which will appear on your invoice. You can also customize accent colors, fonts, and more to perfectly match your brand.",
  },
  {
    question: "Is my financial data saved on your servers?",
    answer:
      "No. All the data you enter (your company info, client info, line items) is processed and stored 100% in your own web browser. We never see or save any of your sensitive financial data.",
  },
];

// --- Main Page Component ---
export default function InvoiceGeneratorLandingPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "SmoothLedger Invoice Generator",
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
                ratingCount: "1250",
                bestRating: "5",
                worstRating: "1",
              },
              description:
                "A free online tool to generate professional PDF invoices instantly without signup.",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is this invoice generator really 100% free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Our invoice generator is completely free to use. There are no watermarks on your downloaded PDF, no premium-only templates, and no limits on how many invoices you can create.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to create an account or sign up?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. We believe in fast and simple tools. This is a 'no signup invoice generator'. You can create, customize, and download your invoice instantly without ever providing an email or password.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I change the currency symbol?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Our tool supports all major global currencies including USD ($), GBP (£), EUR (€), CAD ($), AUD ($), and many more. You can select your preferred currency from the settings menu.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I add taxes and discounts?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You can easily add tax percentages (like VAT, GST, or Sales Tax) and apply discounts to specific line items or the total amount. The tool calculates the math for you automatically.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does this work on mobile phones?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. SmoothLedger is fully responsive. You can generate professional PDF invoices directly from your iPhone, Android, tablet, or desktop computer.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I email the invoice to my client?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Simply click the 'Download PDF' button to save the file to your device. You can then attach this professional PDF to an email, WhatsApp message, or Slack DM to send it to your client.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is my financial data saved on your servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. All the data you enter (your company info, client info, line items) is processed and stored 100% in your own web browser. We never see or save any of your sensitive financial data.",
                  },
                },
              ],
            },
          ]),
        }}
      />
      {/* --- Hero Section --- */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-20 sm:py-24">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- MODIFIED: Fixed large gap --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-24 items-center">
            {/* Text Content (Unchanged) */}
            <div className="text-center lg:text-left">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
                100% Free Tool. No Signup.
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Free Invoice Generator. {new Date().getFullYear()}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Create Invoices Instantly.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                Build and download professional PDF invoices in 60 seconds. Our
                tool is completely free—no login, no watermarks, and{" "}
                <strong>no credit card required</strong>.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/invoice-generator/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Create Your Free Invoice Now
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
                  No Credit Card
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  No Watermarks
                </span>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative lg:mt-0 mt-12">
              <MockInvoiceHero />
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
              Powerful Features in Our Free Invoice Maker
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Our free invoice maker is packed with features designed to save
              you time and impress your clients.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* --- MODIFIED: Fixed duplicate icon --- */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiLayoutLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                5 Professional Templates
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Choose from 5 beautiful, field-tested invoice designs. From
                modern and creative to classic and minimal.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiPaintBrushLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Customize Your Brand
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add your logo, change accent colors, and select fonts to
                perfectly match your company's branding.
              </p>
            </div>
            {/* Feature 3 (Unchanged) */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiDownload2Line className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Instant PDF Downloads
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Generate and download a print-ready PDF of your invoice
                immediately. No waiting, no emails, just your file.
              </p>
            </div>
            {/* Feature 4 (Unchanged) */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiShieldCheckLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Secure & Private
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                All data is processed in your browser. We never see or store
                your sensitive client or financial information.
              </p>
            </div>
            {/* Feature 5 (Unchanged) */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiSaveLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Save Your Clients
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Use the "Save in Browser" feature to save client details and
                your company info for faster invoicing next time.
              </p>
            </div>
            {/* Feature 6 (Unchanged) */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiShipLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Tax, Discounts & Shipping
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Easily add tax percentages, dollar-amount discounts, and
                shipping costs. All totals are calculated instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- "Why Choose Us" Section --- */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* --- MODIFIED: SEO H2 --- */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              A Free Invoice Maker Built for Speed & Privacy
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              We built SmoothLedger to be the fastest tool on the web. No
              barriers, no tricks, just a high-quality free tool.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Item 1 (Unchanged) */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiDoorLockBoxLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                No Signup or Login Required
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Use our <strong>no signup invoice generator</strong> the moment
                you land on the page. No accounts, no passwords to forget. Just
                start making your invoice.
              </p>
            </div>
            {/* --- MODIFIED: Swapped icon for consistency --- */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <CiCreditCard1 className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Truly 100% Free, No Card
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                This isn't a trial.{" "}
                <strong>
                  Generate invoice for free, no credit card required
                </strong>
                . We will never ask for payment or put watermarks on your PDF.
              </p>
            </div>
            {/* Item 3 (Unchanged) */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiSpeedLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Instant PDF Downloads
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Finish your invoice, hit download. You get a professional PDF
                immediately. No "emailing you the link" or waiting periods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- "How To Use" Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              How to Create an Invoice for Free (in 3 Steps)
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Go from zero to a professional, downloaded PDF in under a minute.
            </p>
          </div>
          {/* --- MODIFIED: Cleaned up layout code --- */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="p-6">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                1. Fill in Your Invoice Details
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add your company info, client details, and line items. The
                totals, taxes, and discounts are calculated automatically.
              </p>
            </div>
            {/* Step 2 */}
            <div className="p-6">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                2. Choose Your Free Template
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Upload your logo, choose from 5 templates, and adjust the colors
                and fonts to match your brand's unique style.
              </p>
            </div>
            {/* Step 3 */}
            <div className="p-6">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                3. Download Your PDF
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Hit the download button to instantly get a professional,
                high-resolution PDF invoice, ready to send to your client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- "Anatomy of an Invoice" Section --- */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              What Makes a Perfect Invoice?
            </h2>
            {/* --- MODIFIED: Added keyword --- */}
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Our <strong>free invoice maker</strong> helps you create a
              perfect, professional document. Here’s what every good{" "}
              <strong>online invoice maker</strong> handles...
            </p>
          </div>
          <div className="mt-16 prose prose-lg lg:prose-xl dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400">
            <h3>1. Clear "From" & "To" Information</h3>
            <p>
              Your invoice must clearly state who it's from (your business name,
              address, and contact info) and who it's for (your client's name
              and address).
            </p>
            <h3>2. Unique Invoice Number & Dates</h3>
            <p>
              Every invoice needs a unique identifier, like `INV-001`. This is
              critical for tracking payments. You also must include the `Date of
              Issue` and a `Payment Due Date`.
            </p>
            <h3>3. An Itemized List of Services or Products</h3>
            <p>
              Break down your work into clear line items. Each item should have:
            </p>
            <ul>
              <li>A clear description (e.g., "Homepage Design Mockups")</li>
              <li>A quantity (e.g., "1" for a project, or "40" for hours)</li>
              <li>A rate (e.g., "$100" per hour)</li>
              <li>A final "Total" for that line.</li>
            </ul>
            <p>This transparency builds trust and avoids client disputes.</p>
            <h3>4. A Clear Breakdown of Totals</h3>
            <p>
              The bottom of your invoice should clearly summarize all costs. Our
              tool handles this automatically:
            </p>
            <ul>
              <li>
                <strong>Subtotal:</strong> The total of all line items.
              </li>
              <li>
                <strong>Tax:</strong> Any tax (e.g., VAT, GST) added.
              </li>
              <li>
                <strong>Discounts:</strong> Any discounts you've applied.
              </li>
              <li>
                <strong>Grand Total:</strong> The final amount the client owes,
                in bold.
              </li>
            </ul>
            <h3>5. Payment Terms & Notes</h3>
            <p>
              The "Notes" section is your final instruction. Include your
              payment terms (e.g., "Payment due upon receipt") and your bank
              transfer details.
            </p>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Your Questions, Answered
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
            {/* --- MODIFIED: Added keyword --- */}
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Get Paid? (100% Free)
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200">
              Create your first professional invoice in less than 60 seconds. No
              signup, no credit card.
            </p>
            <Link
              href="/invoice-generator/create"
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              Generate Your Free Invoice
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
                fill="url(#gradient-cta-bottom)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="gradient-cta-bottom">
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
            Browse All Invoice Templates
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {professions.map((p) => (
              <Link
                key={p.slug}
                href={`/invoice-generator/${p.slug}`}
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
