import { useCallback, useEffect, useState } from "react";
import { Header } from "../components/Header";
import {
  GetOrderItems,
  UpdateStatusDone,
  UpdateStatusServing,
} from "../API/api";
import { RefreshCw, ChefHat, Utensils } from "lucide-react";
import { OrderCard } from "../components/order-card";

const ChefPage = () => {
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
      setError(err.message);
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
      await UpdateStatusServing({ id: orderId });
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDoneAction = async (orderId) => {
    try {
      await UpdateStatusDone({ id: orderId });
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  const pendingOrders = orders.filter(
    (order) => order.orderItemStatus === "Pending"
  );
  const preparingOrders = orders.filter(
    (order) => order.orderItemStatus === "Serving"
  );
  const doneOrders = orders.filter((order) => order.orderItemStatus === "Done");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-end mb-8">
          <button
            onClick={fetchOrders}
            className="flex items-center px-4 py-2 bg-[#60b748] text-white rounded-md hover:bg-[#4e9d3a] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Làm mới
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#60b748]"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <p className="font-bold">Lỗi</p>
            <p>{error}</p>
          </div>
        )}

        <div className="bg-[#f0e4d7] rounded-xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/wooden-texture.jpg')] opacity-50 mix-blend-multiply"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h4 className="text-lg font-semibold text-[#60b748] mb-3 flex items-center">
                  <span className="w-3 h-3 bg-[#60b748] rounded-full mr-2"></span>
                  Đơn chờ xử lý ({pendingOrders.length})
                </h4>
                <div className="max-h-[calc(100vh-400px)] overflow-y-auto pr-2 space-y-4">
                  {pendingOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onAction={() => handleServingAction(order.id)}
                      actionLabel="Bắt đầu"
                      actionColor="bg-[#60b748] hover:bg-[#4e9d3a]"
                    />
                  ))}
                  {pendingOrders.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <p className="text-gray-500">Không có đơn hàng nào</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <h4 className="text-lg font-semibold text-[#f9a826] mb-3 flex items-center">
                  <span className="w-3 h-3 bg-[#f9a826] rounded-full mr-2"></span>
                  Đang chuẩn bị ({preparingOrders.length})
                </h4>
                <div className="max-h-[calc(100vh-400px)] overflow-y-auto pr-2 space-y-4">
                  {preparingOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onAction={() => handleDoneAction(order.id)}
                      actionLabel="Hoàn thành"
                      actionColor="bg-[#f9a826] hover:bg-[#e69415]"
                    />
                  ))}
                  {preparingOrders.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <p className="text-gray-500">Không có đơn hàng nào</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <h4 className="text-lg font-semibold text-gray-600 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-gray-600 rounded-full mr-2"></span>
                  Hoàn thành gần đây
                </h4>
                <div className="max-h-[calc(100vh-400px)] overflow-y-auto pr-2 space-y-4">
                  {doneOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      actionLabel="Đã xong"
                      actionColor="bg-gray-600 hover:bg-gray-500"
                    />
                  ))}
                  {doneOrders.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <p className="text-gray-500">Không có đơn hàng nào</p>
                    </div>
                  )}
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">
                      Chưa có đơn hàng nào hoàn thành
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefPage;
