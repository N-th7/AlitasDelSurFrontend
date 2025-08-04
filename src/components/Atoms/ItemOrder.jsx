import { useEffect, useState } from "react";

const ItemOrder = ({ price, quantity, onQuantityChange, deleteItem }) => {
  const [localQty, setLocalQty] = useState(quantity);

  useEffect(() => {
    onQuantityChange(localQty); // notifica al padre al cambiar
  }, [localQty]);

  return (
    <div className="flex items-center gap-3 border border-black bg-white p-2 rounded">
      {/* Quantity Selector */}
      <div className="flex flex-col border border-black rounded w-14 h-10 items-center justify-center">
        <input
          type="number"
          min="1"
          value={localQty}
          onChange={(e) => setLocalQty(Number(e.target.value))}
          className="w-full text-center bg-transparent border-none outline-none"
        />
      </div>

      {/* Checkbox-like Radio Buttons */}
      <div className="flex gap-2">
        {["B", "P", "M", "Br"].map((type) => (
          <label key={type} className="flex items-center gap-1">
            <input type="checkbox" name="type" />
            <span>{type}</span>
          </label>
        ))}
      </div>

      <label className="flex items-center gap-1 ml-2">
        <input type="checkbox" />
        <span>S/A</span>
      </label>

      {/* Price Display */}
      <div className="ml-auto border border-black px-2 py-1 rounded bg-white text-black">
        {price * localQty} Bs
      </div>

      {/* Delete Button */}
      <button className="text-red-600 text-lg font-bold px-1" onClick={deleteItem}>✕</button>
    </div>
  );
};

export default ItemOrder;
