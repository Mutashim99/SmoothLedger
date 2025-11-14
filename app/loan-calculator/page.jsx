import LoanClient from "../components/LoanClient";

export const metadata = {
  title: "Free Loan Amortization Calculator | SmoothLedger",
  description:
    "Calculate your monthly loan payments, total interest, and see a full amortization schedule. Our free loan calculator makes complex loan details simple.",
};

export default function LoanCalculatorPage() {
  return <LoanClient />;
}
