const OrderTypeSelector = ({ orderType, setOrderType }) => (
  <div className="space-y-1">
    <label className="font-bold">Tipo de pedido:</label>
    <select
      className="w-full p-2 border rounded"
      value={orderType || ""}
      onChange={(e) => setOrderType(e.target.value)}
    >
      <option value="">Seleccione...</option>
      <option value="mesa">Mesa</option>
      <option value="llevar">Llevar</option>
      <option value="pedido/mesa">Pedido / Mesa</option>
      <option value="pedido/llevar">Pedido / Llevar</option>
      <option value="delivery">Delivery</option>
    </select>
  </div>
);

export default OrderTypeSelector;
