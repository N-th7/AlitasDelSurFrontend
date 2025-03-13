const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes")

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

module.exports = app;
