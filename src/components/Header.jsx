import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#1ab128] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Kitchen Display</h1>
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#1ab128] font-medium">C</span>
            </div>
            <span className="font-medium">CHEF</span>
          </div>
        </div>
      </div>
    </header>
  );
}
