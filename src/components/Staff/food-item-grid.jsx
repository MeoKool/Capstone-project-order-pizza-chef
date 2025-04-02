import { FoodItem } from "./food-item";

export function FoodItemGrid({ items, onAction }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {items.map((item) => (
        <FoodItem key={item.id} item={item} onAction={onAction} />
      ))}
    </div>
  );
}
