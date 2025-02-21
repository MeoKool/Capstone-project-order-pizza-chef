import OrderCard from "./OrderCard";

export default function OrderList() {
  const orders = [
    {
      area: "A",
      table: "10",
      notes: ["ít cay", "thêm đường", "nhiều mỳ"],
      staff: "Sỹ Quảng",
    },
    {
      area: "B",
      table: "8",
      notes: ["ít cay", "thêm đường", "nhiều mỳ"],
      staff: "Sỹ Quảng",
    },
    {
      area: "A",
      table: "1",
      notes: ["ít cay", "thêm đường", "nhiều mỳ"],
      staff: "Sỹ Quảng",
    },
    // Add more orders as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {orders.map((order, index) => (
        <OrderCard key={index} {...order} />
      ))}
    </div>
  );
}
