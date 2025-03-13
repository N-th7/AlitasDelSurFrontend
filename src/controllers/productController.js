const { db } = require("../config/firebase");
const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = new Product(name, price);
    const userRef = await db.collection("products").add({ ...newProduct });
    res.status(201).json({ id: userRef.id, ...newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getProducts = async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    let products = [];
    snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, getProducts };
