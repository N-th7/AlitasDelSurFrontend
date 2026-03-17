import React from "react";
import OrderTypeSelector from "../molecules/OrderTypeSelector";
import PaymentInfo from "../molecules/PaymentInfo";
import Button from "../Atoms/Button";

const OrderConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  orderType, setOrderType,
  customerName, setCustomerName,
  customerPhone, setCustomerPhone,
  description, setDescription,
  paymentMethod, setPaymentMethod,
  paymentGiven, setPaymentGiven,
  total
}) => {

  if (!isOpen) return null;

  const requiresClientData = ["delivery", "pedido/mesa", "pedido/llevar"];
  const mustAskName = requiresClientData.includes(orderType);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-6">

        <OrderTypeSelector
          orderType={orderType}
          setOrderType={setOrderType}
        />

        {mustAskName && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nombre del cliente"
              className="w-full border p-2 rounded"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Número de celular"
              className="w-full border p-2 rounded"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
        )}

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Nota del pedido (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <PaymentInfo
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paymentGiven={paymentGiven}
          setPaymentGiven={setPaymentGiven}
          total={total}
        />

        <div className="flex justify-between mt-4">
          <Button text="Cancelar" className="bg-red-600 hover:bg-red-700" onClick={onClose} />
          <Button text="Confirmar" className="bg-green-600 hover:bg-green-700" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmModal;
