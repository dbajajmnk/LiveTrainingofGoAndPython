export const ProductService = {
  async getProducts(search = "") {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    return data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  },
};
