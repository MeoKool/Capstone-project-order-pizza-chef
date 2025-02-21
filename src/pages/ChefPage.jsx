"use client";

import { useState } from "react";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import OrderColumn from "../components/OrderColumn";
import OrderCard from "../components/OrderCard";
import { Bell } from "lucide-react";

export default function ChefPage() {
  const [activeId, setActiveId] = useState(null);
  const [orders, setOrders] = useState({
    unassigned: [
      {
        id: "1",
        area: "Khu A",
        table: "Bàn 1",
        notes: ["ít cay", "thêm đường", "nhiều mỳ"],
        status: "pending",
        staff: null,
      },
      {
        id: "2",
        area: "Khu B",
        table: "Bàn 2",
        notes: ["ít cay", "thêm đường", "nhiều mỳ"],
        status: "pending",
        staff: null,
      },
    ],
    inProgress: [],
    completed: [],
  });

  const staff = [
    { id: 1, name: "Sỹ Quảng", orderCount: 2 },
    { id: 2, name: "Trường Thanh", orderCount: 3 },
    { id: 3, name: "Nhật Hào", orderCount: 2 },
    { id: 4, name: "Bảo", orderCount: 3 },
    { id: 5, name: "Hưng Hảo", orderCount: 2 },
  ];

  const findContainer = (id) => {
    if (id in orders) {
      return id;
    }
    return Object.keys(orders).find((key) =>
      orders[key].some((item) => item.id === id)
    );
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (activeContainer !== overContainer) {
      setOrders((prev) => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];
        const activeIndex = activeItems.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = overItems.findIndex((item) => item.id === over.id);

        return {
          ...prev,
          [activeContainer]: [
            ...prev[activeContainer].filter((item) => item.id !== active.id),
          ],
          [overContainer]: [
            ...prev[overContainer].slice(0, overIndex),
            activeItems[activeIndex],
            ...prev[overContainer].slice(overIndex),
          ],
        };
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (activeContainer !== overContainer) {
      setOrders((prev) => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];
        const activeIndex = activeItems.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = overItems.findIndex((item) => item.id === over.id);

        return {
          ...prev,
          [activeContainer]: [
            ...prev[activeContainer].filter((item) => item.id !== active.id),
          ],
          [overContainer]: [
            ...prev[overContainer].slice(0, overIndex),
            activeItems[activeIndex],
            ...prev[overContainer].slice(overIndex),
          ],
        };
      });
    }
  };

  const getActiveOrder = () => {
    const container = findContainer(activeId);
    return container
      ? orders[container].find((item) => item.id === activeId)
      : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Quản lý đồ ăn gọi của khách</h1>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-medium">C</span>
              </div>
              <span className="font-medium">CHEF</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6 flex gap-6">
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 flex gap-6">
            <OrderColumn
              title="Chưa xử lý"
              id="unassigned"
              orders={orders.unassigned}
            />
            <OrderColumn
              title="Đang thực hiện"
              id="inProgress"
              orders={orders.inProgress}
            />
            <OrderColumn
              title="Hoàn thành"
              id="completed"
              orders={orders.completed}
            />
          </div>

          <DragOverlay>
            {activeId ? (
              <OrderCard order={getActiveOrder()} id={activeId} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
