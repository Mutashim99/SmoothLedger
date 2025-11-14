/* File: app/invoice-generator/page.jsx */

import InvoiceGeneratorClient from "../components/InvoiceGeneratorClient";

export const metadata = {
  title: "Free Invoice Generator | Create Professional PDF Invoices",
  description:
    "Generate beautiful, professional PDF invoices in seconds. 100% free, no watermarks, and no sign-up required. Customize templates, add your logo, and download.",
};

// --- Invoice Generator Page ---
export default function InvoiceGeneratorPage() {
  return <InvoiceGeneratorClient />;
}
