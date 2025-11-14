/* File: app/profit-margin-calculator/page.jsx */

"use client";

import React, { useState, useMemo } from "react";
import {
  RiArrowLeftRightLine,
  RiCalculatorLine,
  RiHandCoinLine,
  RiPercentLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@headlessui/react";

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

export default function ProfitMarginClient() {
  // --- STATE MANAGEMENT ---
  const [cost, setCost] = useState(50);
  const [sellingPrice, setSellingPrice] = useState(100);
  const [marginPercent, setMarginPercent] = useState(50);
  const [isReverseMode, setIsReverseMode] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("USD");

  // --- CURRENCY FORMATTER ---
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // --- CALCULATIONS (using useMemo) ---
  const { calculatedGrossProfit, calculatedMargin, calculatedSellingPrice } =
    useMemo(() => {
      const c = parseFloat(cost) || 0;
      const sp = parseFloat(sellingPrice) || 0;
      const m = parseFloat(marginPercent) || 0;

      if (isReverseMode) {
        // Reverse Mode: Calculate Selling Price based on Cost and Margin
        let newSellingPrice = 0;
        if (m < 100) {
          newSellingPrice = c / (1 - m / 100);
        }
        const grossProfit = newSellingPrice - c;
        return {
          calculatedGrossProfit: grossProfit,
          calculatedMargin: m,
          calculatedSellingPrice: newSellingPrice,
        };
      } else {
        // Standard Mode: Calculate Margin based on Cost and Selling Price
        const grossProfit = sp - c;
        const newMargin = sp > 0 ? (grossProfit / sp) * 100 : 0;
        return {
          calculatedGrossProfit: grossProfit,
          calculatedMargin: newMargin,
          calculatedSellingPrice: sp,
        };
      }
    }, [cost, sellingPrice, marginPercent, isReverseMode]);

  // --- Input Handlers ---
  const handleCostChange = (e) => {
    setCost(e.target.value);
  };

  const handleSellingPriceChange = (e) => {
    setSellingPrice(e.target.value);
  };

  const handleMarginChange = (e) => {
    setMarginPercent(e.target.value);
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
            Profit Margin
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 bg-clip-text text-transparent">
              {" "}
              Calculator
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-slate-600 dark:text-slate-300"
          >
            Instantly find your profit margin or calculate the perfect selling
            price to achieve your desired margin.
          </motion.p>
        </div>

        {/* --- Calculator --- */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800"
          >
            {/* --- Currency Selector --- */}
            <div className="max-w-xs mb-8">
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
                className="mt-1 w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base focus:ring-blue-500 focus:border-blue-500"
              >
                {currencyList.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* --- Reverse Mode Toggle --- */}
            <div className="flex items-center justify-center mb-8">
              <span className={`mr-3 font-medium ${!isReverseMode ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                Calculate Margin
              </span>
              <Switch
                checked={isReverseMode}
                onChange={setIsReverseMode}
                className={`${
                  isReverseMode ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
                } relative inline-flex h-7 w-14 items-center rounded-full transition-colors`}
              >
                <span className="sr-only">Toggle reverse mode</span>
                <span
                  className={`${
                    isReverseMode ? "translate-x-8" : "translate-x-1"
                  } inline-block h-5 w-5 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <span className={`ml-3 font-medium ${isReverseMode ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                Calculate Selling Price
              </span>
            </div>

            {/* --- Inputs --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cost Input */}
              <div className="space-y-2">
                <label
                  htmlFor="cost"
                  className="text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                  <RiHandCoinLine className="inline mr-1" /> Product Cost
                </label>
                <input
                  type="number"
                  id="cost"
                  min="0"
                  step="0.01"
                  value={cost}
                  onChange={handleCostChange}
                  className="w-full p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-2xl font-bold focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Selling Price or Margin Input */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isReverseMode ? "margin" : "price"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  {!isReverseMode ? (
                    <>
                      <label
                        htmlFor="sellingPrice"
                        className="text-sm font-medium text-slate-600 dark:text-slate-400"
                      >
                        <RiMoneyDollarCircleLine className="inline mr-1" />{" "}
                        Selling Price
                      </label>
                      <input
                        type="number"
                        id="sellingPrice"
                        min="0"
                        step="0.01"
                        value={sellingPrice}
                        onChange={handleSellingPriceChange}
                        className="w-full p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-2xl font-bold focus:ring-blue-500 focus:border-blue-500"
                      />
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor="marginPercent"
                        className="text-sm font-medium text-slate-600 dark:text-slate-400"
                      >
                        <RiPercentLine className="inline mr-1" /> Desired Margin
                        (%)
                      </label>
                      <input
                        type="number"
                        id="marginPercent"
                        min="0"
                        max="99.99"
                        step="0.1"
                        value={marginPercent}
                        onChange={handleMarginChange}
                        className="w-full p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-2xl font-bold focus:ring-blue-500 focus:border-blue-500"
                      />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* --- Results --- */}
            <div className="mt-8 pt-8 border-t border-slate-300 dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <RiCalculatorLine className="mr-3 text-blue-500" />
                Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Gross Profit */}
                <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow">
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Gross Profit
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(calculatedGrossProfit)}
                  </div>
                </div>

                {/* Profit Margin */}
                <div className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow">
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Profit Margin
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {calculatedMargin.toFixed(2)}%
                  </div>
                </div>

                {/* Calculated Selling Price (Reverse Mode) */}
                <AnimatePresence>
                  {isReverseMode && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-900 rounded-lg"
                    >
                      <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                        Required Selling Price
                      </div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(calculatedSellingPrice)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}