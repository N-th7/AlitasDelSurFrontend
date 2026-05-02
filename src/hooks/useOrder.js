import { useState } from "react";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  reprintOrder,
  getTodayOrders,
  getOrdersByDate,
  printClosingReport
} from "../api/orderService";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // Función helper para asegurar que todas las órdenes tengan status válido
  const processOrdersWithStatus = (orders) => {
    return orders.map(order => ({
      ...order,
      status: order.status || 'pendiente', // Asegurar status por defecto
    }));
  };

  const sendOrder = async (orderData) => {
    try {
      setLoading(true);
      const savedOrder = await createOrder(orderData);
      
      // 🖨️ MANEJAR AUTO-IMPRESIÓN CON HTML
      if (savedOrder.printInfo && savedOrder.printInfo.success && savedOrder.printInfo.printUrl) {
        console.log('🖨️ Auto-abriendo HTML de impresión...');
        
        // Esperar un momento para que la página se estabilice
        setTimeout(() => {
          const printWindow = window.open(savedOrder.printInfo.printUrl, '_blank', 
            'width=400,height=600,scrollbars=yes,resizable=yes');
            
          if (!printWindow) {
            console.warn('⚠️ Popup bloqueado, usuario debe imprimir manualmente');
            alert('Popup bloqueado. Haz clic en "Reimprimir" en la lista de pedidos para imprimir.');
          }
        }, 500);
      }
      
      return savedOrder;
    } catch (err) {
      console.error("Error creando pedido:", err);
      setError("No se pudo crear el pedido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();

      const sorted = data.sort((a, b) => b.numberOrder - a.numberOrder);

      setOrders(sorted);
      return sorted;

    } catch (err) {
      console.error("Error cargando pedidos:", err);
      setError("No se pudieron cargar los pedidos");
    } finally {
      setLoading(false);
    }
  };

  const loadOrdersByDate = async (date) => {
    try {
      setLoading(true);
      const data = await getOrdersByDate(date);
      const sorted = data.sort((a, b) => b.numberOrder - a.numberOrder);  
      setOrders(sorted);
      return sorted;
    } catch (err) {
      console.error("Error cargando pedidos por fecha:", err);
      setError("No se pudieron cargar los pedidos de la fecha indicada");
    } finally {
      setLoading(false);
    }
  };

  const loadTodayOrders = async () => {
    try {
      setLoading(true);
      const data = await getTodayOrders();
      console.log('📋 Datos recibidos del backend:', data);
      
      // Extraer el array de órdenes de la respuesta
      const ordersArray = data.orders || [];
      const sorted = ordersArray.sort((a, b) => b.numberOrder - a.numberOrder);

      setOrders(sorted);
      return sorted;
    } catch (err) {
      console.error("Error cargando pedidos de hoy:", err);
      setError("No se pudieron cargar los pedidos de hoy");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (orderId, status) => {
    try {
      setLoading(true);
      await updateOrderStatus(orderId, status);

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status } : o
        )
      );

      return true;
    } catch (err) {
      console.error("Error actualizando estado:", err);
      setError("No se pudo cambiar el estado");
      return false;
    } finally {
      setLoading(false);
    }
  };


  const printAgain = async (order) => {
    try {
      setLoading(true);
      const result = await reprintOrder(order);
      
      // 🖨️ El servicio ya maneja la apertura de ventana
      // Solo necesitamos verificar el resultado
      if (result && result.success) {
        console.log('✅ Reimpresión procesada correctamente');
        return true;
      } else {
        console.error('❌ Error en reimpresión:', result?.error || 'Error desconocido');
        return false;
      }
      
    } catch (err) {
      console.error("Error al reimprimir:", err);
      setError("No se pudo reimprimir la ficha");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const printReport = async (reportData) => {
    try {
      setLoading(true);
      await printClosingReport(reportData);
      return true;
    } catch (err) {
      console.error("Error al imprimir reporte de cierre:", err);
      setError("No se pudo imprimir el reporte de cierre");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    orders,

    sendOrder,
    loadOrders,
    changeStatus,
    printAgain,
    loadTodayOrders,
    loadOrdersByDate, 
    printReport
  };
};
