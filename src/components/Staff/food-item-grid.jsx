import { FoodItem } from "./food-item";

export function FoodItemGrid({ items, onAction }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {items.map((item) => (
        <FoodItem
          key={item.id}
          item={item}
          onAction={() => onAction(item.id)}
        />
      ))}
    </div>
  );
}
