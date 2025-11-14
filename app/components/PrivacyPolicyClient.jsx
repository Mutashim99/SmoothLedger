"use client";

import React from "react";
import { motion } from "framer-motion";
import { RiShieldCheckLine } from "react-icons/ri";
import Link from "next/link";



export default function PrivacyPolicyClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="bg-white dark:bg-slate-950">
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
            <RiShieldCheckLine className="h-8 w-8" />
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white"
          variants={itemVariants}
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-slate-600 dark:text-slate-300"
          variants={itemVariants}
        >
          Your privacy is our number one priority. Our policy is simple:{" "}
          <strong>we don't collect your personal data.</strong>
        </motion.p>
      </motion.section>

      {/* --- Content Section --- */}
      <motion.section
        className="py-24 sm:py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg lg:prose-xl dark:prose-invert prose-blue prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
          <motion.div variants={itemVariants}>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: November 11, 2025
            </p>
            <h2 className="mt-4">Our Core Privacy Promise</h2>
            <p>
              SmoothLedger ("we", "us", "our") is designed from the ground up to
              be private-first. We believe you shouldn't have to trade your
              personal information just to use a simple tool.
            </p>
            <p>
              Our motto is <b>"No Signups. No Fees."</b> This means we do not ask
              for your email address, your name, your company information, or any
              other personal data to use our core tools.
            </p>

            <h2>What Data Do We Not Collect?</h2>
            <p>
              When you use our Invoice, Payslip, or Quotation generators, all the
              information you enter—your client's name, your earnings, your line
              items, your totals—is processed <b>exclusively in your web browser</b>.
            </p>
            <ul className="list-disc list-outside pl-6">
              <li>
                We <b>NEVER</b> see or store your financial data.
              </li>
              <li>
                We <b>NEVER</b>  send your invoice, payslip, or quote data to our
                servers.
              </li>
              <li>
                We <b>NEVER</b>  have access to the PDFs you download.
              </li>
            </ul>

            <h2>What About the "Save" Features?</h2>
            <p>
              Our "Save My Details," "Save Client," and "Save Invoice" features
              use your browser's Local Storage. This is a small, secure
              storage space on your own computer.
            </p>
            <ul className="list-disc list-outside pl-6">
              <li>
                This data is saved only on your device.
              </li>
              <li>
                We do not have access to this data. It is never transmitted to us.
              </li>
              <li>
                If you clear your browser's cache or storage, this data will be
                permanently deleted.
              </li>
            </ul>

            <h2>What Data <b>Do</b> We Collect?</h2>
            <p>
              Like most websites, we use simple, anonymous analytics (such as
              Vercel Analytics) to understand how our site is used. This helps us
              answer questions like:
            </p>
            <ul className="list-disc list-outside pl-6">
              <li>Which tools are most popular?</li>
              <li>How many people visit our site?</li>
              <li>What countries are our visitors from?</li>
            </ul>
            <p>
              This data is aggregated and completely anonymous. It is never
              linked to you or any personal information.
            </p>

            <h2>Cookies</h2>
            <p>
              We use a minimal number of cookies, primarily to manage your dark
              mode/light mode preference. We do not use third-party tracking or
              advertising cookies.
            </p>

            <h2>Contact & Newsletter Forms</h2>
            <p>
              If you choose to contact us via our Contact Form or sign up for our
              "What's Next" newsletter, you will be voluntarily providing an
              email address. This email is used only for the purpose you
              provided it: to respond to your inquiry or to send you product
              updates. We will never sell your email to third parties.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. We will notify you of
              any changes by posting the new policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please{" "}
              <Link href="/contact">contact us</Link>.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}