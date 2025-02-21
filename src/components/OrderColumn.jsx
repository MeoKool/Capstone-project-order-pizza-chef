import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import OrderCard from "./OrderCard";

export default function OrderColumn({ title, orders, id }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex-1 min-w-[350px] bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div ref={setNodeRef} className="min-h-[500px]">
        <SortableContext items={orders} strategy={verticalListSortingStrategy}>
          {orders.map((order) => (
            <OrderCard key={order.id} id={order.id} order={order} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
