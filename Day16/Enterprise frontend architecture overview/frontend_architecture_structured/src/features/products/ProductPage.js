import { useEffect, useState } from "react";
import { useProducts } from "./useProducts";
import { ProductList } from "./ProductList";
import Loader from "../../shared/Loader";
import ErrorMessage from "../../shared/ErrorMessage";

export default function ProductPage() {
  const { products, loading, error, fetchProducts } = useProducts();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    fetchProducts(search);
  };

  const handleReset = () => {
    setSearch("");
    fetchProducts("");
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Enterprise Frontend Architecture Demo</h1>
        <p className="muted">
          Beginner-friendly example with separate files for service, hook,
          page, UI, and shared components.
        </p>

        <div className="toolbar">
          <input
            className="input"
            type="text"
            placeholder="Search products by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="button" onClick={handleSearch} disabled={loading}>
            Search
          </button>
          <button className="button" onClick={handleReset} disabled={loading}>
            Reset
          </button>
        </div>

        <ErrorMessage message={error} />
        {loading ? <Loader /> : <ProductList products={products} />}
      </div>
    </div>
  );
}
