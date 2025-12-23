/* File: app/payslip-generator/[profession]/page.jsx */

import Link from "next/link";
import { notFound } from "next/navigation";
import { professions } from "../professionsData"; // Importing the payslip specific data
import {
  RiArrowRightSLine,
  RiCheckboxCircleFill,
  RiDownload2Line,
  RiShieldCheckLine,
  RiCalculatorLine,
  RiFileList3Line,
  RiLayoutLine,
  RiPaintBrushLine,
} from "react-icons/ri";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { MockPayslipHero } from "@/app/components/MockPayslipHero";

// 1. Generate Static Params (Builds HTML for all 50+ professions at build time)
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
    title: `Free Payslip Generator for ${professionData.title} | SmoothLedger`,
    description: `Create accurate ${professionData.keyword} pay stubs in seconds. ${professionData.desc} No signup required.`,
    alternates: {
      canonical: `https://smoothledger.com/payslip-generator/${params.profession}`,
    },
    openGraph: {
      title: `Free Pay Stub Maker for ${professionData.title}`,
      description: professionData.desc,
    },
  };
}

// 3. Dynamic Page Component
export default function ProfessionPayslipPage({ params }) {
  const data = professions.find((p) => p.slug === params.profession);

  if (!data) {
    return notFound();
  }

  // FAQs customized for the profession context
  const faqs = [
    {
      question: `Is this payslip generator free for ${data.title}?`,
      answer:
        "Yes. Our tool is 100% free with no watermarks. You can generate unlimited pay stubs regardless of your profession or location.",
    },
    {
      question: "Can I use this for proof of income?",
      answer:
        "Yes. Many of our users create professional payslips to use as proof of income for rental applications, loans, or visa requirements.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. All calculations happen in your browser. We do not store any employee salary data on our servers.",
    },
    {
      question: "Can I change the currency?",
      answer:
        "Yes. You can select any currency symbol ($, £, €, ₹, etc.) to match your specific payroll needs.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Free ${data.title} Payslip Generator`,
    headline: `Create professional ${data.keyword} Payslips in seconds`,
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
                Best for {data.title}
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Free Payslip Generator for
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  {data.title}
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                {data.desc} Generate professional PDF pay stubs instantly. No
                signup required.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href={`/payslip-generator/create?template=${data.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Create {data.keyword} Slip
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
                  No Sign-up
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  Accurate Math
                </span>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative lg:mt-0 mt-12">
              <MockPayslipHero />
            </div>
          </div>
        </div>
      </section>

      {/* --- Dynamic Features Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Why {data.title} Use SmoothLedger
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Payroll features designed for {data.keyword.toLowerCase()} needs.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiCalculatorLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Auto-Calculations
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                We handle the math. Deductions, gross pay, and net pay are
                calculated instantly for accurate {data.keyword} records.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiLayoutLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Professional Templates
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Clean, readable templates that look great for proof of income or
                company records.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiDownload2Line className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Instant PDF
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Download a high-quality PDF immediately. Perfect for emailing to
                employees or printing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- How To Use (Generic but effective) --- */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              How to Create a {data.keyword}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Generate your document in 3 simple steps.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Enter Details
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Input employee info, pay period, and company details.
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Add Figures
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add earnings (salary, bonus) and deductions (tax, insurance).
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Download PDF
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Get your professional {data.keyword} PDF instantly.
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
              Ready to generate your Payslip?
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200">
              Join thousands of {data.slug.replace("-", " ")} using SmoothLedger
              for easy payroll.
            </p>
            <Link
              href="/payslip-generator/create"
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              Start for Free
              <RiArrowRightSLine className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
            Browse All Payslip Templates
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {professions.map((p) => (
              <Link
                key={p.slug}
                // CRITICAL CHANGE: Point to payslip-generator
                href={`/payslip-generator/${p.slug}`}
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
