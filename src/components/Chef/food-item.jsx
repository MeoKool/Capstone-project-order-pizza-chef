import { Check, Table2, AlertCircle } from "lucide-react";

export function FoodItem({ item, onAction }) {
  return (
    <div className="bg-white rounded-lg border-l-4 border-green-500 shadow hover:shadow-md transition-all duration-200 h-[400px] flex flex-col">
      {/* Header - Fixed height */}
      <div className="flex items-center justify-between p-3 border-b bg-green-50/50">
        <div className="flex items-center gap-2">
          <Table2 className="w-5 h-5 text-green-600" />
          <span className="text-lg font-semibold text-gray-800">
            {item.tableCode}
          </span>
        </div>
        <span className="text-red-500 font-medium">x{item.quantity}</span>
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
        {item.note && (
          <div className="mt-3">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm font-medium text-red-500">Ghi chú:</p>
            </div>
            <div className="bg-red-50 rounded p-2 text-sm text-gray-700">
              <p className="break-words whitespace-pre-wrap">
                {item.note || "No Comment"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      <div className="p-4 border-t bg-white">
        <button
          onClick={onAction}
          className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <Check className="w-5 h-5" />
          <span className="font-medium">Đã hoàn thành</span>
        </button>
      </div>
    </div>
  );
}
