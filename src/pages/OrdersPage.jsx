import React, { useEffect, useState } from "react";
import { useOrder } from "../hooks/useOrder";
import OrdersTable from "../components/organism/OrdersTable";
import Popup from "../components/molecules/Popup";

export default function OrdersPage() {

  const {
    orders,
    loadTodayOrders: loadOrders,
    changeStatus,
    printAgain,
    loading,
    error
  } = useOrder();

  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  useEffect(() => {
    loadOrders();
  }, []);

  const handleReprint = async (order) => {
    const ok = await printAgain(order);

    if (ok) {
      setPopupType("success");
      setPopupMessage("Ficha reimpresa correctamente");
    } else {
      setPopupType("error");
      setPopupMessage("Error al reimprimir");
    }

    setTimeout(() => setPopupMessage(""), 3000);
  };

  const handleStatusChange = async (id, status) => {
    const ok = await changeStatus(id, status);

    if (ok) {
      setPopupType("success");
      setPopupMessage("Estado actualizado");
    } else {
      setPopupType("error");
      setPopupMessage("Error actualizando estado");
    }

    setTimeout(() => setPopupMessage(""), 3000);
  };

  return (
    <div className="p-6">

      {loading && <p className="text-gray-500 mb-2">Cargando...</p>}

      <OrdersTable
        orders={orders}
        onStatusChange={handleStatusChange}
        onReprint={handleReprint}
      />

      <Popup
        message={popupMessage}
        type={popupType}
        onClose={() => setPopupMessage("")}
      />

      {error && (
        <Popup
          message={error}
          type="error"
          onClose={() => setPopupMessage("")}
        />
      )}
    </div>
  );
}
