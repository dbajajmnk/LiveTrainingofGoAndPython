import { useState } from "react";
import { ProductService } from "./ProductService";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async (search = "") => {
    try {
      setLoading(true);
      setError("");

      const data = await ProductService.getProducts(search);
      setProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
}
