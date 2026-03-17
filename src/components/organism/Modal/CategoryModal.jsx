import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../../Atoms/Button";

const CategoryModal = ({ isOpen, onClose, onSubmit, category }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName("");
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {category ? "Editar Categoría" : "Nueva Categoría"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Nombre de la categoría
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3">
            <Button
              text="Cancelar"
              variant="primary"
              className="bg-red-600 hover:bg-red-700"
              onClick={onClose}
            />
            <Button
              text={category ? "Actualizar" : "Crear"}
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

export default CategoryModal;
