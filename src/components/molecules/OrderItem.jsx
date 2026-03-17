import SauceSelector from "../molecules/SauceSelector";
import { TrashIcon } from "lucide-react";
import IconButton from "../Atoms/IconButton";

const OrderItem = ({ item, index, onQuantityChange, onDelete, onSauceChange }) => {
  const isSpecial =
    item.productCategory?.name === "Alitas" ||
    item.productCategory?.name === "Costillas";

  return (
    <div className="py-3 border-b border-black/20">
      <div className="flex justify-between items-center">
        <p>{item.name}</p>

        <div className="flex items-center gap-2">
          <input
            type="number"
            className="w-16 text-center rounded"
            value={item.quantity}
            min={1}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
          />
          <span>{item.price * item.quantity} Bs</span>
                          <IconButton
                  icon={TrashIcon}
                  color="text-red-600 hover:text-red-800"
                  title="Eliminar"
                  onClick={onDelete}
                />
        </div>
      </div>

      {isSpecial && (
        <SauceSelector
          sauces={item.sauces || []}
          onChange={(sauce) => onSauceChange(index, sauce)}
        />
      )}
    </div>
  );
};

export default OrderItem;
