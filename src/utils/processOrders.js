export function processOrders(orders = []) {
  const stats = {
    totalOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    cashTotal: 0,
    qrTotal: 0,
    totalSales: 0,
    productSales: [],
    cashierSales: []
  };

  if (!Array.isArray(orders)) return stats;

  stats.totalOrders = orders.length;

  const productMap = {};
  const cashierMap = {};

  orders.forEach(order => {
    const isDelivered = order.status === "entregado";
    const isCancelled = order.status === "cancelado";

    if (isDelivered) stats.deliveredOrders++;
    if (isCancelled) stats.cancelledOrders++;

    if (isDelivered) {
      stats.totalSales += Number(order.totalPrice || 0);

      if (order.paymentMethod === "efectivo") {
        stats.cashTotal += Number(order.totalPrice);
      } else if (order.paymentMethod === "qr") {
        stats.qrTotal += Number(order.totalPrice);
      }

      order.orderItems.forEach(item => {
        if (!productMap[item.name]) {
          productMap[item.name] = {
            product: item.name,
            quantity: 0,
            total: 0
          };
        }

        productMap[item.name].quantity += item.quantity;
        productMap[item.name].total += Number(item.subtotal);
      });

      const cashier = order.createdBy || "Sin nombre";

      if (!cashierMap[cashier]) {
        cashierMap[cashier] = {
          cashier,
          orders: 0,
          total: 0
        };
      }

      cashierMap[cashier].orders++;
      cashierMap[cashier].total += Number(order.totalPrice);
    }

  });

  stats.productSales = Object.values(productMap);
  stats.cashierSales = Object.values(cashierMap);

  return stats;
}
