import api from "./api";

// � CONFIGURACIÓN SIMPLE - SIEMPRE RED LOCAL
// Usar servidor local directo (sin detección automática)
const PRINT_SERVER_URL = 'http://192.168.100.7:3001';

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
  console.log('🖨️ Iniciando impresión...', { 
    serverUrl: PRINT_SERVER_URL 
  });

  try {
    // Intentar backend principal primero
    const res = await api.post("/print", orderData);
    console.log('✅ Impresión exitosa via backend principal');
    
    // 🌐 MANEJAR RESPUESTA HTML PARA HOSTINGER
    const result = res.data;
    if (result.success && result.printUrl) {
      console.log('📞 HTML generado para impresión:', result.printUrl);
      
      // Abrir HTML en nueva ventana para impresión
      const printWindow = window.open(result.printUrl, '_blank', 
        'width=400,height=600,scrollbars=yes,resizable=yes');
        
      if (printWindow) {
        console.log('✅ Ventana de impresión abierta correctamente');
      } else {
        console.warn('⚠️ Popup bloqueado, abriendo en misma pestaña');
        window.open(result.printUrl, '_blank');
      }
    }
    
    return result;
    
  } catch (primaryError) {
    console.log('⚠️ Backend principal no disponible:', primaryError.message);
    console.log('🔄 Usando servidor de impresión local:', PRINT_SERVER_URL);
    
    try {
      // Fallback al servidor local SIEMPRE
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
      console.log('✅ Impresión exitosa via servidor local');
      
      return {
        ...data,
        method: 'local-server',
        fallback: true
      };
      
    } catch (printError) {
      console.error('❌ Error en servidor local:', printError.message);
      throw new Error(`No se pudo conectar al servidor de impresión local (${PRINT_SERVER_URL}). Verifica que esté ejecutándose y que estés en la red WiFi del restaurante.`);
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
  console.log('🧪 Probando impresora...', { 
    url: PRINT_SERVER_URL 
  });
  
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
    return {
      ...data,
      serverUrl: PRINT_SERVER_URL
    };
    
  } catch (error) {
    console.error('❌ Error probando impresora:', error.message);
    throw new Error(`No se pudo conectar al servidor de impresión local (${PRINT_SERVER_URL}). Verifica que esté ejecutándose y que estés en la red WiFi del restaurante.`);
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
  console.log('🔄 Reimprimiendo orden...', { 
    orderNumber: order.orderNumber || order.id,
    serverUrl: PRINT_SERVER_URL
  });
  
  try {
    // Intentar backend principal primero
    const res = await api.post("/print", order);
    console.log('✅ Reimpresión exitosa via backend principal');
    
    // 🌐 MANEJAR RESPUESTA HTML PARA HOSTINGER
    const result = res.data;
    if (result.success && result.printUrl) {
      console.log('📞 HTML generado para reimpresión:', result.printUrl);
      
      // Abrir HTML en nueva ventana para impresión
      const printWindow = window.open(result.printUrl, '_blank', 
        'width=400,height=600,scrollbars=yes,resizable=yes');
        
      if (printWindow) {
        console.log('✅ Ventana de reimpresión abierta correctamente');
      } else {
        console.warn('⚠️ Popup bloqueado, abriendo en misma pestaña');
        window.open(result.printUrl, '_blank');
      }
    }
    
    return result;
    
  } catch (primaryError) {
    console.log('⚠️ Backend principal no disponible para reimpresión:', primaryError.message);
    console.log('🔄 Usando servidor de impresión local:', PRINT_SERVER_URL);
    
    try {
      const printResponse = await fetch(`${PRINT_SERVER_URL}/print`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
      });
      
      if (!printResponse.ok) {
        throw new Error(`Error servidor impresión: ${printResponse.status}`);
      }
      
      const data = await printResponse.json();
      console.log('✅ Reimpresión exitosa via servidor local');
      return {
        ...data,
        method: 'local-server',
        fallback: true
      };
      
    } catch (printError) {
      console.error('❌ Error reimprimiendo:', printError.message);
      throw new Error(`No se pudo conectar al servidor de impresión local. Verifica que esté ejecutándose.`);
    }
  }
};
