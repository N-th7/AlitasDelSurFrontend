import api from "./api"; 
 
export const getProducts = async () => { 
  try { 
 const response = await api.get("/products"); 
 return response.data; 
  } catch (error) { 
 console.error("Error al obtener productos", error); 
 return []; 
  } 
};