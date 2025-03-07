import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GetOrderItems, UpdateStatusServing } from "../API/api";
import { KitchenHeader } from "../components/Chef/kitchen-header";
import { FoodItemGrid } from "../components/Chef/food-item-grid";

export default function ChefPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await GetOrderItems();
      const data = await response;
      setOrders(data.items);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleServingAction = async (orderId) => {
    try {
      const response = await UpdateStatusServing({ id: orderId });
      if (response.success === true) {
        toast.success("Cập nhật thành công!");

        fetchOrders();
      }
    } catch (err) {
      setError(err);
      toast.error("Lỗi: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <KitchenHeader onRefresh={fetchOrders} />

      <main className="container mx-auto py-6 px-4">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-bold">Lỗi</p>
            <p>{error}</p>
          </div>
        )}

        <div className="mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h2 className="text-lg font-semibold text-gray-800">
            Món ăn cần chuẩn bị ({orders.length})
          </h2>
        </div>

        {orders.length > 0 ? (
          <FoodItemGrid items={orders} onAction={handleServingAction} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              Không có món ăn nào cần chuẩn bị
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
