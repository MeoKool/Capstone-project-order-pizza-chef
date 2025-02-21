"use client";

import { useEffect, useState, useRef } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Bell, ChefHat, Loader2 } from "lucide-react";
import OrderColumn from "../components/order-column";
import OrderCard from "../components/order-card";
import { GetOrderItems } from "../API/api";

export default function ChefPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await GetOrderItems();
        setOrders(response.items);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over.id) {
      setOrders((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // Cập nhật trạng thái của mục được kéo
        const updatedItems = [...items];
        updatedItems[oldIndex] = {
          ...updatedItems[oldIndex],
          orderItemStatus: over.id, // Sử dụng ID của cột đích làm trạng thái mới
        };

        return arrayMove(updatedItems, oldIndex, newIndex);
      });
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeOrder = orders.find((order) => order.id === active.id);
    const overOrder = orders.find((order) => order.id === over.id);

    // Nếu kéo vào một cột khác
    if (
      activeOrder &&
      overOrder &&
      activeOrder.orderItemStatus !== overOrder.orderItemStatus
    ) {
      setOrders((orders) => {
        const activeIndex = orders.findIndex((order) => order.id === active.id);
        const overIndex = orders.findIndex((order) => order.id === over.id);

        return arrayMove(orders, activeIndex, overIndex).map((order, index) => {
          if (index === overIndex) {
            return { ...order, orderItemStatus: overOrder.orderItemStatus };
          }
          return order;
        });
      });
    }
  };

  const pendingOrders = orders.filter(
    (order) => order.orderItemStatus === "Pending"
  );
  const servingOrders = orders.filter(
    (order) => order.orderItemStatus === "Serving"
  );
  const completedOrders = orders.filter(
    (order) => order.orderItemStatus === "Completed"
  );

  const activeOrder = orders.find((order) => order.id === activeId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ChefHat className="w-6 h-6 text-orange-500" />
            <h1 className="text-xl font-bold text-gray-800">
              Quản lý đồ ăn gọi của khách
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium">C</span>
                </div>
                <span className="font-medium">CHEF</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200">
                      Tài khoản
                    </div>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Cài đặt
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <div className="flex gap-6 overflow-x-auto pb-6">
            <OrderColumn title="Đang chờ" id="Pending" orders={pendingOrders} />
            <OrderColumn
              title="Đang phục vụ"
              id="Serving"
              orders={servingOrders}
            />
            <OrderColumn
              title="Hoàn thành"
              id="Completed"
              orders={completedOrders}
            />
          </div>
          <DragOverlay>
            {activeId ? (
              <div className="transform scale-105">
                <OrderCard order={activeOrder} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
