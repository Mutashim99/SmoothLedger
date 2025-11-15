/* File: app/components/MockLoanCalcHero.jsx */

"use client";

import { motion } from "framer-motion";

export function MockLoanCalcHero() {
  return (
    <motion.div
      initial={{ opacity: 0.5 ,scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Main card */}
      <div className="w-full h-auto p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800">
        
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white text-center">
          Sample Loan Calculation
        </h3>

        {/* Mock Inputs */}
        <div className="space-y-4 mt-6">
          {/* Loan Amount */}
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Loan Amount
            </label>
            <div className="mt-1 flex items-center p-3 h-12 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                $25,000
              </span>
            </div>
          </div>
          
          {/* Two-column for Rate and Term */}
          <div className="grid grid-cols-2 gap-4">
            {/* Interest Rate */}
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Interest Rate
              </label>
              <div className="mt-1 flex items-center p-3 h-12 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  7.5%
                </span>
              </div>
            </div>
            {/* Loan Term */}
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Loan Term
              </label>
              <div className="mt-1 flex items-center p-3 h-12 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  5 years
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="mt-6 pt-6 border-t dark:border-slate-700">
          <div className="text-center">
            <h4 className="text-base font-medium text-slate-500 dark:text-slate-400">
              Your Estimated Monthly Payment:
            </h4>
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              $501.25
            </p>
          </div>
        </div>

        {/* Simple Pie Chart Visual */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 text-center mb-3">
            Payment Breakdown
          </h4>
          <div className="flex justify-center items-center gap-4">
            {/* The Pie Chart */}
            <div
              className="relative w-20 h-20 rounded-full"
              style={{
                background:
                  "conic-gradient(var(--tw-gradient-from) 0% 75%, var(--tw-gradient-to) 75% 100%)",
                "--tw-gradient-from": "#3b82f6", // blue-500
                "--tw-gradient-to": "#a5b4fc", // indigo-300
              }}
            >
              {/* Inner hole */}
              <div className="absolute top-1/2 left-1/2 w-14 h-14 bg-white dark:bg-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-blue-500 mr-2"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Principal (75%)
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-sm bg-indigo-300 mr-2"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Total Interest (25%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}