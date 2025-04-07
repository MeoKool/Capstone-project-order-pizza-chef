import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { GetCancelReasons } from "../../API/api";

export function CancelReasonDialog({ isOpen, onClose, onConfirm, itemId }) {
  const [reasons, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchReasons();
    }
  }, [isOpen]);

  const fetchReasons = async () => {
    setIsLoading(true);
    try {
      const response = await GetCancelReasons();
      // Filter reasons for Chef type
      const chefReasons = response.items.filter(
        (item) => item.reasonType === "Chef"
      );
      setReasons(chefReasons);
      // Set the first reason as default selected
      if (chefReasons.length > 0) {
        setSelectedReason(chefReasons[0].reason);
      }
    } catch (err) {
      setError("Không thể tải danh sách lý do hủy");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Chọn lý do hủy
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : (
            <div className="space-y-3">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start">
                  <input
                    type="radio"
                    id={`reason-${index}`}
                    name="cancelReason"
                    value={reason.reason}
                    checked={selectedReason === reason.reason}
                    onChange={() => setSelectedReason(reason.reason)}
                    className="mt-1 h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <label
                    htmlFor={`reason-${index}`}
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    {reason.reason}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={() => onConfirm(itemId, selectedReason)}
            disabled={isLoading || !selectedReason}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Xác nhận hủy
          </button>
        </div>
      </div>
    </div>
  );
}
