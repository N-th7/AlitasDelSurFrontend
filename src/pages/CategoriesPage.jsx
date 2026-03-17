// src/pages/CategoriesPage.jsx
import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import ToastMessage from "../components/Atoms/ToastMessage";
import CategoryModal from "../components/organism/Modal/CategoryModal";
import CategoryTable from "../components/molecules/CategoryTable";
import { useCategories } from "../hooks/useCategories";

const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [message, setMessage] = useState(null);

  const {
    categories,
    addCategory,
    editCategory,
    removeCategory,
    loadingCategories,
  } = useCategories();

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar esta categoría?")) {
      await removeCategory(id);
      showMessage("🗑️ Categoría eliminada con éxito.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingCategory) {
        await editCategory(editingCategory.id, formData);
        showMessage("✏️ Categoría actualizada con éxito.");
      } else {
        await addCategory(formData);
        showMessage("🆕 Categoría creada con éxito.");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar categoría:", error);
    }
  };

  if (loadingCategories) {
    return <p className="text-center mt-10">Cargando categorías...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <ToastMessage message={message} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <PlusIcon size={20} />
          Nueva Categoría
        </button>
      </div>

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        category={editingCategory}
      />
    </div>
  );
};

export default CategoriesPage;
