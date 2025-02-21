import { Clock, MoreVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function OrderCard({ order }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Serving":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 mb-4 cursor-grab 
        ${isDragging ? "shadow-lg scale-105 cursor-grabbing" : ""}`}
    >
      <div className="bg-gray-800 text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-medium">
            {order.tableCode || "Bàn chưa xác định"}
          </span>
          <div className="flex items-center text-orange-300 bg-orange-900/30 px-2 py-1 rounded-full text-sm">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>5p</span>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="hover:bg-white/10 rounded-full p-1 transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Xem chi tiết
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Cập nhật trạng thái
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800">{order.name}</h3>
          <span
            className={`px-2.5 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(
              order.orderItemStatus
            )}`}
          >
            {order.orderItemStatus}
          </span>
        </div>

        <div className="mb-4">
          <ul className="text-gray-600 space-y-2">
            <li className="flex justify-between">
              <span>Số lượng:</span>
              <span className="font-medium text-gray-800">
                {order.quantity}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Giá:</span>
              <span className="font-medium text-gray-800">
                {order.price.toLocaleString()} VND
              </span>
            </li>
            <li className="flex justify-between text-lg">
              <span>Tổng cộng:</span>
              <span className="font-bold text-gray-800">
                {order.totalPrice.toLocaleString()} VND
              </span>
            </li>
          </ul>
        </div>

        {order.orderItemDetails && order.orderItemDetails.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-100">
            <div className="text-gray-700 font-medium mb-2">Ghi chú:</div>
            <ul className="text-red-600 space-y-1.5">
              {order.orderItemDetails.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span className="flex-1">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-sm text-gray-400 font-mono">
          ID: {order.id.slice(0, 8)}...
        </div>
      </div>
    </motion.div>
  );
}
