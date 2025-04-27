"use client";

import {
  Check,
  Table2,
  AlertCircle,
  X,
  ShoppingBag,
  Briefcase,
  CookingPot,
} from "lucide-react";
import { useState } from "react";
import { CancelReasonDialog } from "./cancel-reason-dialog";
import { RecipeDetails } from "../../pages/recipe-details";

export function FoodItem({ item, onAction }) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Get the appropriate icon based on type
  const TypeIcon = item.type === "Order" ? ShoppingBag : Briefcase;

  // Determine border color based on status
  const getBorderColor = () => {
    switch (item.orderItemStatus) {
      case "Cooking":
        return "border-orange-500";
      case "Pending":
      default:
        return "border-green-500";
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border-l-4 ${getBorderColor()} shadow-lg hover:shadow-xl transition-all duration-200 h-[400px] flex flex-col`}
    >
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
          {item.orderItemStatus === "Cooking" && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              <CookingPot className="w-3 h-3" />
              <span>Đang nấu</span>
            </div>
          )}
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

        {/* Cooking time information */}
        {item.startTimeCooking && (
          <div className="mt-3 bg-orange-50 p-3 rounded-md">
            <div className="flex items-center gap-1.5">
              <CookingPot className="w-4 h-4 text-orange-600" />
              <p className="text-sm text-orange-700">
                Bắt đầu nấu:{" "}
                {new Date(item.startTimeCooking).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        )}

        {/* Recipe details for Workshop items */}
        {item.type === "Workshop" && item.product?.recipes && (
          <RecipeDetails recipes={item.product.recipes} />
        )}
      </div>

      {/* Fixed Footer with Action Buttons */}
      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <button
            onClick={() => setShowCancelDialog(true)}
            className="w-1/3 py-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded flex items-center justify-center gap-1 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span className="font-medium">Hủy</span>
          </button>

          {item.orderItemStatus === "Pending" ? (
            <button
              onClick={() => onAction(item.id, "cooking")}
              className="w-2/3 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center justify-center gap-1 transition-colors duration-200"
            >
              <CookingPot className="w-4 h-4" />
              <span className="font-medium">Xác nhận nấu</span>
            </button>
          ) : (
            <button
              onClick={() => onAction(item.id, "serve")}
              className="w-2/3 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded flex items-center justify-center gap-1 transition-colors duration-200"
            >
              <Check className="w-4 h-4" />
              <span className="font-medium">Đã hoàn thành</span>
            </button>
          )}
        </div>
      </div>

      {/* Cancel Reason Dialog */}
      <CancelReasonDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={(id, reason) => {
          onAction(id, "cancel", reason);
          setShowCancelDialog(false);
        }}
        itemId={item.id}
      />
    </div>
  );
}
