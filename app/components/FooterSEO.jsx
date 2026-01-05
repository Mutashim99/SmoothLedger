import Link from "next/link";
import {
  RiFileList3Line,
  RiPriceTag3Line,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

// Import all three data sets
import { professions as invoiceData } from "../(tools)/invoice-generator/professionsData";
import { professions as payslipData } from "../(tools)/payslip-generator/professionsData";
import { professions as quoteData } from "../(tools)/quotation-generator/professionsData";

export default function FooterSEO() {
  // Define the sections structure
  const sections = [
    {
      id: "invoice",
      label: "Invoice Templates",
      icon: RiMoneyDollarCircleLine,
      data: invoiceData, // Renders ALL items
      basePath: "/invoice-generator",
      description:
        "SmoothLedger provides free invoicing tools for professionals worldwide. Whether you are a freelancer in the UK, a contractor in the US, or a designer in Canada, our Invoice Generator templates are fully customizable.",
    },
    {
      id: "payslip",
      label: "Payslip Templates",
      icon: RiFileList3Line,
      data: payslipData, // Renders ALL items
      basePath: "/payslip-generator",
      description:
        "Generate accurate proof of income with our Payslip Generator. Ideal for employees, self-employed individuals, and HR managers looking to create salary certificates, pay stubs, and wage slips instantly.",
    },
    {
      id: "quotation",
      label: "Quotation Templates",
      icon: RiPriceTag3Line,
      data: quoteData, // Renders ALL items
      basePath: "/quotation-generator",
      description:
        "Win more jobs with professional estimates. Our Quotation Generator helps contractors, freelancers, and agencies create detailed price quotes, bids, and proposals that look great on any device.",
    },
  ];

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">
          Browse Templates by Profession
        </h2>

        {/* Loop through each section (Invoice, Payslip, Quote) */}
        <div className="flex flex-col gap-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className="border-b border-slate-200 dark:border-slate-800 pb-12 last:border-0 last:pb-0"
              >
                {/* Section Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {section.label}
                  </h3>
                </div>

                {/* The Link Grid - Renders EVERYTHING */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-4 mb-6">
                  {section.data.map((item) => (
                    <Link
                      key={item.slug}
                      href={`${section.basePath}/${item.slug}`}
                      className="text-xs text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors truncate block"
                      title={`Free ${section.label} for ${item.title}`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Section SEO Description */}
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-3xl">
                  {section.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
