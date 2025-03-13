const { db } = require("../config/firebase");
const OrderItem = require("./orderItem");

class Order {
  constructor(orderItems = []) {
    this.orderItems = orderItems; // Lista de productos en la orden
    this.totalPrice = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    this.createdAt = new Date();
  }

  // Obtener la fecha actual en formato YYYY-MM-DD
  static getCurrentDate() {
    return new Date().toISOString().split("T")[0];
  }

  // Obtener y actualizar el número de orden en Firestore
  static async getNextOrderNumber() {
    const orderCounterRef = db.collection("config").doc("orderCounter");
    const doc = await orderCounterRef.get();
    const todayDate = Order.getCurrentDate();

    let orderNumber = 1;

    if (doc.exists) {
      const data = doc.data();
      const lastDate = data.lastDate || todayDate;

      // Si es un nuevo día, reiniciar el contador
      if (lastDate !== todayDate) {
        orderNumber = 1;
      } else {
        orderNumber = data.currentOrder >= 100 ? 1 : data.currentOrder + 1;
      }
    }

    // Guardar el nuevo número de orden y la fecha actual
    await orderCounterRef.set({ currentOrder: orderNumber, lastDate: todayDate });

    return orderNumber;
  }

  // Guardar la orden en Firestore
  async save() {
    const orderNumber = await Order.getNextOrderNumber();
    this.numberOrder = orderNumber;

    const orderRef = await db.collection("orders").add({
      numberOrder: this.numberOrder,
      orderItems: this.orderItems.map((item) => ({ ...item })), // Guardar los productos en la orden
      totalPrice: this.totalPrice,
      createdAt: this.createdAt,
    });

    return { id: orderRef.id, ...this };
  }
}

module.exports = Order;
