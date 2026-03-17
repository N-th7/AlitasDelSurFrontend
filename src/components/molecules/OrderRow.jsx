import StatusBadge from "../Atoms/StatusBadge";
import StatusSelector from "../Atoms/StatusSelector";
import Button from "../Atoms/Button";

export default function OrderRow({ order, onStatusChange, onReprint }) {
  return (
    <tr className="border-b">
      <td className="px-4 py-2 font-bold text-lg">#{order.numberOrder}</td>

      <td className="px-4 py-2">
        {order.orderItems.map((p) => (
          <div key={p.productId}>
            {p.quantity}× {p.name}
          </div>
        ))}
      </td>

      <td className="px-4 py-2">
        <div className="capitalize font-semibold">{order.orderType}</div>

        {order.customerName && (
          <div className="text-sm text-gray-500">
            {order.customerName} — {order.customerPhone}
          </div>
        )}
      </td>
      <td className="px-4 py-2 font-bold">{order.totalPrice} Bs</td>

      <td className="px-4 py-2">
        <StatusBadge status={order.status} />
      </td>

      <td className="px-4 py-2">
        <StatusSelector
          value={order.status}
          onChange={(newStatus) => onStatusChange(order.id, newStatus)}
        />
      </td>

      <td className="px-4 py-2">
        <Button
          text="Reimprimir"
          className="bg-[#664631] hover:bg-[#d89264] text-white px-3 py-1 rounded"
          onClick={() => onReprint(order)}
        />
      </td>
    </tr>
  );
}
