/* File: app/loan-calculator/page.jsx */

"use client";

import React, { useState, useMemo } from "react";
import {
  RiBankLine,
  RiMoneyDollarCircleLine,
  RiPercentLine,
  RiTimeLine,
  RiPieChartLine,
  RiTableLine,
} from "react-icons/ri";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// --- List of Currencies ---
const currencyList = [
  { code: "USD", name: "USD ($)" },
  { code: "EUR", name: "EUR (€)" },
  { code: "GBP", name: "GBP (£)" },
  { code: "JPY", name: "JPY (¥)" },
  { code: "AUD", name: "AUD (A$)" },
  { code: "CAD", name: "CAD (C$)" },
  { code: "CHF", name: "CHF (Fr)" },
  { code: "CNY", name: "CNY (¥)" },
  { code: "INR", name: "INR (₹)" },
  { code: "BRL", name: "BRL (R$)" },
  { code: "PKR", name: "PKR (Rs)" },
  { code: "AED", name: "AED (د.إ)" },
  { code: "SAR", name: "SAR (﷼)" },
];

export default function LoanCalculatorPage() {
  // --- STATE MANAGEMENT ---
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(5); // in years
  const [currencyCode, setCurrencyCode] = useState("USD");

  // --- CURRENCY FORMATTER ---
  const formatCurrency = (amount) => {
    // Use a basic formatter for the input box to avoid symbols
    if (typeof amount === "string") {
      return amount;
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // --- LOAN CALCULATIONS (using useMemo for performance) ---
  const { monthlyPayment, totalInterest, totalCost, amortizationSchedule } =
    useMemo(() => {
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 100 / 12;
      const termMonths = parseFloat(loanTerm) * 12;

      let monthly = 0;
      if (principal > 0 && rate > 0 && termMonths > 0) {
        monthly =
          (principal * rate * Math.pow(1 + rate, termMonths)) /
          (Math.pow(1 + rate, termMonths) - 1);
      } else if (principal > 0 && termMonths > 0) {
        // Handle 0% interest case
        monthly = principal / termMonths;
      }

      const total = monthly * termMonths;
      const interest = total - principal;

      // --- Amortization Schedule ---
      let schedule = [];
      let remainingBalance = principal;

      for (let i = 1; i <= termMonths; i++) {
        if (remainingBalance <= 0.01) break; // Stop if paid off

        const interestPayment = remainingBalance * rate;
        const principalPayment = monthly - interestPayment;
        remainingBalance -= principalPayment;

        schedule.push({
          month: i,
          payment: monthly,
          principal: principalPayment,
          interest: interestPayment,
          balance: remainingBalance > 0 ? remainingBalance : 0,
        });
      }

      return {
        monthlyPayment: monthly,
        totalInterest: interest,
        totalCost: total,
        amortizationSchedule: schedule,
      };
    }, [loanAmount, interestRate, loanTerm]);

  // --- CHART DATA ---
  const chartData = {
    labels: ["Total Principal", "Total Interest"],
    datasets: [
      {
        data: [
          loanAmount > 0 ? loanAmount : 1, // Prevent chart collapse at 0
          totalInterest > 0 ? totalInterest : 0.01,
        ],
        backgroundColor: ["#3B82F6", "#F97316"], // Blue-500, Orange-500
        borderColor: ["#FFFFFF", "#FFFFFF"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#475569", // text-slate-600
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return ` ${context.label}: ${formatCurrency(context.raw)}`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-950">
        {/* --- Hero Section --- */}
        <div className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-200 dark:border-slate-800">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white"
          >
            Interactive
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 bg-clip-text text-transparent">
              {" "}
              Loan Calculator
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-slate-600 dark:text-slate-300"
          >
            Instantly visualize your monthly payments, total interest, and see a
            full amortization schedule. No signups, just answers.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* --- Controls Column --- */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <RiBankLine className="mr-3 text-blue-500" />
                Loan Details
              </h2>

              <div className="space-y-8">
                {/* Currency */}
                <div className="space-y-2">
                  <label
                    htmlFor="currency"
                    className="text-sm font-medium text-slate-600 dark:text-slate-400"
                  >
                    Currency
                  </label>
                  <select
                    id="currency"
                    value={currencyCode}
                    onChange={(e) => setCurrencyCode(e.target.value)}
                    className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base focus:ring-blue-500 focus:border-blue-500"
                  >
                    {currencyList.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* --- UPDATED: Loan Amount --- */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="loanAmount"
                      className="text-sm font-medium text-slate-600 dark:text-slate-400"
                    >
                      Loan Amount
                    </label>
                    {/* New Number Input */}
                    <input
                      type="number"
                      id="loanAmount"
                      min="1"
                      max="10000000" // Increased max
                      step="1"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-40 p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-right font-bold text-xl"
                    />
                  </div>
                  <input
                    type="range"
                    id="loanAmountSlider"
                    min="1" // Changed min
                    max="1000000" // Kept slider max reasonable
                    step="100" // Changed step
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Interest Rate (Already editable) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="interestRate"
                      className="text-sm font-medium text-slate-600 dark:text-slate-400"
                    >
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      id="interestRate"
                      min="0"
                      max="30"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-28 p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-right font-bold"
                    />
                  </div>
                </div>

                {/* --- UPDATED: Loan Term --- */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="loanTerm"
                      className="text-sm font-medium text-slate-600 dark:text-slate-400"
                    >
                      Loan Term (Years)
                    </label>
                    {/* New Number Input */}
                    <input
                      type="number"
                      id="loanTerm"
                      min="1"
                      max="50" // Increased max
                      step="1"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-28 p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-right font-bold text-xl"
                    />
                  </div>
                  <input
                    type="range"
                    id="loanTermSlider"
                    min="1"
                    max="30" // Kept slider max reasonable
                    step="1"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>

            {/* --- Results Column --- */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-3 bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <RiPieChartLine className="mr-3 text-blue-500" />
                Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Key Numbers */}
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-900 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                      Monthly Payment
                    </div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(monthlyPayment)}
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-900 rounded-lg">
                    <div className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-1">
                      Total Interest Paid
                    </div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {formatCurrency(totalInterest)}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg">
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Total Cost of Loan
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      {formatCurrency(totalCost)}
                    </div>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="relative h-64 md:h-full">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- Amortization Table --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <RiTableLine className="mr-3 text-blue-500" />
              Amortization Schedule
            </h2>
            <div className="overflow-x-auto bg-white dark:bg-slate-950 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-slate-50 dark:bg-slate-900 z-10">
                    <tr className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      <th className="p-4">Month</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Principal</th>
                      <th className="p-4">Interest</th>
                      <th className="p-4 text-right">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {amortizationSchedule.map((row) => (
                      <tr
                        key={row.month}
                        className="text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                      >
                        <td className="p-4">{row.month}</td>
                        <td className="p-4">{formatCurrency(row.payment)}</td>
                        <td className="p-4 text-green-600 dark:text-green-400">
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="p-4 text-red-600 dark:text-red-400">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="p-4 text-right font-medium text-slate-800 dark:text-slate-100">
                          {formatCurrency(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
