export default function ProductList({ products }) {
  return (
    <div className="grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.title}</h3>
          <p className="muted">{product.category}</p>
          <p><strong>Price:</strong> {product.displayPrice}</p>
          <p><strong>Status:</strong> {product.stockLabel}</p>
        </div>
      ))}
    </div>
  );
}
