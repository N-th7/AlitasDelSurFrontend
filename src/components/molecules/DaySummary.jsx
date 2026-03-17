import SectionTitle from "../Atoms/SectionTitle";

export default function DaySummary({ stats }) {
  return (
    <div className="bg-[#6A452E] text-white p-6 rounded-xl shadow mt-8">
      <SectionTitle title="Resumen del Día" />

      <div className="grid grid-cols-2 gap-4 mt-4">

        <p>Total de Pedidos:</p>
        <p>{stats.totalOrders}</p>

        <p>Pedidos Entregados:</p>
        <p className="text-green-400">{stats.deliveredOrders}</p>

        <p>Pedidos Cancelados:</p>
        <p className="text-red-400">{stats.cancelledOrders}</p>

        <p>Ventas en Efectivo:</p>
        <p>{stats.cashTotal.toFixed(2)} Bs</p>

        <p>Ventas por QR:</p>
        <p>{stats.qrTotal.toFixed(2)} Bs</p>
      </div>

      <div className="text-right text-3xl font-bold mt-4">
        TOTAL VENTAS: {stats.totalSales.toFixed(2)} Bs
      </div>
    </div>
  );
}
