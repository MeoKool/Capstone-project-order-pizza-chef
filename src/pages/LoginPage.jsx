"use client";

import { useState, useEffect } from "react";
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
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Enhanced parallax effect for background and card
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Background parallax
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      setBackgroundPosition({ x, y });

      // Card parallax
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

        // Store token and user info in localStorage
        localStorage.setItem("token", response.result.token);
        localStorage.setItem("userRole", decodedToken.role);
        localStorage.setItem("userName", decodedToken.name);
        localStorage.setItem("tokenExpiration", response.result.expiration);

        // Redirect based on role
        if (decodedToken.role === "ScreenChef") {
          toast.success("Đăng nhập thành công!");
          navigate("/chef");
        } else if (decodedToken.role === "ScreenWaiter") {
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden relative">
      {/* Enhanced background with multiple layers and parallax effect */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base background image */}
        <div
          className="absolute inset-0 bg-[url('/images/restaurant-bg.jpg')] bg-cover bg-center"
          style={{
            transform: `translate(${-backgroundPosition.x}px, ${-backgroundPosition.y}px)`,
            transition: "transform 0.5s ease-out",
          }}
        ></div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/90 via-orange-900/80 to-black/90"></div>

        {/* Animated particles/steam effect */}
        <div className="absolute inset-0 opacity-40">
          {/* Steam/smoke particles */}
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-3/4 right-1/3 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-float-fast"></div>
          <div className="absolute top-1/2 left-2/3 w-48 h-48 bg-amber-300/10 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-orange-400/10 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>

        {/* Floating ingredients */}
        <div className="absolute top-[15%] left-[10%] w-16 h-16 opacity-20 animate-float-slow">
          <div className="w-full h-full bg-[url('/images/herb1.png')] bg-contain bg-no-repeat bg-center"></div>
        </div>
        <div className="absolute top-[70%] right-[15%] w-20 h-20 opacity-20 animate-float-medium">
          <div className="w-full h-full bg-[url('/images/spice1.png')] bg-contain bg-no-repeat bg-center"></div>
        </div>
        <div className="absolute top-[30%] right-[20%] w-14 h-14 opacity-20 animate-float-fast">
          <div className="w-full h-full bg-[url('/images/herb2.png')] bg-contain bg-no-repeat bg-center"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div
          className="relative"
          style={{
            transform: `perspective(1000px) rotateX(${
              mousePosition.y * 5
            }deg) rotateY(${-mousePosition.x * 5}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          {/* Glowing effect behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur-lg opacity-70 animate-pulse-slow"></div>

          <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600"></div>

            {/* Glass reflections */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-white/5 skew-y-[-5deg] transform -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/5 skew-y-[5deg] transform translate-y-12"></div>

            <div className="p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-6 group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse-slow"></div>
                  <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-full shadow-lg group-hover:shadow-amber-500/50 transition-all duration-300">
                    <ChefHat className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100 drop-shadow-md">
                  Đăng nhập
                </h1>
                <p className="text-amber-100/80 mt-2">
                  Nhập thông tin đăng nhập của bạn
                </p>
                <p className="text-amber-100/80 mt-2">
                  Tài khoản bếp:{" "}
                  <span className="text-white font-bold ">adminchef</span> |{" "}
                  <span className="text-white font-bold">Abc@12345</span>
                </p>
                <p className="text-amber-100/80 mt-2">
                  Tài khoản phục vụ:{" "}
                  <span className="text-white font-bold">adminstaff</span> |{" "}
                  <span className="text-white font-bold">Abc@12345</span>
                </p>
              </div>

              {error && (
                <div className="mb-6 animate-pulse">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-red-500/20 rounded-lg blur-sm"></div>
                    <div className="relative bg-red-900/30 backdrop-blur-sm border border-red-500/30 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                        <p className="text-red-200">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-amber-100"
                  >
                    Tên đăng nhập
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-md opacity-50 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-amber-500" />
                      </div>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 bg-black/30 backdrop-blur-sm border border-amber-500/30 rounded-md shadow-sm placeholder-amber-300/50 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                        placeholder="Nhập tên đăng nhập"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-amber-100"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-md opacity-50 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-amber-500" />
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 bg-black/30 backdrop-blur-sm border border-amber-500/30 rounded-md shadow-sm placeholder-amber-300/50 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                        placeholder="Nhập mật khẩu"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-md blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`relative w-full flex justify-center py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-md shadow-lg text-white font-medium transition-all duration-300 ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Đang đăng nhập...
                        </div>
                      ) : (
                        "Đăng nhập"
                      )}
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-amber-200/60">
                  Hệ thống quản lý nhà hàng | Dành cho Đầu bếp & Phục vụ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
