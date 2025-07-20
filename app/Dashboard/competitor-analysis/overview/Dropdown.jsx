'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const industryOptions = [
  {
    label: 'AI Tools',
    children: ['AI Marketing', 'AI Video', 'AI Art'],
  },
  { label: 'Beauty & Personal Care' },
  { label: 'Book' },
  { label: 'Business' },
  { label: 'Content Creation & Design' },
  { label: 'Developer Tools' },
  { label: 'Education' },
  { label: 'Entertainment' },
];

export default function IndustryMultiSelectDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const toggleSelect = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const toggleExpand = (label) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  const handleClear = () => setSelected([]);
  const handleDone = () => setOpen(false);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-800 flex items-center gap-2"
      >
        Industry:
        <span className="font-semibold">
          {selected.length ? `${selected.length} selected` : 'All'}
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute z-50 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <span className="font-medium text-sm text-gray-700">
              Select Industries
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close dropdown"
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>

          {/* Options */}
          <div className="max-h-72 overflow-y-auto px-3 py-2 space-y-2">
            {industryOptions.map((option) => (
              <div key={option.label}>
                <div className="flex items-center gap-2">
                  {option.children && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(option.label)}
                      aria-expanded={expanded === option.label}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expanded === option.label ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                  )}

                  <input
                    type="checkbox"
                    id={option.label}
                    checked={selected.includes(option.label)}
                    onChange={() => toggleSelect(option.label)}
                    className="accent-orange-500"
                  />
                  <label htmlFor={option.label} className="text-sm text-gray-800">
                    {option.label}
                  </label>
                </div>

                {option.children && expanded === option.label && (
                  <div className="ml-6 mt-1 space-y-1">
                    {option.children.map((child) => (
                      <div key={child} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={child}
                          checked={selected.includes(child)}
                          onChange={() => toggleSelect(child)}
                          className="accent-orange-500"
                        />
                        <label htmlFor={child} className="text-sm text-gray-700">
                          {child}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <button
              onClick={handleClear}
              className="text-sm text-gray-600 hover:underline"
            >
              Clear All
            </button>
            <button
              onClick={handleDone}
              className="px-4 py-1.5 text-sm rounded-md bg-orange-500 text-white hover:bg-orange-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
