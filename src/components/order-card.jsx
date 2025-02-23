import { useState } from "react";
import { MoreVertical, Clock } from "lucide-react";

export function OrderCard({ order, onAction, actionLabel, actionColor }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-gray-50">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-bold text-gray-800">
            {order.tableCode}
          </span>
        </div>
        <button
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          onClick={toggleDetails}
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{order.name}</h3>
          </div>
          <button
            onClick={onAction}
            className={`px-6 py-2 rounded-lg text-white ${actionColor} hover:opacity-90 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md`}
          >
            {actionLabel}
          </button>
        </div>

        {showDetails && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Chi tiết:</p>
            <ul className="space-y-3">
              {order.orderItemDetails?.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-[#60b748] rounded-full mr-2"></span>
                      <span className="text-gray-800 font-medium">
                        {item.name}
                      </span>
                    </div>
                  </div>
                  {item.optionItem.name && (
                    <div className="mt-2 pl-4">
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li className="text-sm text-gray-500">
                          {item.optionItem.name}
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
