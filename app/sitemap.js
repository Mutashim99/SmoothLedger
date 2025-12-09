/* File: app/sitemap.js */

import { allBlogs } from '../blogsdata';
// 1. Import Invoice Data
import { professions as invoiceProfessions } from './invoice-generator/professionsData'; 
// 2. Import Payslip Data
import { professions as payslipProfessions } from './payslip-generator/professionsData'; 
// 3. Import Quotation Data (NEW)
import { professions as quoteProfessions } from './quotation-generator/professionsData';

export default function sitemap() {
  const baseUrl = 'https://smoothledger.com';

  // --- Blog Posts ---
  const blogPosts = allBlogs.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // --- Dynamic Invoice Pages ---
  const invoicePages = invoiceProfessions.map((p) => ({
    url: `${baseUrl}/invoice-generator/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8, 
  }));

  // --- Dynamic Payslip Pages ---
  const payslipPages = payslipProfessions.map((p) => ({
    url: `${baseUrl}/payslip-generator/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8, 
  }));

  // --- Dynamic Quotation Pages (NEW) ---
  const quotePages = quoteProfessions.map((p) => ({
    url: `${baseUrl}/quotation-generator/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8, 
  }));

  // --- Static Pages ---
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 1.0 },
    
    // Invoice Tools
    { url: `${baseUrl}/invoice-generator`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/invoice-generator/create`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
    
    // Payslip Tools
    { url: `${baseUrl}/payslip-generator`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/payslip-generator/create`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
    
    // Quotation Tools
    { url: `${baseUrl}/quotation-generator`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/quotation-generator/create`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 }, // Added this
    
    // Calculators
    { url: `${baseUrl}/loan-calculator`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/profit-margin-calculator`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.7 },
    
    // Company / Info
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/blogs`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // --- Combine All ---
  return [
    ...staticPages,
    ...invoicePages,
    ...payslipPages,
    ...quotePages, // Added here
    ...blogPosts
  ];
}