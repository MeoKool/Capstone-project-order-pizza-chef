import { useState } from "react";
import { ChefHat, User, Lock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoginStaff } from "../API/api";
import { decodeJWT } from "../utils/jwt";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await LoginStaff({ username, password });

      if (response.success && response.result.token) {
        // Decode the JWT token
        const decodedToken = decodeJWT(response.result.token);

        if (!decodedToken) {
          throw new Error("Token không hợp lệ");
        }

        // Store token and user info in sessionStorage
        sessionStorage.setItem("token", response.result.token);
        sessionStorage.setItem("userRole", decodedToken.role);
        sessionStorage.setItem("userName", decodedToken.name);
        sessionStorage.setItem("tokenExpiration", response.result.expiration);

        // Redirect based on role
        if (decodedToken.role === "Cheff") {
          toast.success("Đăng nhập thành công!");
          navigate("/chef");
        } else if (decodedToken.role === "Staff") {
          toast.success("Đăng nhập thành công!");
          navigate("/staff");
        } else {
          throw new Error("Bạn không có quyền truy cập vào trang này");
        }
      } else {
        throw new Error("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      // Extract error message from API response if available
      let errorMessage = "Đăng nhập thất bại. Vui lòng thử lại.";

      if (err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error.message || errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <ChefHat className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Đăng nhập</h1>
          <p className="text-gray-600 mt-2">Nhập thông tin đăng nhập của bạn</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Tên đăng nhập
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên đăng nhập"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mật khẩu"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
