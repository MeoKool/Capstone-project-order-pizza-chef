import { OrderCard } from "./order-card";

export function OrderColumn({
  title,
  orders,
  onMoveOrder,
  actionLabel,
  actionColor,
  isCompleted,
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
        {title}
        <span className="ml-2 bg-gray-200 text-gray-600 text-sm rounded-full px-2 py-1">
          {orders.length}
        </span>
      </h2>
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onAction={() => onMoveOrder?.(order.id)}
            actionLabel={actionLabel}
            actionColor={actionColor}
            isCompleted={isCompleted}
          />
        ))}
      </div>
    </div>
  );
}
