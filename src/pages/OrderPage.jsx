import React, { useEffect, useState } from "react";
import ProductList from "../components/organism/ProductList";
import OrderSummary from "../components/organism/OrderSummary";
import OrderConfirmModal from "../components/organism/OrderConfirmModal";
import OrderTemplate from "../components/template/OrderTemplate";
import { useOrder } from "../hooks/useOrder";
import { getProducts } from "../api/productService";
import { getCategories } from "../api/categoryService";
import Button from "../components/Atoms/Button";
import { Link } from "react-router-dom";
import Popup from "../components/molecules/Popup";


const OrderPage = () => {
  const { sendOrder, loading } = useOrder();

  // Declarar todos los hooks primero (antes de cualquier early return)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const [description, setDescription] = useState("");
  const [orderType, setOrderType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentGiven, setPaymentGiven] = useState("");
  const [paymentChange, setPaymentChange] = useState("");

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // useEffect también debe ir antes de cualquier early return
  useEffect(() => {
    (async () => {
      setProducts(await getProducts());
      setCategories(await getCategories());
    })();
  }, []);
  // Obtener usuario del localStorage con manejo seguro de errores
  let user = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData && userData !== "null" && userData !== "undefined") {
      user = JSON.parse(userData);
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
    // Limpiar datos corruptos
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

 {/* // Si no hay usuario válido, redirigir al login
  if (!user || !user.username) {
    window.location.href = "/";
    return <div>Redirigiendo al login...</div>;
  }
*/}
  const total = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const confirmOrder = async () => {
    try {
      if (orderItems.length === 0) {
        setPopupType("error");
        setPopupMessage("Debes agregar productos al pedido.");
        return;
      }

      if (!orderType) {
        setPopupType("error");
        setPopupMessage("Debes seleccionar un tipo de pedido.");
        return;
      }

      const needsInfo = ["delivery", "pedido/mesa", "pedido/llevar"];

      if (needsInfo.includes(orderType)) {
        if (!customerName.trim() || !customerPhone.trim()) {
          setPopupType("error");
          setPopupMessage("Nombre y teléfono son obligatorios.");
          return;
        }
      }

      const payload = {
        orderType,
        description,
        products: orderItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          sauces: item.sauces || [] // Mantener estructura {name, type}
        })),
        paymentMethod,
        paymentGiven: paymentGiven || null,
        //createdBy: user.username,
        customerName: customerName || null,
        customerPhone: customerPhone || null
      };

      // Debug: Verificar datos antes de enviar
      console.log('🔍 Verificando datos a enviar:');
      console.log('📋 OrderType:', orderType);
      console.log('🌶️ Items con salsas:', orderItems.map(item => ({
        name: item.name,
        sauces: item.sauces
      })));
      console.log('📦 Payload completo:', JSON.stringify(payload, null, 2));

      setConfirmModalOpen(false);

    
      const saved = await sendOrder(payload);
      console.log("Pedido creado:", saved);

      setPopupType("success");
      setPopupMessage("Pedido realizado con éxito");

      setOrderItems([]);
      setCustomerName("");
      setCustomerPhone("");
      setOrderType("");
      setDescription("");
      setPaymentMethod("");
      setPaymentGiven("");
      setPaymentChange("");

      setTimeout(() => setPopupMessage(""), 3000);

    } catch (error) {
      setPopupType("error");
      setPopupMessage("Error al crear el pedido");
      console.error(error.response?.data || error.message);
      setPopupType("error");
      setPopupMessage(error.response?.data?.error || "Error al crear el pedido");

      setTimeout(() => setPopupMessage(""), 3000);
    }
  };

  const addItem = (product) => {
    const special =
      product.productCategory?.name === "Alitas" ||
      product.productCategory?.name === "Costillas";

    setOrderItems((prev) => [
      ...prev,
      {
        ...product,
        quantity: 1,
        sauces: special ? [] : []
      }
    ]);
  };

  const updateSauce = (index, sauce) => {
    const updated = [...orderItems];
    const item = updated[index];

    if (sauce.type === null) {
      item.sauces = item.sauces.filter((s) => s.name !== sauce.name);
    }

    else if (sauce.type === undefined) {
      const exists = item.sauces.find((s) => s.name === sauce.name);
      if (!exists) {
        item.sauces.push({ name: sauce.name, type: 'normal' }); // Agregar type por defecto
      }
    }

    else {
      const exists = item.sauces.find((s) => s.name === sauce.name);
      if (exists) {
        exists.type = sauce.type;
      } else {
        if (item.sauces.length < 3) {
          item.sauces.push(sauce);
        }
      }
    }

    setOrderItems(updated);
  };

  const updateQuantity = (index, quantity) => {
    const updated = [...orderItems];
    updated[index].quantity = quantity;
    setOrderItems(updated);
  };

  const deleteItem = (index) => {
    const updated = [...orderItems];
    updated.splice(index, 1);
    setOrderItems(updated);
  };

  return (
    <>
      <OrderTemplate
        left={
          <OrderSummary
            items={orderItems}
            total={total}
            onQtyChange={updateQuantity}
            onDelete={deleteItem}
            onSauceChange={(i, sauce) => updateSauce(i, sauce)}
          />
        }
        right={
          <>
            {categories.map((c) => (
              <ProductList
                key={c.id}
                title={c.name}
                products={products.filter((p) => p.productCategory.name === c.name)}
                onAdd={addItem}
              />
            ))}

            <div className="grid grid-flow-col gap-7">
              <Button
                text={loading ? "Enviando..." : "Confirmar"}
                className="mt-6 w-full bg-green-600 hover:bg-green-700"
                onClick={() => setConfirmModalOpen(true)}
                disabled={loading}
              />
              <Link to="/menu">
                <Button
                  text="Cancelar"
                  className="mt-6 w-full bg-red-600 hover:bg-red-700"
                />
              </Link>
            </div>
          </>
        }
      />

      <OrderConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmOrder}

        orderType={orderType}
        setOrderType={setOrderType}

        customerName={customerName}
        setCustomerName={setCustomerName}

        customerPhone={customerPhone}
        setCustomerPhone={setCustomerPhone}

        description={description}
        setDescription={setDescription}

        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}

        paymentGiven={paymentGiven}
        setPaymentGiven={setPaymentGiven}

        total={total}
      />


      <Popup
        message={popupMessage}
        type={popupType}
        onClose={() => setPopupMessage("")}
      />
    </>
  );
};

export default OrderPage;
