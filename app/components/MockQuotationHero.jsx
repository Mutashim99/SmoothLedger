/* File: app/components/MockQuotationHero.jsx */

"use client";

import { motion } from "framer-motion";

export function MockQuotationHero() {
  return (
    <motion.div
      initial={{ opacity: 0.5 ,scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* This is the main quotation card */}
      <div className="w-full h-auto p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Header: Company Info and "QUOTATION" Title */}
        <div className="flex justify-between items-start pb-4 border-b dark:border-slate-700">
          <div className="flex items-center gap-3">
           
            <div>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                SmoothLedger Solutions
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                456 Tech Lane, Innovation City, 78901
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              QUOTATION
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              #Q-001
            </p>
          </div>
        </div>

        {/* Client & Date Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
          {/* From */}
          <div className="sm:col-span-1">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              From
            </h3>
            <p className="text-base font-medium text-slate-700 dark:text-slate-200 mt-1">
              SmoothLedger Solutions
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              info@smoothledger.com
            </p>
          </div>
          
          {/* To */}
          <div className="sm:col-span-1">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              To
            </h3>
            <p className="text-base font-medium text-slate-700 dark:text-slate-200 mt-1">
              Global Innovations Co.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              projects@globalinno.com
            </p>
          </div>

          {/* Quote Details */}
          <div className="sm:col-span-1 sm:text-right">
             <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Date
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Nov 10, 2025
            </p>
             <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-2">
              Valid Until
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Dec 10, 2025
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
                <div className="w-1/4 text-right">Price</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {/* Item 1 */}
                <div className="flex px-6 py-4">
                  <div className="w-1/2 text-sm font-medium text-slate-800 dark:text-slate-100">
                    Custom Web Development
                  </div>
                  <div className="w-1/4 text-right text-sm text-slate-600 dark:text-slate-300">1</div>
                  <div className="w-1/4 text-right text-sm text-slate-600 dark:text-slate-300">$5,000.00</div>
                </div>
                {/* Item 2 */}
                <div className="flex px-6 py-4">
                  <div className="w-1/2 text-sm font-medium text-slate-800 dark:text-slate-100">
                    Monthly Maintenance (6 mos)
                  </div>
                  <div className="w-1/4 text-right text-sm text-slate-600 dark:text-slate-300">6</div>
                  <div className="w-1/4 text-right text-sm text-slate-600 dark:text-slate-300">$300.00</div>
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
                <span>$6,800.00</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Tax (5%)</span>
                <span>$340.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-800 dark:text-white">
                <span>Grand Total</span>
                <span>$7,140.00</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 pt-4 border-t dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400">
          Price valid for 30 days. Please contact us with any questions.
        </div>
      </div>

      {/* A subtle decorative element */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-xl" />
    </motion.div>
  );
}