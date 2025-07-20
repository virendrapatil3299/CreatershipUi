import { X } from 'lucide-react';

export default function MetricModal({
  selectedMetrics,
  toggleMetric,
  defaultMetrics,
  additionalMetrics,
  selectAll,
  deselectAll,
  onClose,
  onApply,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative text-black">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Customize Metrics</h2>

        <div className="flex items-center justify-between mb-3">
          <input
            type="text"
            placeholder="Search metrics..."
            className="w-full max-w-65 bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
          <div className="ml-3 flex gap-2">
            <button onClick={selectAll} className="bg-gray-100 text-sm px-3 py-1 rounded-md">
              Select All
            </button>
            <button onClick={deselectAll} className="bg-gray-100 text-sm px-3 py-1 rounded-md">
              Deselect All
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-semibold mb-1">
              Default Metrics
              <span className="inline text-orange-500 bg-orange-100 text-xs px-2 py-0.5 rounded-full ml-1">
                Recommended
              </span>
            </div>
            {defaultMetrics.map((metric) => (
              <label key={metric} className="flex items-center space-x-2 py-1 text-sm">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric)}
                  onChange={() => toggleMetric(metric)}
                  className="accent-orange-500"
                />
                <span>{metric}</span>
              </label>
            ))}
          </div>

          <div>
            <div className="text-sm font-semibold mb-1">Additional Metrics</div>
            {additionalMetrics.map((metric) => (
              <label key={metric} className="flex items-center space-x-2 py-1 text-sm">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric)}
                  onChange={() => toggleMetric(metric)}
                  className="accent-orange-500"
                />
                <span>{metric}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onClose} className="text-sm text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button
            onClick={onApply}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-md"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
