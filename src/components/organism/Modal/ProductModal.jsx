import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../../Atoms/Button";

const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  product = null,
  categories = [],
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        categoryId: product.productCategory?.id || product.categoryId || "",
      });
    } else {
      setFormData({
        name: "",
        price: "",
        categoryId: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          {product ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del producto
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Ej. Pollo BBQ"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio (Bs)
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Ej. 22.50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              text="Cancelar"
              variant="primary"
              className="bg-red-600 hover:bg-red-700"
              onClick={onClose}
            />
            <Button
              text={product ? "Actualizar" : "Crear"}
              variant="primary"
              type="submit"
              className="bg-green-600 hover:bg-green-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
