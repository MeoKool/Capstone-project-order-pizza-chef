import { RefreshCw, UserCircle, Clock, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function StaffHeader({ onRefresh }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleLogout = () => {
    // You can add any logout logic here (clear tokens, etc.)
    navigate("/");
  };

  return (
    <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <UserCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Nhân viên</h1>
            <div className="hidden md:flex items-center gap-6 ml-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Hoạt động</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {currentTime.toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 ${
                isRefreshing ? "opacity-75" : ""
              }`}
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="font-medium">Làm mới</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
