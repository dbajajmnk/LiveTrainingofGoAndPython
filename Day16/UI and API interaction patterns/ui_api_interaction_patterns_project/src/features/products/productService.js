const mockProducts = [
  { id: 1, title: "Wireless Mouse", category: "Accessories", price: 799, stock: 15 },
  { id: 2, title: "Mechanical Keyboard", category: "Accessories", price: 2499, stock: 8 },
  { id: 3, title: "Gaming Monitor", category: "Displays", price: 12999, stock: 5 },
  { id: 4, title: "USB-C Hub", category: "Accessories", price: 1499, stock: 20 },
  { id: 5, title: "Laptop Stand", category: "Office", price: 999, stock: 12 },
  { id: 6, title: "Noise Cancelling Headphones", category: "Audio", price: 6999, stock: 4 }
];

export const productService = {
  async getProducts(searchText = "") {
    await new Promise((resolve) => setTimeout(resolve, 900));

    const shouldFail = false;
    if (shouldFail) {
      throw new Error("Network request failed");
    }

    return mockProducts.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
};
