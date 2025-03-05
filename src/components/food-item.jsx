export function FoodItem({ item, onAction }) {
  return (
    <div className="bg-[#F5EBE0] rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="text-lg font-bold text-gray-800">
          {item.tableCode || "Bàn không xác định"}
        </div>
        <div className="text-sm text-red-500 font-bold">
          Số lượng: {item.quantity}
        </div>
      </div>

      <div className="p-4 flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{item.name}</h3>

        {item.orderItemDetails && item.orderItemDetails.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Tùy chọn:</p>
            <ul className="space-y-2">
              {item.orderItemDetails.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <div>
                    <p className="text-gray-800 break-words">{detail.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.note && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Ghi chú:</p>
            <div className="bg-yellow-100 p-3 rounded text-sm text-gray-700">
              <p className="break-words whitespace-pre-wrap max-h-24 overflow-y-auto">
                {item.note || "No Comment"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onAction}
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 font-medium text-center"
        >
          Đã hoàn thành
        </button>
      </div>
    </div>
  );
}
