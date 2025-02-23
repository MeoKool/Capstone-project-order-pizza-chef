import { MoreVertical, Clock, ChefHat, Coffee } from "lucide-react";

export function OrderCard({
  order,
  onAction,
  actionLabel,
  actionColor,
  isCompleted,
}) {
  const mainDish = order.name;
  const tableCode = order.tableCode;
  const additionalItems = order.orderItemDetails || [];
  const totalPrice = additionalItems.reduce(
    (sum, item) => sum + item.additionalPrice,
    order.price
  );

  return (
    <div
      className={`bg-[#ffffff] rounded-lg shadow-md overflow-hidden ${
        isCompleted
          ? "bg-green-50 border border-green-200"
          : "hover:shadow-lg transition-shadow duration-300"
      }`}
    >
      {/* Card Header */}
      <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-[#000000]">{tableCode}</span>
          <div className="flex items-center space-x-1 text-[#616161]">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{order.time}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-[#000000]">{mainDish}</h3>
          <button
            onClick={onAction}
            disabled={isCompleted}
            className={`px-4 py-1 rounded-full text-white ${actionColor} ${
              isCompleted
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90 transition-opacity duration-300"
            }`}
          >
            {actionLabel}
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm font-medium text-[#616161]">Thêm:</p>
          <ul className="text-sm text-[#000000] bg-gray-50 rounded-md p-3">
            {additionalItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center space-x-2"
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-3"></div>
        </div>
      </div>
    </div>
  );
}
