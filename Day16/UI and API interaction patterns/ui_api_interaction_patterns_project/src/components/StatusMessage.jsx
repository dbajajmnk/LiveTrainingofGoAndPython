export default function StatusMessage({ loading, error, isEmpty, onRetry }) {
  if (loading) {
    return <div className="info-box">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="error-box">
        <p>{error}</p>
        <button className="button secondary" onClick={onRetry}>
          Retry
        </button>
      </div>
    );
  }

  if (isEmpty) {
    return <div className="info-box">No products found for your search.</div>;
  }

  return null;
}
