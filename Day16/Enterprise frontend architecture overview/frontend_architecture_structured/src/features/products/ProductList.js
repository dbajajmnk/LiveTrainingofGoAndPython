export function ProductList({ products }) {
  if (!products.length) {
    return <p className="muted">No products found.</p>;
  }

  return (
    <div className="grid">
      {products.map((product) => (
        <div key={product.id} className="card">
          <h3>{product.title}</h3>
          <p className="muted">{product.category}</p>
          <p>{product.description.slice(0, 90)}...</p>
          <p className="price">₹ {product.price}</p>
        </div>
      ))}
    </div>
  );
}
