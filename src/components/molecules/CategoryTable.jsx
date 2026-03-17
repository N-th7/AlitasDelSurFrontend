import React from "react";
import IconButton from "../Atoms/IconButton";
import { PencilIcon, TrashIcon } from "lucide-react";

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0)
    return <p className="text-gray-500 italic">No hay categorías registradas.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-2xl bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2 text-center flex justify-end gap-3">
                <IconButton
                  icon={PencilIcon}
                  color="text-blue-600 hover:text-blue-800"
                  title="Editar"
                  onClick={() => onEdit(category)}
                />
                <IconButton
                  icon={TrashIcon}
                  color="text-red-600 hover:text-red-800"
                  title="Eliminar"
                  onClick={() => onDelete(category.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
