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
  try {
    // Intentar con el backend principal primero
    const res = await api.post("/print", orderData);
    return res.data;
  } catch (primaryError) {
    console.log('⚠️ Backend principal no disponible, intentando servidor local...');
    
    try {
      // Fallback al servidor local de desarrollo
      const localResponse = await fetch('http://localhost:3001/print', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (!localResponse.ok) {
        throw new Error(`Error del servidor local: ${localResponse.status}`);
      }
      
      const localData = await localResponse.json();
      console.log('✅ Impresión exitosa usando servidor local');
      
      return {
        ...localData,
        method: 'local-dev-server',
        fallback: true
      };
      
    } catch (localError) {
      console.error('❌ Error en ambos servidores:', {
        primary: primaryError.message,
        local: localError.message
      });
      
      // Retornar el error original del backend principal
      throw primaryError;
    }
  }
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

// 🖨️ SERVICIOS DE COLA DE IMPRESIÓN
export const getPrintQueueStatus = async (queueId) => {
  try {
    const res = await api.get(`/print/queue/status/${queueId}`);
    return res.data;
  } catch (err) {
    console.error("Error obteniendo estado de cola:", err);
    throw err;
  }
};

// 🖨️ SERVICIOS DE COLA DE IMPRESIÓN
export const getPrintQueueStatus = async (queueId) => {
  try {
    const res = await api.get(`/print/queue/status/${queueId}`);
    return res.data;
  } catch (err) {
    console.error("Error obteniendo estado de cola:", err);
    throw err;
  }
};

export const getPrintQueue = async (status = 'all', limit = 20) => {
  try {
    const res = await api.get(`/print/queue?status=${status}&limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error("Error obteniendo cola de impresión:", err);
    throw err;
  }
};

// 🧪 FUNCIÓN PARA PROBAR IMPRESORA (SOLO DESARROLLO)
export const testPrinter = async () => {
  try {
    const response = await fetch('http://localhost:3001/test-printer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Prueba de impresora exitosa');
    return data;
    
  } catch (error) {
    console.error('❌ Error probando impresora:', error.message);
    throw error;
  }
};

// 🔍 FUNCIÓN PARA VERIFICAR SERVIDOR LOCAL
export const checkLocalServer = async () => {
  try {
    const response = await fetch('http://localhost:3001/test', {
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error(`Servidor no disponible: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      available: true,
      ...data
    };
    
  } catch (error) {
    return {
      available: false,
      error: error.message
    };
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
