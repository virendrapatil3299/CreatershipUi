// TimeFilter.jsx
export default function TimeFilter({ timeRanges, activeTime, setActiveTime }) {
    return (
      <div className="inline-flex items-center bg-[#e3e5e6]  py-1 rounded-full shadow-inner border border-gray-200">
        {timeRanges.map((range) => {
          const isActive = activeTime === range;
          return (
            <button
              key={range}
              onClick={() => setActiveTime(range)}
              className={`px-2 py-1 text-sm font-bold rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-sm'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              {range}
            </button>
          );
        })}
      </div>
    );
  }
  
  // FilterBar.jsx
  import { Filter, Plus, ChevronDown } from 'lucide-react';
  
   function FilterBar() {
    return (
      <div className="flex flex-wrap items-center gap-3 ">
        <button className="group relative bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition">
          Categories: <span className="font-semibold">All</span>
          <ChevronDown className="inline ml-2 h-4 w-4 transition-transform group-hover:rotate-180" />
        </button>
  
        <button className="group relative bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition">
          Location: <span className="font-semibold">All</span>
          <ChevronDown className="inline ml-2 h-4 w-4 transition-transform group-hover:rotate-180" />
        </button>
  
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition">
          <Filter size={16} /> Filter
        </button>
  
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition ml-auto">
          <Plus size={16} /> Add Metric
        </button>
      </div>
    );
  }
  
  // Tabs.jsx
   function Tabs({ tabs, activeTab, setActiveTab }) {
    return (
      <div className="flex gap-4 pt-2 border-b border-gray-100 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-medium text-sm transition ${
              activeTab === tab
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }
  
  // Pagination.jsx
  import { ChevronLeft, ChevronRight } from 'lucide-react';
  
   function Pagination({ currentPage, totalPages, onPrev, onNext }) {
    return (
      <div className="flex justify-between items-center pt-6 pb-10">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    );
  }
  
  // CreatorTable.jsx
  import { Info, ArrowUp, ArrowDown, Bookmark } from 'lucide-react';
  
   function CreatorTable({ loading, creators, sortKey, sortOrder, onSort, onSelectCreator }) {
    const getSortIcon = (key) => {
      if (sortKey !== key) return null;
      return sortOrder === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
    };
  
    return (
      <div className="rounded-2xl overflow-hidden border border-gray-200">
        <div className="bg-gray-50 px-8 py-4 text-xs text-gray-500 font-semibold gap-20 grid grid-cols-4 items-center">
          <span className="col-span-1">CREATORS</span>
          <button onClick={() => onSort('engagement')} className="flex items-center gap-1 hover:text-orange-600">
            ENGAGEMENT RATE {getSortIcon('engagement')} <Info size={12} />
          </button>
          <button onClick={() => onSort('subscribers')} className="flex items-center gap-1 hover:text-orange-600">
            FOLLOWERS {getSortIcon('subscribers')} <Info size={12} />
          </button>
          <button onClick={() => onSort('views')} className="flex items-center gap-1 hover:text-orange-600">
            VIEWS {getSortIcon('views')} <Info size={12} />
          </button>
          
        </div>
  
        {loading ? (
          <div className="px-6 py-8 text-center text-gray-500">Loading creators...</div>
        ) : creators.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">No creators found.</div>
        ) : (
          creators.map((creator, idx) => (
            <button
              onClick={() => onSelectCreator(creator)}
              key={idx}
              className="w-full text-left px-6 py-4 grid grid-cols-4 items-center text-sm border-t border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4 col-span-1">
                {creator.image ? (
                  <img src={creator.image} alt={creator.name} className="w-10 h-10 rounded-full border" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    N/A
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 font-semibold text-gray-900">
                    {creator.name || 'Unknown'} <Bookmark size={14} className="text-orange-500" />
                  </div>
                  <div className="text-gray-500 text-xs">{creator.businessCategory}</div>
                </div>
              </div>
              <div className="text-right text-black font-semibold">{creator.engagement || 'N/A'}</div>
              <div className="text-right text-black font-semibold">{creator.subscribers || 'N/A'}</div>
              <div className="text-right text-black font-semibold">{creator.views || 'N/A'}</div>
            </button>
          ))
        )}
      </div>
    );
  }
  