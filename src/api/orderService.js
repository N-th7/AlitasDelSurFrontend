import api from "./api";

// � CONFIGURACIÓN DE SERVIDOR DE IMPRESIÓN - RED LOCAL
const PRINT_SERVER_URL = process.env.REACT_APP_PRINT_SERVER_URL || 'http://192.168.100.7:3001';

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
    // Intentar backend principal primero
    const res = await api.post("/print", orderData);
    return res.data;
  } catch (primaryError) {
    console.log('⚠️ Backend principal no disponible, usando servidor de impresión...');
    
    try {
      // Fallback al servidor de impresión (ngrok o local)
      const printResponse = await fetch(`${PRINT_SERVER_URL}/print`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (!printResponse.ok) {
        throw new Error(`Error servidor impresión: ${printResponse.status}`);
      }
      
      const data = await printResponse.json();
      console.log('✅ Impresión exitosa via servidor de impresión');
      
      return {
        ...data,
        method: 'print-server',
        fallback: true
      };
      
    } catch (printError) {
      console.error('❌ Error en ambos servidores:', {
        primary: primaryError.message,
        print: printError.message
      });
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

export const getPrintQueue = async (status = 'all', limit = 20) => {
  try {
    const res = await api.get(`/print/queue?status=${status}&limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error("Error obteniendo cola de impresión:", err);
    throw err;
  }
};

// 🧪 FUNCIONES DE PRUEBA PARA SERVIDOR DE IMPRESIÓN
export const testPrinter = async () => {
  try {
    const response = await fetch(`${PRINT_SERVER_URL}/test-printer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Prueba de impresora exitosa via', PRINT_SERVER_URL);
    return data;
    
  } catch (error) {
    console.error('❌ Error probando impresora:', error.message);
    throw error;
  }
};

export const checkLocalServer = async () => {
  try {
    const response = await fetch(`${PRINT_SERVER_URL}/test`, {
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error(`Servidor no disponible: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      available: true,
      url: PRINT_SERVER_URL,
      ...data
    };
    
  } catch (error) {
    return {
      available: false,
      url: PRINT_SERVER_URL,
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
