export function KitchenHeader({ onRefresh }) {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Bếp</h1>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 font-medium"
        >
          Làm mới
        </button>
      </div>
    </header>
  );
}
