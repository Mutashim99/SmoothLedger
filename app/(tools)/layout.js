// app/(tools)/layout.js
import { ModernNavbar } from "@/app/components/ModernNavbar";
import { ModernFooter } from "@/app/components/ModernFooter";

export default function ToolsLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ModernNavbar />
      <main className="flex-grow">{children}</main>
      <ModernFooter />
    </div>
  );
}