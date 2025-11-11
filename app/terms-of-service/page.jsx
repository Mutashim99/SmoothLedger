"use client";

import React from "react";
import { motion } from "framer-motion";
import { RiDraftLine } from "react-icons/ri";
import Link from "next/link";

export default function TermsOfServicePage() {
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
            <RiDraftLine className="h-8 w-8" />
          </div>
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white"
          variants={itemVariants}
        >
          Terms of Service
        </motion.h1>
        <motion.p
          className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-slate-600 dark:text-slate-300"
          variants={itemVariants}
        >
          These are the rules for using our free tools. By accessing and
          using SmoothLedger, you agree to these terms.
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
            <h2 className="mt-4">1. Use of Our Services</h2>
            <p>
              SmoothLedger provides a collection of free-to-use financial tools
              (the "Services"). You are free to use these Services for
              personal or commercial purposes, such as creating invoices,
              payslips, and quotations for your business.
            </p>
            <p>
              You agree not to use the Services in any way that is unlawful, or
              that could harm, disable, overburden, or impair our servers or
              networks. You agree not to attempt to gain unauthorized access to
              any part of our Services.
            </p>

            <h2>2. No Financial Advice</h2>
            <p>
              Our tools, including the Loan Calculator and Profit Margin
              Calculator, are provided for informational and educational
              purposes only.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4">
              <strong>SmoothLedger does not provide financial, legal, or tax
              advice.</strong> The output from these tools should not be
              considered a substitute for professional financial advice from a
              qualified accountant, financial advisor, or lawyer. We are not
              liable for any decisions you make based on the information
              provided by our tools.
            </blockquote>

            <h2>3. Limitation of Liability</h2>
            <p>
              All Services are provided "as is" and "as available" without any
              warranties. We do not guarantee that the Services will be
              error-free, uninterrupted, or that the calculations will be 100%
              accurate for every scenario (though we try our best!).
            </p>
            <p>
              Because our tools rely on your browser's Local Storage, we are
              not responsible for any data loss that may occur if you clear your
              browser cache or your data is otherwise erased. In no event shall
              SmoothLedger be liable for any direct, indirect, or consequential
              damages arising from the use or inability to use our Services.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              We own all rights to the design, layout, and code of the
              SmoothLedger website and tools. You own all the data you enter
              and the documents (PDFs) you generate. You are granted a limited
              license to use our tools to create these documents.
            </p>

            <h2>5. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will
              notify you of any changes by posting the new Terms of Service on
              this page. Your continued use of the site after such changes
              constitutes your acceptance of the new terms.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please{" "}
              <Link href="/contact">contact us</Link>.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}