const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Product = require("../models/product");

const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    // Obtener información de los productos desde Firestore
    const allProducts = await Product.getAll();

    const orderItems = products.map((p) => {
      // Buscar el producto usando el productId
      const product = allProducts.find((prod) => prod.id === p.productId);

      if (!product) {
        throw new Error(`Producto con ID ${p.productId} no encontrado`);
      }

      return new OrderItem(product.id, product.name, p.quantity, product.price);
    });

    // Crear la nueva orden con los items
    const newOrder = new Order(orderItems);
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error al crear la orden:", error.message);
    res.status(500).json({ error: error.message });
  }
};




module.exports = { createOrder };
