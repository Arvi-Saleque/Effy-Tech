import FinanceNav from "@/components/admin/finance/FinanceNav";

export default function FinanceLayout({ children }) {
  return (
    <div className="space-y-6">
      <FinanceNav />
      {children}
    </div>
  );
}

