class OrderItem {
  constructor(productId, name, quantity, unitPrice) {
    this.productId = productId;
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.subtotal = this.calculateSubtotal();  // Calculamos el subtotal dentro del constructor
  }

  // Método para calcular el subtotal
  calculateSubtotal() {
    return this.quantity * this.unitPrice;
  }
}

module.exports = OrderItem;