import React from "react";
import { RefreshCw, ChefHat, Clock } from "lucide-react";

export function KitchenHeader({ onRefresh }) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left side */}
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold text-gray-800">Bếp</h1>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Hoạt động</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {new Date().toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              onClick={onRefresh}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="font-medium">Làm mới</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
