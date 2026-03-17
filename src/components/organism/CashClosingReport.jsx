import StatsGrid from "../molecules/StatsGrid";
import ProductSalesTable from "../molecules/ProductSalesTable";
import CashierSalesTable from "../molecules/CashierSalesTable";
import DaySummary from "../molecules/DaySummary";

export default function CierreCajaView({ stats }) {
  return (
    <div className="px-6 py-0">
      <StatsGrid stats={stats} />
      <ProductSalesTable data={stats.productSales} />
      <CashierSalesTable data={stats.cashierSales} />
      <DaySummary stats={stats} />
    </div>
  );
}
