import OrderItem from "../molecules/OrderItem";

const OrderSummary = ({ items, total, onQtyChange, onDelete, onSauceChange }) => (
  <div className="bg-[#ECBA79] rounded-xl p-6 w-full min-h-full flex flex-col relative">
    
    <div className="flex-1 overflow-y-auto pr-2">
      {items.map((item, index) => (
        <OrderItem
          key={index}
          index={index}
          item={item}
          onQuantityChange={(qty) => onQtyChange(index, qty)}
          onDelete={() => onDelete(index)}
          onSauceChange={(i, sauce) => onSauceChange(i, sauce)}
        />
      ))}
    </div>

    <div className="w-full p-4 bg-[#ECBA79] border-t border-black grid grid-cols-2 font-bold mt-2">
      <p>TOTAL</p>
      <span>{total} Bs</span>
    </div>
  </div>
);


export default OrderSummary;
