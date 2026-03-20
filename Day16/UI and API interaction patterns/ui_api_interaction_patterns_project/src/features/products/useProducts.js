import { useEffect, useState } from "react";
import { productService } from "./productService";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const loadProducts = async (query = "") => {
    try {
      setLoading(true);
      setError("");

      const response = await productService.getProducts(query);

      const transformedProducts = response.map((product) => ({
        ...product,
        displayPrice: `₹ ${product.price}`,
        stockLabel: product.stock > 10 ? "In Stock" : "Limited Stock"
      }));

      setProducts(transformedProducts);
      setHasLoadedOnce(true);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      setHasLoadedOnce(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = () => {
    loadProducts(searchText);
  };

  const handleRetry = () => {
    loadProducts(searchText);
  };

  return {
    products,
    searchText,
    setSearchText,
    loading,
    error,
    hasLoadedOnce,
    handleSearch,
    handleRetry
  };
}
