import { allBlogs } from '../blogdata'; // Check this import path!

export default function sitemap() {
  // 1. Get all blog post URLs
  const blogPosts = allBlogs.map((post) => ({
    url: `https://smoothledger.com/blogs/${post.slug}`, // IMPORTANT: Change this domain
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 2. Define all your static tool/company pages
  const staticPages = [
    { url: 'https://smoothledger.com/', lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://smoothledger.com/invoice-generator', lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://smoothledger.com/payslip-generator', lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://smoothledger.com/quotation-generator', lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.9 },
     { url: 'https://smoothledger.com/loan-calculator', lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.7 },
     { url: 'https://smoothledger.com/profit-margin-calculator', lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://smoothledger.com/about', lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.5 },
    { url: 'https://smoothledger.com/contact', lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.5 },
    { url: 'https://smoothledger.com/blogs', lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://smoothledger.com/privacy-policy', lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://smoothledger.com/terms-of-service', lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // 3. Combine them and return
  return [
    ...staticPages,
    ...blogPosts
  ];
}