'use client';

import { Filter } from 'lucide-react';

export default function FiltersAndTabs() {
  const tabs = ['Overview', 'Collaboration History', 'Performance', 'Content Analysis', 'Audience'];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <select className="px-3 py-2 rounded-lg border bg-white shadow-sm">
            <option>Categories: All</option>
          </select>
          <select className="px-3 py-2 rounded-lg border bg-white shadow-sm">
            <option>Location: All</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-md">
          + Add Metric
        </button>
      </div>
      <div className="flex gap-6 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              tab === 'Overview'
                ? 'text-orange-600 font-semibold border-b-2 border-orange-500'
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
}
