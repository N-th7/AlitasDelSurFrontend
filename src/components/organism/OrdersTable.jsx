import OrderRow from "../molecules/OrderRow";

export default function OrdersTable({ orders, onStatusChange, onReprint }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Pedidos del día</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">N°</th>
            <th className="px-4 py-2">Productos</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Cambiar</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onStatusChange={onStatusChange}
              onReprint={onReprint}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
