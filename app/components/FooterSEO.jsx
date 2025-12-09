/* File: app/components/FooterSEO.jsx */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiArrowDownSLine, RiArrowUpSLine, RiFileList3Line, RiPriceTag3Line, RiMoneyDollarCircleLine } from "react-icons/ri";

// Import all three data sets
// Note: We rename them during import to avoid conflict
import { professions as invoiceData } from "../invoice-generator/professionsData";
import { professions as payslipData } from "../payslip-generator/professionsData";
import { professions as quoteData } from "../quotation-generator/professionsData";

export default function FooterSEO() {
  // State for the Tabs (invoice, payslip, or quotation)
  const [activeTab, setActiveTab] = useState("invoice");
  // State for the "Show More" toggle
  const [isExpanded, setIsExpanded] = useState(false);

  // Configuration for the tabs
  const tabs = [
    { id: "invoice", label: "Invoice Templates", icon: RiMoneyDollarCircleLine, data: invoiceData, basePath: "/invoice-generator" },
    { id: "payslip", label: "Payslip Templates", icon: RiFileList3Line, data: payslipData, basePath: "/payslip-generator" },
    { id: "quotation", label: "Quotation Templates", icon: RiPriceTag3Line, data: quoteData, basePath: "/quotation-generator" },
  ];

  // Determine which data to show based on active tab
  const currentTab = tabs.find((t) => t.id === activeTab);
  const currentData = currentTab ? currentTab.data : [];

  // Logic: Show only 20 items if collapsed, show all if expanded
  const visibleItems = isExpanded ? currentData : currentData.slice(0, 20);

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- 1. The Tabs --- */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsExpanded(false); // Reset expansion when switching tabs
                }}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* --- 2. The Link Grid --- */}
        <div className="min-h-[200px]"> {/* Min-height prevents jumping */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-4">
            {visibleItems.map((item) => (
              <Link
                key={item.slug}
                href={`${currentTab.basePath}/${item.slug}`}
                className="text-xs text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors truncate block"
                title={`Free ${currentTab.label} for ${item.title}`}
              >
                {/* Dynamic Text: e.g., "Invoice for Plumbers" or "Payslip for Nurses" */}
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* --- 3. The Toggle Button --- */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {isExpanded ? (
              <>
                Show Less <RiArrowUpSLine />
              </>
            ) : (
              <>
                Show All {currentData.length} {currentTab.label} <RiArrowDownSLine />
              </>
            )}
          </button>
        </div>

        {/* --- 4. SEO Context Text (Updates based on Tab) --- */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
          {activeTab === 'invoice' && (
            <p>
              SmoothLedger provides free invoicing tools for professionals worldwide. 
              Whether you are a freelancer in the UK, a contractor in the US, or a designer in Canada, 
              our <strong>Invoice Generator</strong> templates are fully customizable to your currency and tax laws.
            </p>
          )}
          {activeTab === 'payslip' && (
            <p>
              Generate accurate proof of income with our <strong>Payslip Generator</strong>. 
              Ideal for employees, self-employed individuals, and HR managers looking to create 
              salary certificates, pay stubs, and wage slips instantly.
            </p>
          )}
          {activeTab === 'quotation' && (
            <p>
              Win more jobs with professional estimates. Our <strong>Quotation Generator</strong> 
              helps contractors, freelancers, and agencies create detailed price quotes, 
              bids, and proposals that look great on any device.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}