/* File: app/components/MockProfitMarginHero.jsx */

"use client";

import { motion } from "framer-motion";

export function MockProfitMarginHero() {
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto select-none" // Added select-none so users don't accidentally highlight it
      /* --- 1. SEO FIX: Tell Google to ignore this text for snippets --- */
      data-nosnippet=""
      /* --- 2. ACCESSIBILITY FIX: Tell Screen Readers this is just a picture --- */
      aria-hidden="true"
    >
      {/* Main card */}
      <div className="w-full h-auto p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white text-center">
          Sample Profit Calculation
        </h3>

        {/* Mock Inputs */}
        <div className="space-y-4 mt-6">
          {/* Revenue */}
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Revenue
            </label>
            <div className="mt-1 flex items-center p-3 h-12 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                $10,000
              </span>
            </div>
          </div>

          {/* Cost of Goods */}
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Cost of Goods Sold (COGS)
            </label>
            <div className="mt-1 flex items-center p-3 h-12 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                $6,000
              </span>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="mt-6 pt-6 border-t dark:border-slate-700">
          <div className="text-center">
            <h4 className="text-base font-medium text-slate-500 dark:text-slate-400">
              Your Gross Profit:
            </h4>
            <p className="text-4xl sm:text-5xl font-bold text-green-600 dark:text-green-400 mt-2">
              $4,000
            </p>
          </div>
        </div>

        {/* Simple Bar Chart Visual for Margin */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 text-center mb-3">
            Gross Profit Margin: <span className="font-bold">40%</span>
          </h4>
          <div className="relative w-full h-8 bg-red-400 dark:bg-red-600 rounded-md overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 dark:bg-green-400 rounded-md"
              style={{ width: "40%" }} // Represents the 40% profit margin
            ></div>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-sm font-medium">
              Profit
            </span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-sm font-medium">
              Cost
            </span>
          </div>

          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300 mt-2 px-1">
            <span>$0 (Cost)</span>
            <span>$10,000 (Revenue)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
