/* File: app/components/MockInvoiceHero.jsx */

"use client";

import { motion } from "framer-motion";

// This is a client component just for the animated hero visual
export function MockInvoiceHero() {
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="relative w-full max-w-lg mx-auto select-none" // Added select-none so users don't accidentally highlight it
      /* --- 1. SEO FIX: Tell Google to ignore this text for snippets --- */
      data-nosnippet=""
      /* --- 2. ACCESSIBILITY FIX: Tell Screen Readers this is just a picture --- */
      aria-hidden="true"
    >
      {/* This is the main invoice card */}
      <div className="w-full h-auto p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800">
        {/* Header: Logo and "INVOICE" */}
        <div className="flex justify-between items-start pb-4 border-b dark:border-slate-700">
          {/* Mock Logo */}
          <div>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              SmoothLedger Solutions
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              456 Tech Lane, Innovation City, 78901
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              INVOICE
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">#001</p>
          </div>
        </div>

        {/* Bill To & Dates */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
          {/* Bill From */}
          <div className="sm:col-span-1">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              From
            </h3>
            <p className="text-base font-medium text-slate-700 dark:text-slate-200 mt-1">
              SmoothLedger
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              123 Digital Ave
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Web City, 90210
            </p>
          </div>

          {/* Bill To */}
          <div className="sm:col-span-1">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Bill To
            </h3>
            <p className="text-base font-medium text-slate-700 dark:text-slate-200 mt-1">
              Acme Inc.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              456 Main Street
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Anytown, 12345
            </p>
          </div>

          {/* Details */}
          <div className="sm:col-span-1 sm:text-right">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Issued
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Nov 15, 2025
            </p>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-2">
              Due
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Dec 15, 2025
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-8 flow-root">
          <div className="-mx-6">
            <div className="inline-block min-w-full align-middle">
              {/* Table Header */}
              <div className="flex bg-slate-50 dark:bg-slate-800 px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <div className="w-1/2">Description</div>
                <div className="w-1/4 text-right">Qty</div>
                <div className="w-1/4 text-right">Total</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {/* Item 1 */}
                <div className="flex px-6 py-4">
                  <div className="w-1/2 text-sm font-medium text-slate-800 dark:text-slate-100">
                    SaaS Website Design
                  </div>
                  <div className="w-1/4 text-right text-sm text-slate-600 dark:text-slate-300">
                    1
                  </div>
                  <div className="w-1/4 text-right text-sm text-slate-600 dark:text-slate-300">
                    $2,500.00
                  </div>
                </div>
                {/* Item 2 */}
                <div className="flex px-6 py-4">
                  <div className="w-1/2 text-sm font-medium text-slate-800 dark:text-slate-100">
                    Logo & Brand Kit
                  </div>
                  <div className="w-1/4 text-right text-sm text-slate-600 dark:text-slate-300">
                    1
                  </div>
                  <div className="w-1/4 text-right text-sm text-slate-600 dark:text-slate-300">
                    $1,200.00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="mt-8 pt-4 border-t dark:border-slate-700">
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Subtotal</span>
                <span>$3,700.00</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Tax (10%)</span>
                <span>$370.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-800 dark:text-white">
                <span>Total</span>
                <span>$4,070.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400">
          Thank you for your business.
        </div>
      </div>
    </motion.div>
  );
}
