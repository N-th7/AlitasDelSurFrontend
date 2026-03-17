import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import ProductModal from "../components/organism/Modal/ProductModal";
import ToastMessage from "../components/Atoms/ToastMessage";
import CategorySection from "../components/organism/CategorySection";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { Link, NavLink } from 'react-router-dom';

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState(null);

  const {
    products,
    addProduct,
    editProduct,
    removeProduct,
    loadingProducts,
  } = useProducts();
  const { categories, loadingCategories } = useCategories();

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás segura/o de eliminar este producto?")) {
      await removeProduct(id);
      showMessage("Producto eliminado con éxito.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await editProduct(editingProduct.id, formData);
        showMessage("Producto editado con éxito.");
      } else {
        await addProduct(formData);
        showMessage("Producto creado con éxito.");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  if (loadingProducts || loadingCategories) {
    return <p className="text-center mt-10">Cargando productos...</p>;
  }

  const groupedProducts = categories.map((category) => ({
    ...category,
    items: products.filter(
      (p) => p.productCategory?.name === category.name
    ),
  }));

  return (
    <div className="p-6 max-w-5xl mx-auto relative">
      <ToastMessage message={message} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Productos</h1>

        <div className="grid grid-flow-col gap-3">
          <Link to="/categorias">
            <button
              className="bg-[#664631] text-white px-4 py-2 rounded-lg hover:bg-[#a66b43] flex items-center gap-2"
            >
              Administrar categorias
            </button>
          </Link>
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <PlusIcon size={20} />
            Nuevo Producto
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {groupedProducts.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        product={editingProduct}
        categories={categories}
      />
    </div>
  );
};

export default ProductsPage;
