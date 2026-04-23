import api from "./api";

// 🌐 CONFIGURACIÓN INTELIGENTE DE IMPRESIÓN
const detectNetworkAndGetPrintUrl = () => {
  const hostname = window.location.hostname;
  const isLocalNetwork = hostname.includes('192.168.') || hostname.includes('localhost') || hostname === '127.0.0.1';
  
  if (isLocalNetwork) {
    // Usuario en red local - usar servidor local directo
    return 'http://192.168.100.7:3001';
  } else {
    // Usuario remoto (Hostinger) - necesita ngrok o servidor remoto
    return process.env.REACT_APP_PRINT_SERVER_URL || null;
  }
};

// 🔍 Detectar si estamos en red local o remota
const isInLocalNetwork = () => {
  const hostname = window.location.hostname;
  return hostname.includes('192.168.') || hostname.includes('localhost') || hostname === '127.0.0.1';
};

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
    hostname: window.location.hostname,
    isLocal: isInLocalNetwork() 
  });

  try {
    // Intentar backend principal primero
    const res = await api.post("/print", orderData);
    console.log('✅ Impresión exitosa via backend principal');
    return res.data;
  } catch (primaryError) {
    console.log('⚠️ Backend principal no disponible:', primaryError.message);
    
    // Determinar URL de servidor de impresión según la red
    const printServerUrl = detectNetworkAndGetPrintUrl();
    
    if (!printServerUrl) {
      // Usuario remoto sin configuración de servidor remoto
      console.error('❌ Acceso remoto detectado pero no hay servidor de impresión configurado');
      throw new Error('Para imprimir desde ubicaciones remotas, necesitas configurar ngrok o acceder desde la red local del restaurante.');
    }
    
    console.log('🔄 Usando servidor de impresión:', printServerUrl);
    
    try {
      // Fallback al servidor de impresión apropiado
      const printResponse = await fetch(`${printServerUrl}/print`, {
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
        fallback: true,
        networkType: isInLocalNetwork() ? 'local' : 'remote'
      };
      
    } catch (printError) {
      console.error('❌ Error en servidor de impresión:', printError.message);
      
      // Mensaje específico según el tipo de red
      if (isInLocalNetwork()) {
        throw new Error('Error conectando con servidor de impresión local. Verifica que esté ejecutándose en puerto 3001.');
      } else {
        throw new Error('Error conectando con servidor de impresión remoto. Verifica la configuración de ngrok.');
      }
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
  const printServerUrl = detectNetworkAndGetPrintUrl();
  
  if (!printServerUrl) {
    throw new Error('No hay servidor de impresión disponible para tu ubicación. Accede desde la red local del restaurante o configura acceso remoto.');
  }
  
  console.log('🧪 Probando impresora...', { 
    url: printServerUrl,
    isLocal: isInLocalNetwork() 
  });
  
  try {
    const response = await fetch(`${printServerUrl}/test-printer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Prueba de impresora exitosa via', printServerUrl);
    return {
      ...data,
      networkType: isInLocalNetwork() ? 'local' : 'remote',
      serverUrl: printServerUrl
    };
    
  } catch (error) {
    console.error('❌ Error probando impresora:', error.message);
    throw error;
  }
};

export const checkLocalServer = async () => {
  const printServerUrl = detectNetworkAndGetPrintUrl();
  
  if (!printServerUrl) {
    return {
      available: false,
      url: null,
      error: 'No hay servidor de impresión disponible para tu ubicación',
      networkType: isInLocalNetwork() ? 'local' : 'remote'
    };
  }
  
  try {
    const response = await fetch(`${printServerUrl}/test`, {
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error(`Servidor no disponible: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      available: true,
      url: printServerUrl,
      networkType: isInLocalNetwork() ? 'local' : 'remote',
      ...data
    };
    
  } catch (error) {
    return {
      available: false,
      url: printServerUrl,
      error: error.message,
      networkType: isInLocalNetwork() ? 'local' : 'remote'
    };
  }
};

export const reprintOrder = async (order) => {
  console.log('🔄 Reimprimiendo orden...', { 
    orderNumber: order.orderNumber || order.id,
    isLocal: isInLocalNetwork() 
  });
  
  try {
    // Intentar backend principal primero
    const res = await api.post("/print", order);
    console.log('✅ Reimpresión exitosa via backend principal');
    return res.data;
  } catch (primaryError) {
    console.log('⚠️ Backend principal no disponible para reimpresión:', primaryError.message);
    
    // Usar misma lógica que printOrder
    const printServerUrl = detectNetworkAndGetPrintUrl();
    
    if (!printServerUrl) {
      throw new Error('Para reimprimir desde ubicaciones remotas, necesitas configurar ngrok o acceder desde la red local del restaurante.');
    }
    
    try {
      const printResponse = await fetch(`${printServerUrl}/print`, {
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
      console.log('✅ Reimpresión exitosa via servidor de impresión');
      return {
        ...data,
        method: 'print-server',
        fallback: true,
        networkType: isInLocalNetwork() ? 'local' : 'remote'
      };
      
    } catch (printError) {
      console.error('❌ Error reimprimiendo:', printError.message);
      throw printError;
    }
  }
};
