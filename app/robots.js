// Note: This must be a .js file, not .txt, in the app router

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Add this line if you want to block your /admin page:
      // disallow: '/admin/', 
    },
    // IMPORTANT: Change this to your real, final domain name
    sitemap: 'https://smoothledger.com/sitemap.xml', 
  };
}