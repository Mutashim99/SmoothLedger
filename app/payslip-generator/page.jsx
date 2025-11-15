import Link from "next/link";
import Image from "next/image";
import { RiFileList3Line } from "react-icons/ri";
import { RiUserSearchLine } from "react-icons/ri";
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
  RiCalculatorLine,
} from "react-icons/ri"; // Note: /index.js is crucial for Server Components
import { FaqAccordion } from "@/app/components/FaqAccordion"; // Ensure this path is correct
import { MockPayslipHero } from "../components/MockPayslipHero";

// This is your new Server Component page.
// Its ONLY job is to export metadata and render the page.
export const metadata = {
  title: "Free Payslip Generator | Create Pay Stubs Online (No Signup)",
  description:
    "Easily create accurate, professional PDF payslips for your employees or contractors. 100% free, no sign-up required. Calculates earnings, deductions, and net pay instantly.",
  keywords: [
    "free payslip generator",
    "pay stub generator",
    "create payslip online",
    "free pay stub generator",
    "employee payslip template",
    "payslip maker",
    "salary slip generator",
    "no signup payslip",
    "payroll calculator",
  ],
};

// --- FAQ Content ---
const faqs = [
  {
    question: "Is this payslip generator completely free to use?",
    answer:
      "Yes. Our payslip generator is 100% free, with no watermarks, no user limits, and no hidden fees. All features, including calculations and PDF downloads, are available for free.",
  },
  {
    question: "Do I need to sign up or create an account?",
    answer:
      "No. We believe in fast and simple tools. You can create, customize, and download your payslip instantly without ever providing an email or password. Your data is your own.",
  },
  {
    question: "Is my employee's salary and tax information safe?",
    answer:
      "Yes. All the data you enter (employee names, salary, tax info, deductions) is processed and stored 100% in your own web browser. We never see, save, or have access to any of your sensitive financial data.",
  },
  {
    question: "What's the difference between a 'payslip' and a 'pay stub'?",
    answer:
      "They are the same thing! 'Payslip' is more common in the UK, Ireland, and other Commonwealth countries, while 'pay stub' is more common in the United States and Canada. This tool works perfectly for both.",
  },
  {
    question: "Can I use this for contractors as well as employees?",
    answer:
      "Absolutely. You can customize the earnings and deductions to suit any payment arrangement, whether it's for a full-time employee (with tax, insurance) or a contractor (a simple 'Contractor Payment').",
  },
];

// --- Main Page Component ---
export default function PayslipGeneratorLandingPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden py-24 min-h-[calc(100vh-4rem)] sm:py-24">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
                Free Payslip Generator
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Create Professional Pay Stubs
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Instantly & Free.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                Generate accurate, professional PDF payslips for your employees.
                Our free pay stub generator calculates earnings, deductions, and
                net pay. No signup required.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/payslip-generator/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Create Your Free Payslip
                  <RiArrowRightSLine className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="mt-8 flex justify-center lg:justify-start gap-x-6 gap-y-2 flex-wrap">
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  Accurate Calculations
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  No Sign-up Required
                </span>
                <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                  Instant PDF Download
                </span>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative lg:mt-0 mt-12">
              <MockPayslipHero /> {/* Use your new component here! */}
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Simple, Powerful, and Professional Payroll
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Our payslip maker is designed for small business owners and
              managers, not accountants.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiCalculatorLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Automatic Calculations
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Just add your earnings and deductions. Our tool automatically
                calculates Gross Pay, Total Deductions, and Net Pay instantly.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiFileList3Line className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Detailed & Itemized
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add unlimited earning (like base pay, bonuses, overtime) and
                deduction (like tax, insurance) line items for a clear, itemized
                pay stub.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 bg-white dark:bg-slate-950 shadow-lg rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <RiUserSearchLine className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Completely Anonymous
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                We don't require an account, so we never ask for your email or
                your employees' sensitive data. It's 100% private.
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
              Generate a Pay Stub in 3 Easy Steps
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Enter Company & Employee Info
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Fill in your company name, employee name, employee ID, and the
                pay period dates.
              </p>
            </div>
            {/* Step 2 */}
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Add Earnings & Deductions
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Add line items for all earnings (like salary, bonuses) and all
                deductions (like income tax, insurance).
              </p>
            </div>
            {/* Step 3 */}
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-2xl font-bold">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                Download Your PDF
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Instantly download a clean, professional, and accurate PDF of
                the payslip, ready to be sent or printed.
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
              What is a Payslip and Why Do You Need One?
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              A payslip (or pay stub) is a document that shows an employee's
              total earnings, deductions, and net pay for a specific pay period.
              It's a crucial document for both employers and employees.
            </p>
          </div>
          <div className="mt-16 prose prose-lg lg:prose-xl dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400">
            <h3>Why are Payslips Important?</h3>
            <ul>
              <li>
                <strong>Proof of Income:</strong> Employees use payslips as
                proof of income when applying for loans, mortgages, or renting
                an apartment.
              </li>
              <li>
                <strong>Record Keeping:</strong> They provide a clear record of
                salary, bonuses, and taxes paid, which is essential for tax
                filing.
              </li>
              <li>
                <strong>Transparency & Trust:</strong> Giving employees a
                detailed breakdown of their pay builds trust and answers
                questions before they are asked.
              </li>
              <li>
                <strong>Legal Requirement:</strong> In many countries and
                states, providing a payslip is a legal requirement for
                employers.
              </li>
            </ul>

            <h3>Key Components of a Pay Stub</h3>
            <p>
              Our free pay stub generator helps you include all the critical
              information:
            </p>
            <ol>
              <li>
                <strong>Employee & Employer Information:</strong> Names,
                addresses, and employee ID.
              </li>
              <li>
                <strong>Pay Period:</strong> The start and end dates for which
                the employee is being paid.
              </li>
              <li>
                <strong>Gross Earnings:</strong> The total amount earned
                *before* any deductions. This includes base salary, overtime,
                bonuses, etc.
              </li>
              <li>
                <strong>Deductions:</strong> All money *subtracted* from the
                gross pay. This includes statutory deductions (like income tax)
                and voluntary deductions (like health insurance or retirement
                contributions).
              </li>
              <li>
                <strong>Net Pay:</strong> The final "take-home" amount after all
                deductions have been subtracted from the gross earnings.
              </li>
            </ol>
            <p>
              Using a reliable payslip maker, like this one, ensures you get
              these calculations right every time, whether for a single employee
              or your whole team.
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
            {/* The interactive accordion is a Client Component */}
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="relative isolate overflow-hidden bg-blue-600 dark:bg-blue-800 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Create Your First Payslip Now
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200">
              Generate a professional pay stub in seconds. It's free, fast, and
              secure.
            </p>
            <Link
              href="/payslip-generator/create"
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
    </div>
  );
}
