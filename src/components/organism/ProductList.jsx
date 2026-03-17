import MenuCard from "../molecules/MenuCard";

const ProductList = ({ title, products, onAdd }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold mb-3">{title}</h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-6 gap-3">
      {products.map((p) => (
        <MenuCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  </div>
);

export default ProductList;
