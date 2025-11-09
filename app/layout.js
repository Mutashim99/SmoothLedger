/* File: app/layout.jsx */

import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider, ThemeToggle } from "./theme-provider";
import {
  RiPagesLine,
  RiCalculatorLine,
  RiPercentLine,
  RiFileTextLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

const inter = Inter({ subsets: ["latin"] });

// SEO Metadata (as requested)
export const metadata = {
  title: {
    template: "%s | SmoothLedger",
    default: "SmoothLedger | Financial Tools, Beautifully Simple",
  },
  description:
    "Free, simple, and beautifully designed financial tools for freelancers and small businesses. No signups. No fees. Just fast, professional tools.",
};

// --- Navbar Component ---
// Defined in layout.jsx as requested
function Navbar() {
  const navLinks = [
    {
      name: "Invoice",
      href: "/invoice-generator",
      icon: <RiFileTextLine />,
    },
    {
      name: "Payslip",
      href: "/payslip-generator",
      icon: <RiPagesLine />,
    },
    {
      name: "Quotation",
      href: "/quotation-generator",
      icon: <RiMoneyDollarCircleLine />,
    },
    {
      name: "Loan Calc",
      href: "/loan-calculator",
      icon: <RiCalculatorLine />,
    },
    {
      name: "Margin Calc",
      href: "/profit-margin-calculator",
      icon: <RiPercentLine />,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 1. Text-Based Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-slate-900 dark:text-white"
            >
              Smooth<span className="text-blue-600 dark:text-blue-500">Ledger</span>
            </Link>
          </div>

          {/* 2. Desktop Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. Theme Toggle & Mobile Menu (Placeholder) */}
          <div className="flex items-center">
            <ThemeToggle />
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </div>
      {/* Mobile Menu (Dropdown) - TODO */}
    </nav>
  );
}

// --- Footer Component ---
// Defined in layout.jsx as requested
function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              Smooth<span className="text-blue-600 dark:text-blue-500">Ledger</span>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Financial Tools, Beautifully Simple.
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/invoice-generator"
              className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              Invoice
            </Link>
            <Link
              href="/payslip-generator"
              className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              Payslip
            </Link>
            <Link
              href="/loan-calculator"
              className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              Loan Calculator
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} SmoothLedger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- Root Layout ---
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

