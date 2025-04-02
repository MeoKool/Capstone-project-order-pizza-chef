"use client";

import {
  Check,
  Table2,
  AlertCircle,
  X,
  ShoppingBag,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

export function FoodItem({ item, onAction }) {
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  // Get the appropriate icon based on type
  const TypeIcon = item.type === "Order" ? ShoppingBag : Briefcase;

  return (
    <div className="bg-white rounded-lg border-l-4 border-green-500 shadow-lg hover:shadow-xl transition-all duration-200 h-[400px] flex flex-col">
      {/* Header - Fixed height */}
      <div className="flex items-center justify-between p-3 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <Table2 className="w-5 h-5 text-green-600" />
          <span className="text-lg font-semibold text-gray-800">
            Bàn {item.tableCode}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              item.type === "Order"
                ? "bg-blue-100 text-blue-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            <TypeIcon className="w-3 h-3" />
            <span>{item.type}</span>
          </div>
          <span className="text-red-500 font-medium text-lg">
            x{item.quantity}
          </span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{item.name}</h3>

        {item.orderItemDetails && item.orderItemDetails.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Tùy chọn:</p>
            <ul className="space-y-1.5">
              {item.orderItemDetails.map((detail, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                  <span className="text-gray-700">{detail.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Special Notes */}
        {item.note && item.note !== "No Comment" && (
          <div className="mt-3 bg-yellow-50 p-3 rounded-md border-l-4 border-yellow-400">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <p className="text-sm font-medium text-yellow-700">Ghi chú:</p>
            </div>
            <div className="text-sm text-gray-700">
              <p className="break-words whitespace-pre-wrap">{item.note}</p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Footer with Action Buttons */}
      <div className="p-3 border-t bg-white">
        {showConfirmCancel ? (
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfirmCancel(false)}
              className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded flex items-center justify-center gap-1 transition-colors duration-200"
            >
              <span className="font-medium">Hủy</span>
            </button>
            <button
              onClick={() => {
                onAction(item.id, "cancel");
                setShowConfirmCancel(false);
              }}
              className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center gap-1 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              <span className="font-medium">Xác nhận</span>
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfirmCancel(true)}
              className="w-1/3 py-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded flex items-center justify-center gap-1 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              <span className="font-medium">Hủy</span>
            </button>
            <button
              onClick={() => onAction(item.id, "serve")}
              className="w-2/3 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded flex items-center justify-center gap-1 transition-colors duration-200"
            >
              <Check className="w-4 h-4" />
              <span className="font-medium">Đã hoàn thành</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
