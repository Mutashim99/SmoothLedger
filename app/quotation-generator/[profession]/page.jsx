/* File: app/quotation-generator/[profession]/page.jsx */

import Link from "next/link";
import { notFound } from "next/navigation";
import { professions } from "../professionsData"; // Importing Quote Data
import {
  RiArrowRightSLine,
  RiFileList3Line,
  RiCalculatorLine,
  RiCheckboxCircleFill,
  RiPaintBrushLine,
  RiDownload2Line,
  RiLayoutLine,
  RiFileTextLine,
  RiSaveLine,
} from "react-icons/ri";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { MockQuotationHero } from "@/app/components/MockQuotationHero";

// 1. Generate Static Params
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
    title: `Free ${professionData.keyword} Generator | SmoothLedger`,
    description: `Create professional ${professionData.keyword.toLowerCase()}s in seconds. ${professionData.desc} No signup required.`,
    alternates: {
      canonical: `https://smoothledger.com/quotation-generator/${params.profession}`,
    },
    openGraph: {
      title: `Free Quote Maker for ${professionData.title}`,
      description: professionData.desc,
    },
  };
}

// 3. Dynamic Page Component
export default function ProfessionQuotationPage({ params }) {
  const data = professions.find((p) => p.slug === params.profession);

  if (!data) {
    return notFound();
  }

  // FAQs customized for the profession context
  const faqs = [
    {
      question: `Is this quote template suitable for ${data.title}?`,
      answer:
        "Yes. Our templates are fully customizable. You can edit the line items, terms, and notes to perfectly fit the specific needs of your industry.",
    },
    {
      question: "Is this quote legally binding?",
      answer:
        "Generally, once a client accepts and signs a formal quotation, it becomes a binding contract. Always ensure your 'Terms & Conditions' section is clear.",
    },
    {
      question: "Can I convert this quote to an invoice later?",
      answer:
        "Currently, you can save your client details in the browser. When the job is done, you can easily switch to our Invoice Generator and auto-fill the details.",
    },
    {
      question: "Is it free to download the PDF?",
      answer:
        "Yes, 100% free. You can create and download unlimited PDFs without any watermarks or hidden fees.",
    },
  ];
   const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Free ${data.title} Quotation Generator`,
    headline: `Create professional ${data.keyword} Quotations in seconds`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
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
                Best Tool for {data.title}
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Free {data.keyword} Generator
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  for {data.title}
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                {data.desc} Create professional, winning price quotes in under
                60 seconds. No signup required.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/quotation-generator/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Create {data.keyword}
                  <RiArrowRightSLine className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="mt-8 flex justify-center lg:justify-start gap-x-6 gap-y-2 flex-wrap">
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  Free PDF
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  No Sign-up
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  Win More Jobs
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

      {/* --- Dynamic Features Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Why {data.title} Choose SmoothLedger
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Features designed to help you create accurate{" "}
              {data.keyword.toLowerCase()}s and close deals faster.
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
                Clean, modern designs that make your business look established
                and trustworthy to potential clients.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiCalculatorLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Error-Free Math
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Never send a quote with a math mistake again. We calculate
                totals, taxes, and discounts automatically.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiFileTextLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Custom Terms
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add specific terms for your {data.title.toLowerCase()} services,
                such as "50% deposit required" or "Valid for 30 days".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- How To Use --- */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              How to Create a {data.keyword}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Build a winning estimate in 3 simple steps.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Client Details
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Enter your business info and the client you are pitching to.
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Itemize Costs
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                List your services, materials, and labor costs clearly.
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Download & Send
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Export as a PDF and email it to your client instantly.
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
              Ready to create your {data.keyword}?
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200">
              Join thousands of {data.slug.replace("-", " ")} using SmoothLedger
              to win more jobs.
            </p>
            <Link
              href="/quotation-generator/create"
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              Generate Free Quote
              <RiArrowRightSLine className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
