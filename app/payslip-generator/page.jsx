
import PayslipGeneratorClient from "../components/PayslipGeneratorClient";

export const metadata = {
  title: "Free Payslip Generator | Create Employee Pay Stubs",
  description:
    "Easily create accurate, professional PDF payslips for your employees. 100% free, no sign-up. Calculates earnings, deductions, and net pay instantly.",
};

// --- Payslip Generator Page ---
export default function PayslipGeneratorPage() {
  return <PayslipGeneratorClient />;
}
