import { ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChefLogin() {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate("/chef");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-6">
          <ChefHat className="w-16 h-16 text-orange-500 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800">Chef Login</h1>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="chef@example.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <button
            onClick={handleClickLogin}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
