import HomePageClient from "@/app/components/HomePageClient";
import FooterSEO from "@/app/components/FooterSEO"; // Ensure path is correct
// Optimized Metadata for Home Page
export const metadata = {
  title: "Free Financial Tools for Freelancers & Small Business | SmoothLedger",
  description:
    "The ultimate free financial toolbox. Create professional invoices, payslips, and quotes in seconds. Calculate loans and profit margins. No signup required.",
  keywords: [
    "free financial tools",
    "invoice generator",
    "payslip maker",
    "quotation generator",
    "loan calculator",
    "profit margin calculator",
    "freelance tools",
    "small business finance tools",
    "no signup invoice",
    "pdf generator tools",
  ],
  openGraph: {
    title: "Free Financial Tools for Freelancers | SmoothLedger",
    description:
      "Create professional invoices, payslips, and quotes in seconds. 100% free, no signups, no login required.",
    url: "https://smoothledger.com",
    siteName: "SmoothLedger",
    images: [
      {
        url: "https://smoothledger.com/SLlogo1.png",
        width: 1200,
        height: 630,
        alt: "SmoothLedger Financial Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  const faqs = [
    {
      question: "What's the catch? Are these tools really 100% free?",
      answer:
        "Yes, 100%. This is not a 'free trial.' Our tools are completely free to use, with no signups, no feature paywalls, and no watermarks on your final documents. You can create, download, and save as many documents as you like.",
    },
    {
      question: "How does SmoothLedger make money if everything is free?",
      answer:
        "Our free tools are our 'traffic engine' and our way of building trust. Our business plan is to launch an *optional*, premium **SmoothLedger Dashboard** in the future. This will be a paid product for users who need advanced features like cloud-syncing across devices, team collaboration, and tracking payments. The standalone tools you see today will always remain free.",
    },
    {
      question: "Do I need to create an account or sign up?",
      answer:
        "No. Our motto is 'No signups. No fees.' You can use every tool on this site instantly. We don't ask for your email or any personal information. Your privacy comes first.",
    },
    {
      question: "Is my financial data safe and private?",
      answer:
        "Yes, it is 100% private. All the data you enter (your company name, your client's details, your income) **never leaves your computer**. Everything is processed directly in your browser. We do not have a database to store or see your financial information, which also makes our tools incredibly fast.",
    },
    {
      question: "What is the 'Save' feature? Where does my data go?",
      answer:
        "When you use 'Save My Details' or 'Save Invoice', you are saving your data to your browser's **Local Storage**. This is a secure storage space on your own computer. It's private to you and allows you to load your data instantly the next time you visit, all without needing an account. Clearing your browser cache will erase this data.",
    },
    {
      question: "Can I customize my invoice? Can I add my logo?",
      answer:
        "Absolutely. You can (and should!) add your own company logo. You can also choose from 5 different professional templates, change the brand accent color, and select your preferred font and font size. All customization features are completely free.",
    },
    {
      question: "What format do I get? Can I download a PDF?",
      answer:
        "Yes. All our document generators (Invoice, Payslip, and Quotation) export a high-quality, print-ready PDF file. You can instantly download it to your device and send it to your client or employee.",
    },
    {
      question: "How does the 'Reverse' Profit Margin Calculator work?",
      answer:
        "Our Profit Margin Calculator has two modes. In 'Standard Mode,' you enter your Cost and Sale Price to find your profit margin. In 'Reverse Mode,' you enter your Cost and your *desired* margin (e.g., 40%), and it will instantly calculate the exact Sale Price you need to charge to hit that target. It's perfect for pricing new products.",
    },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SmoothLedger",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online invoice and payslip generator suite. No login required.",
    featureList:
      "Invoice Generator, Payslip Creator, Quotation Generator, Loan Calculator, Profit Margin Calculator",
    softwareRequirements: "Modern Web Browser",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1500",
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient />
      {/* This creates a powerful SEO "Hub" on your homepage 
          that links directly to every deep page on your site. */}
      <FooterSEO />
    </>
  );
}
