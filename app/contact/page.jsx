/* File: app/contact/page.jsx */

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  RiMailSendLine,
  RiMapPinLine,
  RiGlobalLine,
  RiGithubFill,
  RiTwitterFill,
  RiLinkedinFill,
  RiSubtractLine,
  RiAddLine,
} from "react-icons/ri";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

export default function ContactPage() {
  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  // --- Dummy Form Handler ---
  const handleSubmit = (e) => {
    e.preventDefault();
    // This is where you would wire up a backend, e.g., Resend, Formspark, etc.
    alert(
      "Thank you for your message! This is a demo form. No data has been sent."
    );
  };

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* --- Hero Section --- */}
      <motion.section
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-200 dark:border-slate-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">
          Get in Touch
        </h1>
        <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
          We'd love to hear from you. Whether you have a question, feedback, or
          just want to say hi, our team is ready to answer all your questions.
        </p>
      </motion.section>

      {/* --- Contact Form & Info Section --- */}
      <motion.section
        className="py-24 sm:py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* --- Contact Form --- */}
            <motion.div
              className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      required
                      className="mt-1 block w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      className="mt-1 block w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    className="mt-1 block w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="mt-1 block w-full p-3 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>

            {/* --- Contact Info --- */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <RiMailSendLine className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Email Us</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Get in touch with our team for support or inquiries.
                  </p>
                  <a href="mailto:support@smoothledger.com" className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:text-blue-500">
                    support@smoothledger.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <RiMapPinLine className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Visit Us</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    123 Innovation Drive
                    <br />
                    Karachi, Sindh, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <RiGlobalLine className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Follow Us</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Stay up to date with our latest news and tools.
                  </p>
                  <div className="mt-2 flex gap-4">
                    <a href="#" className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400"><RiTwitterFill className="h-6 w-6" /></a>
                    <a href="#" className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400"><RiGithubFill className="h-6 w-6" /></a>
                    <a href="#" className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400"><RiLinkedinFill className="h-6 w-6" /></a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* --- FAQ Section --- */}
      <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Support FAQs
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Have a question? We're here to help.
            </p>
          </motion.div>
          <div className="mt-12 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Disclosure
                as="div"
                className="p-6 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between items-center w-full text-left">
                      <span className="text-lg font-medium text-slate-900 dark:text-white">
                        What's your average response time?
                      </span>
                      {open ? (
                        <RiSubtractLine className="h-5 w-5 text-blue-500" />
                      ) : (
                        <RiAddLine className="h-5 w-5 text-slate-500" />
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel
                      as="dd"
                      className="mt-4 text-base text-slate-600 dark:text-slate-300"
                    >
                      Our team strives to respond to all inquiries within 24-48 business hours. We appreciate your patience!
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Disclosure
                as="div"
                className="p-6 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between items-center w-full text-left">
                      <span className="text-lg font-medium text-slate-900 dark:text-white">
                        Do you offer enterprise or custom support plans?
                      </span>
                      {open ? (
                        <RiSubtractLine className="h-5 w-5 text-blue-500" />
                      ) : (
                        <RiAddLine className="h-5 w-5 text-slate-500" />
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel
                      as="dd"
                      className="mt-4 text-base text-slate-600 dark:text-slate-300"
                    >
                      Not at this time, as our tools are designed to be self-service and free. However, we are planning a premium 'Dashboard' product. Use this form to send us your feature requests!
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Disclosure
                as="div"
                className="p-6 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between items-center w-full text-left">
                      <span className="text-lg font-medium text-slate-900 dark:text-white">
                        Where can I report a bug or suggest a feature?
                      </span>
                      {open ? (
                        <RiSubtractLine className="h-5 w-5 text-blue-500" />
                      ) : (
                        <RiAddLine className="h-5 w-5 text-slate-500" />
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel
                      as="dd"
                      className="mt-4 text-base text-slate-600 dark:text-slate-300"
                    >
                      You're in the right place! Please use the contact form on this page to send us any bug reports or feature ideas. We read every submission.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </motion.div>
            
          </div>
        </div>
      </section>
    </div>
  );
}