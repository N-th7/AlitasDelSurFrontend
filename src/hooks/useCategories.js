import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);


  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      setErrorCategories(error);
    } finally {
      setLoadingCategories(false);
    }
  };


  const addCategory = async (newCategory) => {
    try {
      const response = await createCategory(newCategory);
      setCategories((prev) => [...prev, response]);
      return response;
    } catch (error) {
      console.error("Error al crear categoría:", error);
      throw error;
    }
  };


  const editCategory = async (id, updatedData) => {
    try {
      const response = await updateCategory(id, updatedData);
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...response } : c))
      );
      return response;
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      throw error;
    }
  };


  const removeCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loadingCategories,
    errorCategories,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
  };
};
