import { useState } from "react";
import { orderService } from "./orderService";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await orderService.getOrders();

      const formattedOrders = data.map((order) => ({
        ...order,
        total: `₹ ${order.total}`
      }));

      setOrders(formattedOrders);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders
  };
}
