/* File: app/components/MockPayslipHero.jsx */

"use client";

import { motion } from "framer-motion";

export function MockPayslipHero() {
  return (
    <motion.div
      initial={{ opacity: 0.5 ,scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="relative w-full max-w-lg mx-auto"
    >
      <div className="w-full h-auto p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Header: Company Info and Payslip Title */}
        <div className="flex justify-between items-start pb-4 border-b dark:border-slate-700">
          <div className="flex items-center gap-3">
            
            <div>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                SmoothLedger Corp
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                123 Payroll St, Suite 400, Biztown, 90210
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              PAYSLIP
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Period: Oct 1 - Oct 31, 2025
            </p>
          </div>
        </div>

        {/* Employee Details */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6 pb-4 border-b dark:border-slate-700">
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Employee Name
            </h3>
            <p className="text-base font-medium text-slate-700 dark:text-slate-200 mt-1">
              Jane Doe
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Employee ID
            </h3>
            <p className="text-base font-medium text-slate-700 dark:text-slate-200 mt-1">
              EMP-007
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Department
            </h3>
            <p className="text-base font-medium text-slate-700 dark:text-slate-200 mt-1">
              Marketing
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Pay Date
            </h3>
            <p className="text-base font-medium text-slate-700 dark:text-slate-200 mt-1">
              Nov 1, 2025
            </p>
          </div>
        </div>

        {/* Earnings & Deductions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Earnings */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide pb-2 border-b dark:border-slate-700">
              Earnings
            </h3>
            <div className="space-y-2 mt-3">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Base Salary</span>
                <span>$3,500.00</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Bonus</span>
                <span>$200.00</span>
              </div>
            </div>
            <div className="flex justify-between mt-4 pt-3 border-t dark:border-slate-700 text-base font-bold text-slate-800 dark:text-white">
              <span>Gross Pay</span>
              <span>$3,700.00</span>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide pb-2 border-b dark:border-slate-700">
              Deductions
            </h3>
            <div className="space-y-2 mt-3">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Federal Tax</span>
                <span>-$450.00</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>State Tax</span>
                <span>-$150.00</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Health Insurance</span>
                <span>-$120.00</span>
              </div>
            </div>
            <div className="flex justify-between mt-4 pt-3 border-t dark:border-slate-700 text-base font-bold text-slate-800 dark:text-white">
              <span>Total Deductions</span>
              <span>-$720.00</span>
            </div>
          </div>
        </div>

        {/* Net Pay */}
        <div className="mt-8 pt-4 border-t dark:border-slate-700 text-center">
          <h3 className="text-lg font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Net Pay
          </h3>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            $2,980.00
          </p>
        </div>
        
        
      </div>

      {/* A subtle decorative element */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-xl" />
    </motion.div>
  );
}