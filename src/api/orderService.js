import api from "./api"; 
 
export const getOrders = async () => { 
  try { 
 const response = await api.get("/orders"); 
 return response.data; 
  } catch (error) { 
 console.error("Error al obtener ordenes", error); 
 return []; 
  } 
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error al crear orden", error);
    throw error; // Propagate the error for further handling
  }
}