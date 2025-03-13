const { db } = require("../config/firebase");

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static async getAll() {
    try {
      const productsRef = db.collection("products");
      const snapshot = await productsRef.get();

      if (snapshot.empty) {
        return [];
      }

      const products = snapshot.docs.map((doc) => {
        const productData = doc.data();

        // Verifica que 'price' sea un número
        if (typeof productData.price !== 'number') {
          throw new Error(`El precio del producto ${doc.id} no es un número válido.`);
        }

        return new Product(doc.id, productData.name, productData.price);
      });

      return products;
    } catch (error) {
      throw new Error("Error al obtener los productos: " + error.message);
    }
  }
}

module.exports = Product;
