import { useOrders } from "./useOrders";
import OrderList from "../../components/OrderList";
import Loader from "../../shared/Loader";
import ErrorMessage from "../../shared/ErrorMessage";

export default function OrderPage() {
  const { orders, loading, error, fetchOrders } = useOrders();

  return (
    <div className="page">
      <div className="card">
        <h1>Frontend Role in Large-Scale Systems</h1>
        <p className="muted">
          This demo shows how frontend manages state, calls services,
          formats data, handles loading/error states, and renders reusable UI.
        </p>

        <div className="toolbar">
          <button className="button" onClick={fetchOrders} disabled={loading}>
            Load Orders
          </button>
        </div>

        <ErrorMessage message={error} />
        {loading ? <Loader /> : <OrderList orders={orders} />}
      </div>
    </div>
  );
}
