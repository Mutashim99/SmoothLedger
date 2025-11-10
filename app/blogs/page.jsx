/* File: app/blogs/page.jsx */

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { allBlogs } from "../../blogsdata"; // Import the blogs
import { RiArrowRightSLine, RiPriceTag3Line } from "react-icons/ri";

export default function BlogListingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
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
          The SmoothLedger Blog
        </h1>
        <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
          Actionable tips, financial guides, and product updates for freelancers
          and small business owners.
        </p>
      </motion.section>

      {/* --- Blog Grid --- */}
      <motion.section
        className="py-24 sm:py-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogs.map((blog, i) => (
              <motion.div
                key={blog.slug}
                variants={itemVariants}
                className="flex"
              >
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                      {blog.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto px-6 pb-6">
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      <RiPriceTag3Line className="h-4 w-4 text-slate-400" />
                      {blog.tags.map((tag) => (
                        <span key={tag} className="inline-block bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-500 group-hover:translate-x-1 transition-transform">
                      Read Post <RiArrowRightSLine className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}