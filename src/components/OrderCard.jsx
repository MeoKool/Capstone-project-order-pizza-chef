import { Clock, MoreVertical, AlertCircle } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function OrderCard({ order, id }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusButton = () => {
    if (order.status === "completed") {
      return (
        <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-md flex items-center gap-2">
          <span>Đã xong</span>
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      );
    }
    return (
      <button className="bg-[#4CAF50] text-white px-4 py-1 rounded-md">
        Hoàn tất
      </button>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow-md mb-4 cursor-grab active:cursor-grabbing"
    >
      <div className="bg-gray-700 text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>
            {order.area} - {order.table}
          </span>
          <div className="flex items-center text-orange-300">
            <Clock className="w-4 h-4 mr-1" />
            <span>5p</span>
          </div>
        </div>
        <MoreVertical className="w-5 h-5" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold">MÓN MÙA XUÂN</h3>
          {getStatusButton()}
        </div>

        <div className="mb-4">
          <div className="text-gray-600 mb-1">Ghi chú:</div>
          <ul className="text-red-500 space-y-1">
            {order.notes.map((note, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`flex items-center gap-2 p-2 rounded-md ${
            order.staff ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          {order.staff ? (
            <span>Phụ trách: {order.staff}</span>
          ) : (
            <>
              <AlertCircle className="w-4 h-4" />
              <span>Phụ trách: Chưa có</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
