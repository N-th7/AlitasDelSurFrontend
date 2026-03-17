import React from "react";
import Button from "../Atoms/Button";

const PaymentInfo = ({
  paymentMethod,
  setPaymentMethod,
  paymentGiven,
  setPaymentGiven,
  total
}) => {

  const change = paymentGiven ? (Number(paymentGiven) - total) : 0;

  return (
    <div className="space-y-4 mt-6">

      <h2 className="text-xl font-bold">Método de pago</h2>

      <div className="grid grid-cols-2 gap-3">
        <Button
          text="QR"
          variant={paymentMethod === "qr" ? "primary" : "secondary"}
          onClick={() => setPaymentMethod("qr")}
        />

        <Button
          text="Efectivo"
          variant={paymentMethod === "efectivo" ? "primary" : "secondary"}
          onClick={() => setPaymentMethod("efectivo")}
        />
      </div>

      {paymentMethod === "efectivo" && (
        <>
          <input
            className="w-full p-2 border rounded"
            placeholder="¿Cuánto dio?"
            value={paymentGiven}
            onChange={(e) => setPaymentGiven(e.target.value)}
          />

          <div className="w-full p-2 border rounded bg-gray-100 font-semibold">
            Cambio: {change >= 0 ? change : 0} Bs
          </div>
        </>
      )}

    </div>
  );
};

export default PaymentInfo;
