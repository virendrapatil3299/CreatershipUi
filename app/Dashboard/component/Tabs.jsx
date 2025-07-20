// Tabs.jsx
export default function Tabs({ tabs, activeTab, setActiveTab }) {
    return (
      <div className="flex gap-4   border-b border-gray-100  mb-1 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-bold text-sm transition ${
              activeTab === tab
                ? 'bg-orange-500 text-white'
                : 'text-gray-600  hover:text-orange-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }
  