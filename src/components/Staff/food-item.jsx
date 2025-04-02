"use client";

import { Check, Table2, AlertCircle } from "lucide-react";

export function FoodItem({ item, onAction }) {
  return (
    <div className="bg-white rounded-lg border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition-all duration-200 h-[400px] flex flex-col">
      {/* Header - Fixed height */}
      <div className="flex items-center justify-between p-3 border-b bg-blue-50/50">
        <div className="flex items-center gap-2">
          <Table2 className="w-5 h-5 text-blue-600" />
          <span className="text-lg font-semibold text-gray-800">
            Bàn {item.tableCode}
          </span>
        </div>
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
          x{item.quantity}
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
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-700">{detail.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Special Notes */}
        {item.note && (
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

      {/* Fixed Footer */}
      <div className="p-4 border-t bg-white">
        <button
          onClick={() => onAction(item.id)}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <Check className="w-5 h-5" />
          <span className="font-medium">Đã phục vụ</span>
        </button>
      </div>
    </div>
  );
}
