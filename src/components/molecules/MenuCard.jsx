const MenuCard = ({ product, onAdd }) => (
  <button
    className="bg-white rounded-xl p-4 shadow hover:scale-105 transition"
    onClick={() => onAdd(product)}
  >
    <p className="text-lg font-bold">{product.name}</p>
    <p>{product.price} Bs.</p>
  </button>
);

export default MenuCard;
