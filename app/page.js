/* File: app/page.jsx */

"use client"; // Required for framer-motion animations

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiFileTextLine,
  RiPagesLine,
  RiMoneyDollarCircleLine,
  RiCalculatorLine,
  RiPercentLine,
  RiArrowRightSLine,
  RiDownload2Line,
  RiPencilLine,
  RiEyeLine,
} from "react-icons/ri";

// --- Hero Section Component ---
function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40 bg-white dark:bg-slate-950">
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[150px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white"
            variants={itemVariants}
          >
            Financial Tools,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 bg-clip-text text-transparent">
              Beautifully Simple.
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300"
            variants={itemVariants}
          >
            Create professional invoices, payslips, and quotes in seconds.
            Calculate loans and margins instantly.
          </motion.p>
          <motion.h2
            className="mt-4 text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100"
            variants={itemVariants}
          >
            No signups. No fees. Just fast, professional tools.
          </motion.h2>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Link
              href="/invoice-generator"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              Create an Invoice
              <RiArrowRightSLine className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-700 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Explore All Tools
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Features Section Component ---
function FeaturesSection() {
  const tools = [
    {
      name: "Invoice Generator",
      description: "Create and download professional PDF invoices in seconds.",
      href: "/invoice-generator",
      icon: RiFileTextLine,
    },
    {
      name: "Payslip Generator",
      description: "Generate detailed, accurate payslips for your employees.",
      href: "/payslip-generator",
      icon: RiPagesLine,
    },
    {
      name: "Quotation Generator",
      description: "Send beautiful, clear estimates that win you clients.",
      href: "/quotation-generator",
      icon: RiMoneyDollarCircleLine,
    },
    {
      name: "Loan Calculator",
      description: "Visualize monthly payments and total interest for any loan.",
      href: "/loan-calculator",
      icon: RiCalculatorLine,
    },
    {
      name: "Profit Margin Calculator",
      description:
        "Find the perfect selling price and profit margin instantly.",
      href: "/profit-margin-calculator",
      icon: RiPercentLine,
    },
    {
      name: "More Tools Coming",
      description: "We're always building new utilities to help you succeed.",
      href: "#",
      icon: RiPencilLine,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 80,
      },
    }),
  };

  return (
    <section id="features" className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Your Financial Utility Toolbox
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            One-click solutions for your most common financial tasks.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link
                href={tool.href}
                className="group block p-8 h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <tool.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                  {tool.name}
                </h3>
                <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                  {tool.description}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-500 group-hover:translate-x-1 transition-transform">
                  Get Started <RiArrowRightSLine className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- How It Works Section ---
function HowItWorksSection() {
  const steps = [
    {
      name: "1. Select a Tool",
      description:
        "Choose the financial utility you need, like the Invoice or Loan calculator.",
      icon: RiEyeLine,
    },
    {
      name: "2. Edit Visually",
      description:
        "Click directly on the document or use simple controls. No boring forms.",
      icon: RiPencilLine,
    },
    {
      name: "3. Download PDF",
      description:
        "Instantly download a professional, high-quality PDF. No watermarks.",
      icon: RiDownload2Line,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            As Simple As It Gets
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Our WYSIWYG editor makes financial documents effortless.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {steps.map((step) => (
            <div key={step.name} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                {step.name}
              </h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Main Home Page ---
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
    </>
  );
}