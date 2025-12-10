/* File: app/about/page.jsx */

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  RiRocketLine,
  RiShieldCheckLine,
  RiUserSearchLine,
  RiLayoutLine,
  RiLinkedinFill,
  RiGithubFill,
  RiArrowRightSLine,
  RiGlobalLine,
  RiErrorWarningLine,
  RiEyeOffLine, // New icon
  RiMoneyDollarCircleLine,
  RiFileTextLine, // New icon
} from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

export default function AboutPageClient() {
  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // --- Dummy Form Handler ---
  const handleNotifySubmit = (e) => {
    e.preventDefault();
    alert(
      "Thank you for your interest! This is a demo form. Your email has not been submitted."
    );
    e.target.reset();
  };

  return (
    <div className="bg-white dark:bg-slate-950 overflow-hidden">
      {/* --- Hero Section --- */}
      <motion.section
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-200 dark:border-slate-800 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex justify-center mb-4"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
            <RiRocketLine className="h-8 w-8" />
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white"
          variants={itemVariants}
        >
          About SmoothLedger
        </motion.h1>
        <motion.p
          className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-slate-600 dark:text-slate-300"
          variants={itemVariants}
        >
          We are building the financial tools we always wished we had. We
          believe professional, beautiful financial tools should be simple,
          intuitive, and accessible to everyone—not locked behind paywalls or
          cluttered with ads.
        </motion.p>
      </motion.section>

      {/* --- Our Story (Left-Right) Section --- */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Block 1: Text Left, Image Right */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                The Problem We Saw.
              </h2>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
                Finding a simple, free tool to create a professional invoice,
                payslip, or quotation is surprisingly difficult. Existing "free"
                tools are a maze of limitations designed to upsell you.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <RiMoneyDollarCircleLine
                    className="h-6 w-6 text-red-500 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                      Hidden Paywalls
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      You spend time creating the perfect document, only to find
                      a "Download PDF" button that requires a subscription.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <RiEyeOffLine
                    className="h-6 w-6 text-red-500 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                      Clutter & Ads
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Most tools are cluttered with distracting ads, slow to
                      load, and have confusing layouts that make a simple task
                      feel complex.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <RiUserSearchLine
                    className="h-6 w-6 text-red-500 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                      Data Harvesting
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Many free tools force you to sign up just to harvest your
                      email and sell your data. Your privacy should be the
                      default.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-64 sm:h-96 rounded-2xl shadow-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {/* Placeholder - replace with an image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={"/about/1.png"}
                  alt={"about  image"}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Block 2: Image Left, Text Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-24 sm:mt-32"
          >
            <div className="relative h-64 sm:h-96 rounded-2xl shadow-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 lg:order-first">
              {/* Placeholder - replace with an image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={"/about/2.png"}
                  alt={"about  image"}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Our Solution: The SmoothLedger Way.
              </h2>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
                We set out to build a suite of tools that we would want to use
                ourselves. SmoothLedger is our answer—a collection of fast,
                elegant, and genuinely free utilities.
              </p>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Our tools are built with a simple "local-first" approach.
                Everything you do happens in your browser, and nothing is ever
                sent to our servers without your permission.
              </p>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                What started as one tool grew into this free toolbox. Our goal
                is to build your trust by providing real value, right now, for
                free.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Our Guarantees Section --- */}
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
              Our Core Guarantees
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              This is our promise to you. No fine print.
            </p>
          </motion.div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Always Free, No Ads",
                description:
                  "Our core tools are not a 'trial.' They are 100% free, with no watermarks, no ads, and no 'premium' features held back. Get full access instantly.",
                icon: RiShieldCheckLine,
              },
              {
                name: "Privacy First (No Signups)",
                description:
                  "No signups, no accounts, no data collection. All your information is saved in your own browser using Local Storage, not on our servers.",
                icon: RiUserSearchLine,
              },
              {
                name: "Premium by Default",
                description:
                  "A beautiful design and powerful features like 'Save to Device' and multiple templates are not upsells. They are standard.",
                icon: RiLayoutLine,
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.5 }}
                className="p-8 bg-white dark:bg-slate-950 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- What's Next (CTA) Section --- */}
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
              The future is a full dashboard.
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100 dark:text-blue-200 max-w-2xl mx-auto">
              Our free tools are just the beginning. We're building the full
              **SmoothLedger Dashboard** to save your clients, track payments,
              and manage your business in the cloud.
            </p>

            <form
              onSubmit={handleNotifySubmit}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full sm:flex-1 p-3 rounded-md border-0 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-white"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors"
              >
                Notify Me
              </button>
            </form>

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
                fill="url(#gradient-about)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="gradient-about">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#3B82F6" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
