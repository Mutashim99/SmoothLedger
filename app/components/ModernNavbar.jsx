/* File: components/ModernNavbar.jsx */

"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure, Transition } from "@headlessui/react";
import {
  RiPagesLine,
  RiCalculatorLine,
  RiPercentLine,
  RiFileTextLine,
  RiMoneyDollarCircleLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import Image from "next/image";

// Helper function to join class names
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const toolLinks = [
  // Using shortened names for the desktop
  { name: "Invoice", href: "/invoice-generator", icon: RiFileTextLine },
  { name: "Payslip", href: "/payslip-generator", icon: RiPagesLine },
  {
    name: "Quotation",
    href: "/quotation-generator",
    icon: RiMoneyDollarCircleLine,
  },
  {
    name: "Loan",
    href: "/loan-calculator",
    icon: RiCalculatorLine,
    mobileName: "Loan Calc",
  },
  {
    name: "Margin",
    href: "/profit-margin-calculator",
    icon: RiPercentLine,
    mobileName: "Margin Calc",
  },
];

const mainLinks = [
  { name: "Blogs", href: "/blogs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function ModernNavbar() {
  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm"
    >
      {({ open }) => (
        <>
          {/* Main Navbar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Wrapper for Logo + Company Links */}
              <div className="flex items-center space-x-8">
                {" "}
                {/* <-- Increased space */}
                {/* 1. Logo */}
                <div className="flex-shrink-0 flex items-center">
                  {/* I've set width and height to 40px as an example.
      You can adjust these values.
    */}
                  {/* <Image
                    src={"/SLlogo1.png"}
                    alt={"logo"}
                    width={40}
                    height={40}
                    objectFit="contain" // 'contain' is better for logos
                    className="transition-transform duration-300 "
                  /> */}
                  <Link
                    href="/"
                    className="ml-3 text-2xl font-bold text-slate-900 dark:text-white" // Added ml-3 for spacing
                  >
                    Smooth
                    <span className="text-blue-600 dark:text-blue-500">
                      Ledger
                    </span>
                  </Link>
                </div>
                {/* 2. Desktop "Company" Links */}
                <div className="hidden lg:flex lg:space-x-7">
                  {" "}
                  {/* <-- Increased space */}
                  {mainLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={classNames(
                        pathname === link.href
                          ? "text-blue-600 dark:text-blue-500"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white",
                        "text-base font-medium transition-colors" // <-- FIX: Changed to text-base
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Desktop "Tool" Links (pushed to right) */}
              <div className="hidden lg:flex lg:items-center lg:space-x-7">
                {" "}
                {/* <-- Increased space */}
                {toolLinks.map((link) => {
                  const Icon = link.icon; // Alias the icon
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={classNames(
                        pathname === link.href
                          ? "text-blue-600 dark:text-blue-500"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white",
                        "inline-flex items-center gap-1.5 text-base font-medium transition-colors" // <-- FIX: Changed to text-base
                      )}
                    >
                      <Icon className="h-5 w-5" />{" "}
                      {/* <-- FIX: Icon is back! */}
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* 3. Mobile Menu Button */}
              <div className="flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <RiCloseLine className="block h-6 w-6" />
                  ) : (
                    <RiMenuLine className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel (Floats on top) */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 -translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-4"
          >
            <Disclosure.Panel className="absolute z-40 w-full bg-white dark:bg-slate-950 shadow-lg lg:hidden">
              <div className="pt-4 pb-3 space-y-1 px-2">
                {/* Mobile Main Links */}
                {mainLinks.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/50 dark:border-blue-500 dark:text-blue-300"
                        : "border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200",
                      "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}

                {/* Mobile Tools Links */}
                <div className="pt-3">
                  <h3 className="px-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                    Tools
                  </h3>
                  <div className="mt-2 space-y-1">
                    {toolLinks.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className="group flex items-center px-3 py-2 text-base font-medium rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
                      >
                        <item.icon className="mr-3 h-6 w-6 text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                        {item.mobileName || item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
