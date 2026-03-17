import api from "./api";

export const getCategories = async () => {
  try {
    const response = await api.get("/productCategories");
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};


export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/productCategories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la categoría con id ${id}:`, error);
    throw error;
  }
};


export const createCategory = async (category) => {
  try {
    const response = await api.post("/productCategories", category);
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};


export const updateCategory = async (id, updatedData) => {
  try {
    const response = await api.put(`/productCategories/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la categoría con id ${id}:`, error);
    throw error;
  }
};


export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/productCategories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la categoría con id ${id}:`, error);
    throw error;
  }
};
