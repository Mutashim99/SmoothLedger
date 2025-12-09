/* File: app/invoice-generator/[profession]/page.jsx */

import Link from "next/link";
import { notFound } from "next/navigation"; // To handle invalid professions
import { professions } from "../professionsData"; // Import your data
import {
  RiArrowRightSLine,
  RiCheckboxCircleFill,
  RiLayoutLine,
  RiPaintBrushLine,
  RiDownload2Line,
  RiShieldCheckLine,
  RiSaveLine,
  RiShipLine,
  RiDoorLockBoxLine,
  RiSpeedLine,
} from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import { FaqAccordion } from "../../components/FaqAccordion";
import { MockInvoiceHero } from "../../components/MockInvoiceHero";

// 1. Generate Static Params (This creates the physical HTML pages at build time - Crucial for SEO)
export async function generateStaticParams() {
  return professions.map((p) => ({
    profession: p.slug,
  }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }) {
  const professionData = professions.find((p) => p.slug === params.profession);

  if (!professionData) return {};

  return {
    title: `Free Invoice Generator for ${professionData.title} | SmoothLedger`,
    description: `Create professional ${professionData.keyword} invoices in seconds. ${professionData.desc} No signup required.`,
    alternates: {
      canonical: `https://smoothledger.com/invoice-generator/${params.profession}`,
    },
    openGraph: {
      title: `Free Invoice Template for ${professionData.title}`,
      description: professionData.desc,
    },
  };
}

// 3. Dynamic Page Component
export default function ProfessionLandingPage({ params }) {
  const data = professions.find((p) => p.slug === params.profession);

  // If someone types a random URL that isn't in your list, show 404
  if (!data) {
    return notFound();
  }

  // Reuse your existing FAQ but customize one question slightly if you want
  const faqs = [
    {
      question: `Is this invoice generator free for ${data.title}?`,
      answer:
        "Yes. Our invoice generator is completely free to use. There are no watermarks, no premium-only templates, and no limits on how many invoices you can create.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No. We believe in fast tools. You can create, customize, and download your invoice instantly without ever providing an email.",
    },
    {
      question: "Can I customize the template?",
      answer:
        "Absolutely. You can upload your logo, change colors, and adjust fonts to match your specific branding style.",
    },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Free ${data.title} Invoice Generator`,
    headline: `Create professional ${data.keyword} invoices in seconds`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1024",
    },
    featureList: "PDF Export, No Signup, Customizable Branding",
  };

  return (
    <div className="bg-white dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* --- Dynamic Hero Section --- */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-20 sm:py-24">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-24 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
                Best Tool for {data.title}
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Free Invoice Generator for
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  {data.title}
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                {data.desc} Build and download professional PDF invoices in 60
                seconds.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                {/* POINT TO THE MAIN CREATE TOOL */}
                <Link
                  href="/invoice-generator/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Create {data.keyword} Invoice
                  <RiArrowRightSLine className="ml-2 h-5 w-5" />
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="mt-8 flex justify-center lg:justify-start gap-x-6 gap-y-2 flex-wrap">
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  100% Free
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  No Sign-up
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  Instant PDF
                </span>
              </div>
            </div>

            {/* Image Content - Kept the same */}
            <div className="relative lg:mt-0 mt-12">
              <MockInvoiceHero />
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section (Generic but powerful) --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Why {data.title} Choose SmoothLedger
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Tailored features that make invoicing easier for your{" "}
              {data.keyword.toLowerCase()} business.
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
                Clean, professional designs that make your{" "}
                {data.keyword.toLowerCase()} work look great.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiPaintBrushLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Brand Customization
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add your logo and colors. Stand out from other{" "}
                {data.slug.replace("-", " ")}.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiDownload2Line className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Instant PDF Export
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Download your invoice immediately. No waiting, no watermarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Why Choose Us (SEO Text) --- */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              The Best Invoice Maker for {data.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Stop using Excel or complicated accounting software. SmoothLedger
              is built for speed.
            </p>
          </div>
          {/* Kept your existing grid but reduced for brevity in this example */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-8 bg-slate-50 dark:bg-slate-900 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiDoorLockBoxLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                No Signup Required
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Just land on the page and start typing. Perfect for busy{" "}
                {data.keyword.toLowerCase()}s.
              </p>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-900 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <CiCreditCard1 className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                100% Free
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Keep 100% of your earnings. We don't charge subscription fees.
              </p>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-900 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiShieldCheckLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Privacy Focused
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Data is processed in your browser. We don't see your client
                details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Questions from {data.title}
            </h2>
          </div>
          <div className="mt-12">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="relative isolate overflow-hidden bg-blue-600 dark:bg-blue-800 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to create your {data.keyword} Invoice?
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200">
              Join thousands of {data.slug.replace("-", " ")} using SmoothLedger
              to get paid faster.
            </p>
            <Link
              href="/invoice-generator/create"
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              Generate Free Invoice Now
              <RiArrowRightSLine className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
