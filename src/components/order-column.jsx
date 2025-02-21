"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import OrderCard from "./order-card";

export default function OrderColumn({ title, orders, id }) {
  const { setNodeRef, isOver } = useDroppable({ id: id });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[380px] bg-gray-100/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 
        ${isOver ? "ring-2 ring-blue-400 ring-offset-2" : ""} 
        transition-all duration-200`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
          {orders.length}
        </span>
      </div>
      <div className="min-h-[calc(100vh-200px)] p-2 -mx-2">
        <SortableContext items={orders} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </AnimatePresence>
        </SortableContext>
        {orders.length === 0 && (
          <div className="h-32 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
            Không có đơn hàng
          </div>
        )}
      </div>
    </div>
  );
}
