export default function OrderList({ orders }) {
  if (!orders.length) {
    return <p className="muted">No orders loaded yet.</p>;
  }

  return (
    <div className="grid">
      {orders.map((order) => (
        <div key={order.id} className="card order-card">
          <h3>Order #{order.id}</h3>
          <p><strong>Customer:</strong> {order.customer}</p>
          <p><strong>Total:</strong> {order.total}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
      ))}
    </div>
  );
}
