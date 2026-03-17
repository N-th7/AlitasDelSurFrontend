import React from "react";
import IconButton from "../Atoms/IconButton";
import { PencilIcon, TrashIcon } from "lucide-react";

export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0)
    return <p className="text-gray-500 italic">Sin productos registrados.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-2xl">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Precio (Bs)</th>
            <th className="px-4 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.price}</td>

              <td className="px-4 py-2 text-center flex justify-end gap-3">
                <IconButton
                  icon={PencilIcon}
                  color="text-blue-600 hover:text-blue-800"
                  title="Editar"
                  onClick={() => onEdit(product)}
                />
                <IconButton
                  icon={TrashIcon}
                  color="text-red-600 hover:text-red-800"
                  title="Eliminar"
                  onClick={() => onDelete(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
