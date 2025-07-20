import { ChevronDown, X } from 'lucide-react';

export default function LocationDropdown({
  countries,
  selectedLocations,
  setSelectedLocations,
  isLocationDropdownOpen,
  setIsLocationDropdownOpen,
}) {
  return (
    <div className="relative inline-block">
      <div
        onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
        className="cursor-pointer group bg-[#f2f5f6] border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition"
      >
        Location:{' '}
        <span className="font-semibold">
          {selectedLocations.length ? `${selectedLocations.length} selected` : 'All'}
        </span>
        <ChevronDown className="inline ml-2 h-4 w-4 transition-transform group-hover:rotate-180" />
      </div>

      {isLocationDropdownOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-lg z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h4 className="font-semibold text-sm">Select Locations</h4>
            <button
              onClick={() => setIsLocationDropdownOpen(false)}
              className="text-gray-400 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-4 py-2 max-h-64 overflow-y-auto space-y-2">
            {countries.map((country) => (
              <label
                key={country}
                className="flex items-center text-sm space-x-3 text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(country)}
                  onChange={() =>
                    setSelectedLocations((prev) =>
                      prev.includes(country)
                        ? prev.filter((c) => c !== country)
                        : [...prev, country]
                    )
                  }
                  className="w-4 h-4 accent-orange-500 rounded"
                />
                <span className="whitespace-nowrap">{country}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between items-center px-4 py-3 border-t">
            <button
              onClick={() => setSelectedLocations([])}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsLocationDropdownOpen(false)}
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
