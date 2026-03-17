import api from "./api";

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  try {
    const res = await api.put(`/orders/${id}/status`, { status });
    return res.data;
  } catch (e) {
    console.error("Error actualizando estado", e);
    throw e;
  }
};
export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};
export const getTodayOrders = async () => {
  const res = await api.get("/orderstoday");
  return res.data;
};

export const getOrdersByDate = async (date) => {
  const res = await api.get(`/orders/date/${date}`);
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};    

export const printOrder = async (orderData) => {
  const res = await api.post("/print", orderData);
  return res.data;
};

export const printClosingReport = async (reportData) => {
  try {
    const res = await api.post("/print/report", reportData);
    return res.data;
  } catch (err) {
    console.error("Error imprimiendo reporte de cierre:", err);
    throw err;
  }
};

export const reprintOrder = async (order) => {
  try {
    const res = await api.post("/print", order);
    return res.data;
  } catch (err) {
    console.error("Error reimprimiendo:", err);
    throw err;
  }
};
