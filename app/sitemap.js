/* File: app/sitemap.js */

import { allBlogs } from "../blogsdata";
// 1. Import Invoice Data
import { professions as invoiceProfessions } from "./(tools)/invoice-generator/professionsData";
// 2. Import Payslip Data
import { professions as payslipProfessions } from "./(tools)/payslip-generator/professionsData";
// 3. Import Quotation Data
import { professions as quoteProfessions } from "./(tools)/quotation-generator/professionsData";

export default function sitemap() {
  const baseUrl = "https://smoothledger.com";

  // --- MANUAL UPDATE REQUIRED ---
  // Change this date ONLY when you add new features or update the text on your tool pages.
  // This prevents Google from re-crawling 400+ pages unnecessarily every time you deploy.
  const SITE_UPDATED = new Date("2026-01-07").toISOString();

  // --- Blog Posts (Keep logic: Uses actual post date) ---
  const blogPosts = allBlogs.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // --- Dynamic Invoice Pages ---
  const invoicePages = invoiceProfessions.map((p) => ({
    url: `${baseUrl}/invoice-generator/${p.slug}`,
    lastModified: SITE_UPDATED, // Uses fixed date
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // --- Dynamic Payslip Pages ---
  const payslipPages = payslipProfessions.map((p) => ({
    url: `${baseUrl}/payslip-generator/${p.slug}`,
    lastModified: SITE_UPDATED, // Uses fixed date
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // --- Dynamic Quotation Pages ---
  const quotePages = quoteProfessions.map((p) => ({
    url: `${baseUrl}/quotation-generator/${p.slug}`,
    lastModified: SITE_UPDATED, // Uses fixed date
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // --- Static Pages ---
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // Invoice Tools
    {
      url: `${baseUrl}/invoice-generator`,
      lastModified: SITE_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/invoice-generator/create`,
      lastModified: SITE_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },

    // Payslip Tools
    {
      url: `${baseUrl}/payslip-generator`,
      lastModified: SITE_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/payslip-generator/create`,
      lastModified: SITE_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },

    // Quotation Tools
    {
      url: `${baseUrl}/quotation-generator`,
      lastModified: SITE_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quotation-generator/create`,
      lastModified: SITE_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },

    // Calculators
    {
      url: `${baseUrl}/loan-calculator`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profit-margin-calculator`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Company / Info
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // --- Combine All ---
  return [
    ...staticPages,
    ...invoicePages,
    ...payslipPages,
    ...quotePages,
    ...blogPosts,
  ];
}