import { AlertCircle, Check, Table } from "lucide-react";

export function FoodItem({ item, onAction }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-green-50">
        <div className="flex items-center space-x-2">
          <Table className="w-6 h-6 text-green-600" />
          <span className="text-2xl font-bold text-gray-800">
            {item.tableCode || "Bàn ?"}
          </span>
        </div>
        <div className="text-lg font-bold text-red-500">x{item.quantity}</div>
      </div>

      <div className="p-4 flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          {item.name}
        </h3>

        {item.orderItemDetails && item.orderItemDetails.length > 0 && (
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Tùy chọn:
            </p>
            <ul className="space-y-2 pl-4">
              {item.orderItemDetails.map((detail, index) => (
                <li key={index} className="flex items-center text-lg">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  <span className="text-gray-800">{detail.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.note && (
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-lg font-semibold text-red-500">
                Ghi chú đặc biệt:
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-md border border-red-200">
              <p className="text-lg text-red-700 whitespace-pre-wrap break-words">
                {item.note || "Không có ghi chú"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <button
          onClick={onAction}
          className="w-full py-4 cursor-pointer bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300 text-xl font-bold flex items-center justify-center"
        >
          <Check className="w-6 h-6 mr-2" />
          Đã hoàn thành
        </button>
      </div>
    </div>
  );
}
