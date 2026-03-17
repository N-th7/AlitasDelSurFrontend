import StatCard from "../Atoms/StatCard";
import { DollarSign , ChartLineIcon, HandCoins , QrCodeIcon } from "lucide-react"
export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <StatCard 
        icon={<DollarSign />} 
        title="Total Ventas" 
        value={`${stats.totalSales.toFixed(2)} Bs`}
        subtitle={`${stats.delivered} pedidos entregados`}
      />

      <StatCard 
        icon={<ChartLineIcon />} 
        title="Pedidos" 
        value={stats.totalOrders} 
        subtitle="Total del día"
      />

      <StatCard 
        icon={<HandCoins />} 
        title="Efectivo" 
        value={`${stats.cashTotal.toFixed(2)} Bs`}
        subtitle="Pago en efectivo"
      />

      <StatCard 
        icon={<QrCodeIcon />} 
        title="QR" 
        value={`${stats.qrTotal.toFixed(2)} Bs`}
        subtitle="Pago por QR"
      />
    </div>
  );
}
