"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  GetOrderItems,
  UpdateStatusServing,
  UpdateStatusCancelled,
  UpdateStatusCooking,
} from "../API/api";
import { KitchenHeader } from "../components/Chef/kitchen-header";
import { FoodItemGrid } from "../components/Chef/food-item-grid";
import { Search, X, ShoppingBag, Briefcase } from "lucide-react";
import SignalRListener from "../signalR/signalr-client";
import { connection } from "../lib/signalr-client";

export default function ChefPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all, order, workshop

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

  // Sort and filter orders
  useEffect(() => {
    let result = [...orders];

    // Sort orders: Cooking first, then Pending
    result.sort((a, b) => {
      // First sort by status (Cooking comes before Pending)
      if (a.orderItemStatus === "Cooking" && b.orderItemStatus !== "Cooking")
        return -1;
      if (a.orderItemStatus !== "Cooking" && b.orderItemStatus === "Cooking")
        return 1;

      // Then sort by start time (oldest first)
      return new Date(a.startTime) - new Date(b.startTime);
    });

    // Apply type filter
    if (activeTab === "order") {
      result = result.filter((item) => item.type === "Order");
    } else if (activeTab === "workshop") {
      result = result.filter((item) => item.type === "Workshop");
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tableCode.toString().includes(searchTerm)
      );
    }

    setFilteredOrders(result);
  }, [orders, searchTerm, activeTab]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleAction = async (orderId, actionType, reason = null) => {
    try {
      let response;

      if (actionType === "serve") {
        response = await UpdateStatusServing({ id: orderId });
      } else if (actionType === "cancel") {
        response = await UpdateStatusCancelled({ id: orderId, reason });
      } else if (actionType === "cooking") {
        response = await UpdateStatusCooking({ id: orderId });
      }

      if (response.success === true) {
        let actionText = "";
        switch (actionType) {
          case "serve":
            actionText = "hoàn thành";
            break;
          case "cancel":
            actionText = "hủy";
            break;
          case "cooking":
            actionText = "xác nhận nấu";
            break;
        }
        toast.success(`Đã ${actionText} món ăn thành công!`);
        fetchOrders();
      }
    } catch (err) {
      setError(err);
      toast.error("Lỗi: " + (err?.message || "Không xác định"));
    }
  };

  // Count orders by type and status
  const orderCount = orders.filter((item) => item.type === "Order").length;
  const workshopCount = orders.filter(
    (item) => item.type === "Workshop"
  ).length;
  const cookingCount = orders.filter(
    (item) => item.orderItemStatus === "Cooking"
  ).length;
  const pendingCount = orders.filter(
    (item) => item.orderItemStatus === "Pending"
  ).length;

  // ------------------
  // Auto refresh khi nhận được sự kiện từ SIGNALR
  // ------------------
  useEffect(() => {
    const handleNewOrder = () => {
      fetchOrders();
    };

    connection.on("OrderItemUpdatedStatus", handleNewOrder);
    return () => {
      connection.off("OrderItemUpdatedStatus", handleNewOrder);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <SignalRListener />
      <KitchenHeader onRefresh={fetchOrders} />

      <main className="container mx-auto py-6 px-4">
        {/* Search and Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên món hoặc số bàn..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === "all"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span>Tất cả</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {orders.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("order")}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === "order"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {orderCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("workshop")}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === "workshop"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Workshop</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {workshopCount}
              </span>
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-bold">Lỗi</p>
            <p>{error?.message || "Không xác định"}</p>
          </div>
        )}

        {/* Status summary */}
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm font-medium">
              Đang nấu: {cookingCount}
            </span>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">
              Chờ xác nhận: {pendingCount}
            </span>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Món ăn cần chuẩn bị ({filteredOrders.length})
            </h2>
          </div>

          {filteredOrders.length !== orders.length && (
            <span className="text-sm text-gray-500">
              Hiển thị {filteredOrders.length} / {orders.length} món
            </span>
          )}
        </div>

        {filteredOrders.length > 0 ? (
          <FoodItemGrid items={filteredOrders} onAction={handleAction} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              {orders.length > 0
                ? "Không tìm thấy món ăn nào phù hợp với bộ lọc"
                : "Không có món ăn nào cần chuẩn bị"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
