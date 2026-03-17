import React from "react";
import ProductTable from "../molecules/ProductTable";

export default function CategorySection({ category, onEdit, onDelete }) {
  return (
    <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
        {category.name}
      </h2>
      <ProductTable
        products={category.items}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
