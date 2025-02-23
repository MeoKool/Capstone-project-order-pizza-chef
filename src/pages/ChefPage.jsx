import { useCallback, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { OrderColumn } from "../components/order-column";
import { GetOrderItems } from "../API/api";
import { OrderCard } from "../components/order-card";

export default function ChefOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await GetOrderItems();
      const data = await response;
      console.log(response);

      setOrders(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOrderAction = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `https://api.example.com/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      // Refresh orders after successful update
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#000000]">
              Đơn hàng cần chế biến
            </h2>
            <p className="text-[#616161]">
              Quản lý và cập nhật trạng thái món ăn
            </p>
          </div>
        </div>

        {isLoading && (
          <p className="text-center text-[#616161]">Đang tải đơn hàng...</p>
        )}
        {error && <p className="text-center text-[#f44336]">Lỗi: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAction={(newStatus) => handleOrderAction(order.id, newStatus)}
              actionLabel={
                order.orderItemStatus === "Pending" ? "Bắt đầu" : "Hoàn thành"
              }
              actionColor={
                order.orderItemStatus === "Pending"
                  ? "bg-[#60b748]"
                  : "bg-[#3aad73]"
              }
              isCompleted={order.orderItemStatus === "Completed"}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
