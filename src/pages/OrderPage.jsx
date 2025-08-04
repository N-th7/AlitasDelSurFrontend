import React, { useEffect, useState } from "react"; 
import UpBar from '../components/upBar/UpBar';
import MenuButton from '../components/menuButton/MenuButton';
import {getProducts} from '../api/productService'; 
import ItemOrder from '../components/Atoms/ItemOrder';
import { createOrder } from '../api/orderService';



const OrderPage = () => {
    const [products, setProducts] = useState([]); 
    const [alitas,setAlitas] = useState([]);
    const [costillitas,setCostillitas] = useState([]);
    const [refrescos,setRefrescos] = useState([]);
    const [extras,setExtras] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [items,setItems] = useState({"products":[orderItems]});

    const handleAddItem = (product) => {
  setOrderItems((prev) => [...prev, { ...product, quantity: 1, productId: product.id}]);
      setItems({"products":orderItems});

};
    
const handleQuantityChange = (index, newQuantity) => {
  const updatedItems = [...orderItems];
  updatedItems[index].quantity = newQuantity;
  setOrderItems(updatedItems);
      setItems({"products":orderItems});

};

const handleDeleteItem = (index) => {
  const updatedItems = [...orderItems];
  updatedItems.splice(index, 1);
  setOrderItems(updatedItems);
      setItems({"products":orderItems});

};
const submitOrder = () => {
    console.log(items)
    createOrder(items)
        .then(response => {
            // Puedes mostrar una notificación de éxito aquí si lo deseas
            setOrderItems([]);
            setTotal(0);
        })
        .catch(error => {
            // Maneja el error aquí si lo deseas
            console.error("Error al enviar el pedido:", error);
        });
  console.log("Pedido enviado:", orderItems);
};

useEffect(() => {
  const newTotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  setTotal(newTotal);
  console.log(orderItems)
}, [orderItems]);
 
  useEffect(() => { 
 const fetchProducts = async () => { 
   const data = await getProducts(); 
   setProducts(data); 
   const alitas = data.filter(product => product.productCategory.name === 'Alitas');
   const costillitas = data.filter(product => product.productCategory.name === 'Costillas');  
    const refrescos = data.filter(product => product.productCategory.name === 'Bebidas'); 
    const extras = data.filter(product => product.productCategory.name === 'Extras');
    setExtras(extras);
    setAlitas(alitas);
    setCostillitas(costillitas);
    setRefrescos(refrescos);
   console.log("Productos obtenidos:", data);
 }; 
 
 fetchProducts(); 
  }, []); 

    return (
        <div>
            <UpBar />
            <div className='order-page'>
                <h1 className="text-[44px] font-bold ml-8">Hacer pedido</h1>
                <div className='grid grid-cols-2 p-8 w-7/8 m-auto mt-0 mb-0'>
                    <div className="bg-[#ECBA79] rounded-xl p-6 grid  relative divide-y-2 divide-dashed divide-black w-5/6 m-auto mt-0 mb-0 mr-1"  >
                        <div className="mb-20">
                            {orderItems.map((item, index) => (
                            <ItemOrder
                                key={index}
                                price={item.price}
                                quantity={item.quantity}
                                onQuantityChange={(newQty) => handleQuantityChange(index, newQty)}
                                deleteItem={() => handleDeleteItem(index)}
                            />
                            ))}
                        </div>
                        <div className="absolute left-0 bottom-0 w-full p-6 grid grid-cols-2">
                            <p className="">TOTAL</p>
                            <span>{total}</span>
                        </div>
                    </div>
                    <div className='p-6 w-5/6 m-auto mt-0 mb-0 ml-1 pt-0'>
                        <div>
                            <h2 className="text-[36px] font-bold">Alitas</h2>
                            {
                                alitas.map(product => (
                                    <MenuButton key={product.id} label={product.name} onClick={() => handleAddItem(product) } />
                                ))
                            }
                        </div>
                        <div>
                            <h2 className="text-[36px] font-bold">Costillitas</h2>
                            {
                                costillitas.map(product => (
                                    <MenuButton key={product.id} label={product.name} onClick={() => handleAddItem(product)}/>
                                ))
                            }
                        </div>
                        <div>
                            <h2 className="text-[36px] font-bold">Extras</h2>
                            {
                                extras.map(product => (
                                    <MenuButton key={product.id} label={product.name} onClick={() => handleAddItem(product)} />
                                ))
                            }
                        </div>
                        <div>
                            <h2 className="text-[36px] font-bold">Refrescos</h2>
                            {
                                refrescos.map(product => (
                                    <MenuButton key={product.id} label={product.name} onClick={() => handleAddItem(product)}/>
                                ))
                            }
                        </div>
                        <button onClick={submitOrder}>Hacer pedido</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;