/* File: app/layout.jsx */
import { Analytics } from '@vercel/analytics/next';
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "./theme-provider"; // ThemeToggle removed
import { ModernNavbar } from "@/app/components/ModernNavbar"; // <-- NEW IMPORT
import {
  RiGithubFill,
  RiTwitterFill,
  RiLinkedinFill,
  RiSendPlaneFill
} from "react-icons/ri";

const inter = Inter({ subsets: ["latin"] });

// SEO Metadata (Stays the same)
export const metadata = {
  title: {
    template: "%s | SmoothLedger",
    default: "SmoothLedger | Financial Tools, Beautifully Simple",
  },
  description:
    "Free, simple, and beautifully designed financial tools for freelancers and small businesses. No signups. No fees. Just fast, professional tools.",
};

// --- Footer Component (Redesigned) ---
function Footer() {
  const toolLinks = [
    { name: "Invoice Generator", href: "/invoice-generator" },
    { name: "Payslip Generator", href: "/payslip-generator" },
    { name: "Quotation Generator", href: "/quotation-generator" },
    { name: "Loan Calculator", href: "/loan-calculator" },
    { name: "Margin Calculator", href: "/profit-margin-calculator" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 1. Logo & Slogan */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="text-2xl font-bold text-slate-900 dark:text-white"
            >
              Smooth<span className="text-blue-600 dark:text-blue-500">Ledger</span>
            </Link>
            <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
              Financial Tools, Beautifully Simple.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-slate-500">
                <RiTwitterFill className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-500">
                <RiGithubFill className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-500">
                <RiLinkedinFill className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* 2. Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase">Tools</h3>
              <ul className="mt-4 space-y-2">
                {toolLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Newsletter Section */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase">Subscribe to our newsletter</h3>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
                Get the latest news, articles, and free tools, sent straight to your inbox.
              </p>
              <form className="mt-4 flex flex-col sm:flex-row gap-2">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 text-base text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <RiSendPlaneFill className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 4. Bottom Copyright */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
          <p className="text-base text-slate-500 dark:text-slate-400 text-center">
            © {new Date().getFullYear()} SmoothLedger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- Root Layout (Imports the new components) ---
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-slate-950`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModernNavbar /> 
          <main className="flex-grow">{children}</main>
          <Footer /> {/* <-- Renders redesigned Server Component Footer */}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}