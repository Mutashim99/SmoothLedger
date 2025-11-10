/* File: app/page.jsx */

"use client";

import React, { Fragment, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tab, Disclosure } from "@headlessui/react";
import {
  RiFileTextLine,
  RiPagesLine,
  RiMoneyDollarCircleLine,
  RiCalculatorLine,
  RiPercentLine,
  RiArrowRightSLine,
  RiPencilLine,
  RiEyeLine,
  RiSubtractLine,
  RiAddLine,
  RiStarFill,
  RiCheckboxCircleFill,
  RiShieldCheckLine,
  RiLayoutLine,
  RiUserSearchLine,
} from "react-icons/ri";

// --- Helper: ClassName Util ---
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// --- Mockup Components for Hero & Tabs ---
function MockupInvoice() {
  return (
    <div className="w-full rounded-lg bg-white shadow-xl border border-slate-200 p-4 sm:p-6 text-slate-800">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-blue-600">Your Company</h3>
          <p className="text-xs mt-2 text-slate-500">Bill To:</p>
          <p className="text-sm font-medium">Client Name Inc.</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold uppercase text-slate-300">INVOICE</h2>
          <p className="text-xs text-slate-500">INV-001</p>
        </div>
      </div>
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-2 px-3 text-left text-xs font-semibold text-blue-700">Item</th>
                  <th className="py-2 px-3 text-right text-xs font-semibold text-blue-700">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="py-2 px-3 text-sm">Web Design</td>
                  <td className="py-2 px-3 text-sm text-right font-medium">$2,000.00</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-sm">Hosting (1 Year)</td>
                  <td className="py-2 px-3 text-sm text-right font-medium">$300.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end border-t pt-2">
        <div className="w-1/2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-medium">$2,300.00</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-slate-500">Tax (10%)</span>
            <span className="font-medium">$230.00</span>
          </div>
          <div className="flex justify-between text-base font-bold mt-2 pt-2 border-t">
            <span>Total</span>
            <span>$2,530.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupPayslip() {
  return (
    <div className="w-full rounded-lg bg-white shadow-xl border border-slate-200 p-4 sm:p-6 text-slate-800">
      <div className="text-center">
        <h2 className="text-2xl font-bold uppercase text-blue-600">PAYSLIP</h2>
        <p className="text-sm font-medium">Employee Name</p>
        <p className="text-xs text-slate-500">Pay Date: 2025-11-10</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-green-600 border-b border-green-200 pb-1">Earnings</h3>
          <div className="flex justify-between text-sm mt-2"><span>Base Pay</span><span className="font-medium">$3,000.00</span></div>
          <div className="flex justify-between text-sm mt-1"><span>Bonus</span><span className="font-medium">$500.00</span></div>
        </div>
        <div>
          <h3 className="font-semibold text-red-600 border-b border-red-200 pb-1">Deductions</h3>
          <div className="flex justify-between text-sm mt-2"><span>Tax</span><span className="font-medium">$400.00</span></div>
          <div className="flex justify-between text-sm mt-1"><span>Insurance</span><span className="font-medium">$100.00</span></div>
        </div>
      </div>
      <div className="mt-4 bg-blue-600 text-white rounded-lg p-3 flex justify-between items-center">
        <span className="text-lg font-bold">NET PAY</span>
        <span className="text-xl font-bold">$3,000.00</span>
      </div>
    </div>
  );
}

function MockupQuotation() {
  return (
    <div className="w-full rounded-lg bg-white shadow-xl border border-slate-200 p-4 sm:p-6 text-slate-800">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-blue-600">Your Company</h3>
          <p className="text-xs mt-2 text-slate-500">Prepared For:</p>
          <p className="text-sm font-medium">New Prospect Ltd.</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold uppercase text-slate-300">QUOTE</h2>
          <p className="text-xs text-slate-500">QUOTE-001</p>
        </div>
      </div>
      <div className="mt-4 flow-root">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="py-2 px-3 text-left text-xs font-semibold text-blue-700">Service</th>
                <th className="py-2 px-3 text-right text-xs font-semibold text-blue-700">Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="py-2 px-3 text-sm">Initial Consultation</td>
                <td className="py-2 px-3 text-sm text-right font-medium">$500.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-end border-t pt-2">
        <div className="w-1/2">
          <div className="flex justify-between text-base font-bold mt-2 pt-2">
            <span>Total Estimate</span>
            <span>$500.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupLoan() {
  return (
    <div className="w-full rounded-lg bg-white shadow-xl border border-slate-200 p-4 sm:p-6 text-slate-800">
      <div className="text-center mb-4">
        <div className="text-sm text-slate-500">Monthly Payment</div>
        <div className="text-4xl font-bold text-blue-600">$920.80</div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Loan Amount</span>
            <span className="font-medium">$50,000</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
            <div className="w-1/2 bg-blue-500 h-2 rounded-full"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Term (Years)</span>
            <span className="font-medium">5</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
            <div className="w-1/6 bg-blue-500 h-2 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupMargin() {
  return (
    <div className="w-full rounded-lg bg-white shadow-xl border border-slate-200 p-4 sm:p-6 text-slate-800">
      <div className="text-center mb-4">
        <div className="text-sm text-slate-500">Profit Margin</div>
        <div className="text-4xl font-bold text-blue-600">50.00%</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500">Cost</label>
          <div className="p-2 bg-slate-100 rounded text-lg font-bold">$50.00</div>
        </div>
        <div>
          <label className="text-xs text-slate-500">Selling Price</label>
          <div className="p-2 bg-slate-100 rounded text-lg font-bold">$100.00</div>
        </div>
      </div>
    </div>
  );
}
// --- End Mockup Components ---


// --- 1. Hero Section ---
// --- 1. Hero Section ---
function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + i * 0.15,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 min-h-screen flex items-center">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[150px]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- FIX #1: Added items-center back to vertically align columns --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- Left Column (Text Content) --- */}
          <motion.div
            className="text-center lg:text-left"
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
              className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Create professional invoices, payslips, and quotes in seconds.
              Calculate loans and margins instantly. All 100% free.
            </motion.p>
            
            <motion.div
              className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-1">
                <RiStarFill className="h-5 w-5 text-yellow-400" />
                <RiStarFill className="h-5 w-5 text-yellow-400" />
                <RiStarFill className="h-5 w-5 text-yellow-400" />
                <RiStarFill className="h-5 w-5 text-yellow-400" />
                <RiStarFill className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Trusted by <span className="font-bold text-slate-800 dark:text-slate-200">10,000+</span> freelancers and small businesses.
              </p>
            </motion.div>
            
            <motion.ul
              className="mt-8 space-y-2 text-left max-w-md mx-auto lg:mx-0" // <-- Re-centered text-left
              variants={itemVariants}
            >
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                100% Free, No Watermarks
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                No Sign-up or Credit Card Required
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
                Beautiful, Professional Templates
              </li>
            </motion.ul>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
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

          {/* --- Right Column (Visual Mockups) --- */}
          {/* --- FIX #2: Changed to hidden md:block, adjusted heights --- */}
          <motion.div
            className="relative w-full h-[450px] md:h-[500px] lg:h-[600px] hidden md:block" // <-- Shows on tablet up, with responsive heights
            style={{ perspective: "1000px" }}
            initial="hidden"
            animate="visible"
          >
            {/* --- FIX #3: Changed max-w-lg to max-w-md to fit smaller screens --- */}
            <motion.div
              className="absolute w-full max-w-sm sm:max-w-md" // <-- Removed lg:max-w-lg
              style={{ top: '0%', left: '15%', rotate: '4deg', zIndex: 30 }} // <-- Adjusted top/left
              variants={cardVariants}
              custom={1}
            >
              <MockupInvoice />
            </motion.div>
            
            <motion.div
              className="absolute w-full max-w-sm sm:max-w-md"
              style={{ top: '25%', left: '0%', rotate: '-3deg', zIndex: 20 }} // <-- Adjusted top
              variants={cardVariants}
              custom={2}
            >
              <MockupPayslip />
            </motion.div>
            
            <motion.div
              className="absolute w-full max-w-sm sm:max-w-md"
              style={{ top: '50%', left: '20%', rotate: '2deg', zIndex: 10 }} // <-- Adjusted top
              variants={cardVariants}
              custom={3}
            >
              <MockupQuotation />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- 2. Why Choose Us Section ---
function WhySmoothLedgerSection() {
  const features = [
    {
      name: "Completely Free, No Ads",
      description: "Our tools are 100% free, with no watermarks, no ads, and no 'premium' features held back. Get full access instantly.",
      icon: RiShieldCheckLine,
    },
    {
      name: "No Sign-up Required",
      description: "We don't need your email or password. Just land on the page and start working. Your data is your own.",
      icon: RiUserSearchLine,
    },
    {
      name: "Premium & Professional",
      description: "Choose from multiple modern templates, add your logo, and download a print-ready PDF that impresses clients.",
      icon: RiLayoutLine,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            A Better Toolbox for Freelancers
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            We built SmoothLedger to be the simple, fast, and professional tool
            we always wanted.
          </p>
        </motion.div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, i) => {
            // --- FIX #1 ---
            // Alias feature.icon to a PascalCase variable
            const IconComponent = feature.icon;
            // --- END FIX ---
            return (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.5 }}
                className="p-8 bg-white dark:bg-slate-950 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  {/* Render the aliased component */}
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// --- 3. Interactive Tools Tab Section ---
function ToolsTabsSection() {
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    { name: "Invoice", icon: RiFileTextLine, component: <MockupInvoice /> },
    { name: "Payslip", icon: RiPagesLine, component: <MockupPayslip /> },
    { name: "Loan", icon: RiCalculatorLine, component: <MockupLoan /> },
    { name: "Margin", icon: RiPercentLine, component: <MockupMargin /> },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Try a Tool Right Now
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Get a feel for our tools without leaving the page.
          </p>
        </motion.div>

        <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
          <Tab.List className="flex flex-wrap sm:flex-nowrap justify-center gap-4">
            {tabs.map((tab) => {
              // --- FIX #2 ---
              // Alias tab.icon to a PascalCase variable
              const IconComponent = tab.icon;
              // --- END FIX ---
              return (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      "w-full sm:w-auto flex-1 sm:flex-none justify-center rounded-lg px-6 py-3 text-base font-medium leading-5 transition-all",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400 focus:ring-white focus:ring-opacity-60",
                      selected
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                    )
                  }
                >
                  {/* Render the aliased component */}
                  <IconComponent className="h-5 w-5 mr-2 inline-block" />
                  {tab.name}
                </Tab>
              );
            })}
          </Tab.List>
          <Tab.Panels className="mt-8 max-w-3xl mx-auto">
            {tabs.map((tab, idx) => (
              <Tab.Panel key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.component}
                </motion.div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
}

// --- 4. Full Tools Grid Section ---
function AllToolsSection() {
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
      transition: { delay: i * 0.1, type: "spring", stiffness: 80 },
    }),
  };

  return (
    <section id="features" className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Your Financial Utility Toolbox
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            One-click solutions for your most common financial tasks.
          </p>
        </motion.div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => {
            // --- FIX #3 ---
            // Alias tool.icon to a PascalCase variable
            const IconComponent = tool.icon;
            // --- END FIX ---
            return (
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
                  className="group block p-8 h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl hover:shadow-2xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                    {/* Render the aliased component */}
                    <IconComponent className="h-6 w-6" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- 5. Testimonials Section ---
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "This is hands-down the fastest invoice generator I've ever used. No popups, no signups, just a perfect PDF. A lifesaver for my freelance business.",
      name: "Sara L.",
      role: "Freelance Designer",
    },
    {
      quote:
        "The loan calculator is amazing. I was able to visualize my entire mortgage payment schedule in seconds. The pie chart makes it so easy to understand.",
      name: "Mike R.",
      role: "Small Business Owner",
    },
    {
      quote:
        "I just needed a quick, professional-looking payslip for my first employee. SmoothLedger was exactly what I was looking for. So simple and clean.",
      name: "David K.",
      role: "Startup Founder",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Loved by Freelancers & Founders
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Don&apost just take our word for it. See what real users are saying.
          </p>
        </motion.div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex flex-col justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800"
            >
              {/* --- FIX #2: Removed the quotes "" around the variable --- */}
              <blockquote className="text-lg text-slate-800 dark:text-slate-200">
                {testimonial.quote}
              </blockquote>
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="font-semibold text-slate-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 6. FAQ Section ---
function FaqSection() {
  const faqs = [
    {
      question: "Is this financial toolbox really 100% free?",
      answer:
        "Yes. All 5 tools (Invoice, Payslip, Quotation, Loan, and Margin) are completely free to use, with no signups, no watermarks, and no item limits on a single page. We plan to make money *later* by offering a separate, premium 'Dashboard' product for users who want cloud storage and team features.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No. Our motto is 'No signups. No fees.' You can use every tool on this site instantly, without giving us any personal information. We do offer optional 'Save in Browser' features that use your computer's local storage, but this is never sent to a server.",
    },
    {
      question: "Can I add my own company logo?",
      answer:
        "Absolutely. The Invoice, Payslip, and Quotation generators all have a simple 'Add Your Logo' button. This is a 100% free feature and makes your documents look truly professional.",
    },
    {
      question: "Is this safe to use for real financial data?",
      answer:
        "Yes. All calculations happen directly in your browser. None of your financial data (client names, amounts, etc.) is ever sent to or stored on our servers. When you use the 'Save' features, it saves directly to your own computer's local storage, which only you can access.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </motion.div>
        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Disclosure
                as="div"
                className="p-6 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between items-center w-full text-left">
                      <span className="text-lg font-medium text-slate-900 dark:text-white">
                        {faq.question}
                      </span>
                      {open ? (
                        <RiSubtractLine className="h-5 w-5 text-blue-500" />
                      ) : (
                        <RiAddLine className="h-5 w-5 text-slate-500" />
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel
                      as="dd"
                      className="mt-4 text-base text-slate-600 dark:text-slate-300"
                    >
                      {faq.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 7. Final CTA Section ---
function FinalCtaSection() {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="relative isolate overflow-hidden bg-blue-600 dark:bg-blue-800 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200">
            Create your first professional document in less than a minute.
          </p>
          <Link
            href="/invoice-generator"
            className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors"
          >
            Create a Free Invoice
            <RiArrowRightSLine className="ml-2 h-5 w-5" />
          </Link>
          
          {/* Background pattern */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#gradient)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#3B82F6" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

// --- Main Home Page ---
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhySmoothLedgerSection />
      <ToolsTabsSection />
      <AllToolsSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}