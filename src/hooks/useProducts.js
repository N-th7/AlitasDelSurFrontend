import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productService";


export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setErrorProducts(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await createProduct(newProduct);
      setProducts((prev) => [...prev, response]); // actualiza estado
      return response;
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  };

  const editProduct = async (id, updatedData) => {
    try {
      const response = await updateProduct(id, updatedData);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...response } : p))
      );
      return response;
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loadingProducts,
    errorProducts,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
};
