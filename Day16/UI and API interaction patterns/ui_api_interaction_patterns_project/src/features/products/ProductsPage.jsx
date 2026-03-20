import { useProducts } from "./useProducts";
import SearchBar from "../../components/SearchBar";
import ProductList from "../../components/ProductList";
import StatusMessage from "../../components/StatusMessage";

export default function ProductsPage() {
  const {
    products,
    searchText,
    setSearchText,
    loading,
    error,
    hasLoadedOnce,
    handleSearch,
    handleRetry
  } = useProducts();

  return (
    <div className="page">
      <div className="container-card">
        <h1>UI and API Interaction Patterns</h1>
        <p className="muted">
          This demo shows page load fetch, search action, loading, error,
          empty state, retry button, and response transformation using
          separate files.
        </p>

        <SearchBar
          value={searchText}
          onChange={setSearchText}
          onSearch={handleSearch}
          disabled={loading}
        />

        <StatusMessage
          loading={loading}
          error={error}
          isEmpty={!loading && !error && hasLoadedOnce && products.length === 0}
          onRetry={handleRetry}
        />

        {!loading && !error && <ProductList products={products} />}
      </div>
    </div>
  );
}
