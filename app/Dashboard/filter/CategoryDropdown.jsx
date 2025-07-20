import { ChevronDown, X } from 'lucide-react';

export default function CategoryDropdown({
  categories,
  selectedCategories,
  toggleCategory,
  isDropdownOpen,
  setIsDropdownOpen,
  clearAll,
  done,
}) {
  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="group bg-[#f2f5f6]  border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition flex items-center"
      >
        Categories:
        <span className="ml-1 font-semibold">
          {selectedCategories.length ? `${selectedCategories.length} selected` : 'All'}
        </span>
        <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-lg z-50">
          <div className="flex items-center   justify-between px-4 py-3 border-b">
            <h4 className="font-semibold  text-sm text-black">Select Categories</h4>
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="text-gray-400 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-4 py-2 max-h-64 overflow-y-auto space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center text-sm space-x-3 text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="w-4 h-4 accent-orange-500 rounded"
                />
                <span className="whitespace-nowrap">{category}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between items-center px-4 py-3 border-t">
            <button onClick={clearAll} className="text-sm text-gray-600 hover:text-gray-800">
              Clear All
            </button>
            <button
              onClick={done}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1.5 rounded-lg font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
