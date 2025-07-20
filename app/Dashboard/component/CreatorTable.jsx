// CreatorTable.jsx
import { Info, ArrowUp, ArrowDown, Bookmark } from 'lucide-react';

export default function CreatorTable({ loading, creators, sortKey, sortOrder, onSort, onSelectCreator }) {
  const getSortIcon = (key) => {
    if (sortKey !== key) return null;
    return sortOrder === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 ">
      <div className="bg-gray-50 px-4 py-4 text-xs text-gray-500 font-semibold justify-items-end grid grid-cols-4 items-center">
        <span className="col-span-1 mr-10">CREATORS</span>
        <button onClick={() => onSort('engagement')} className="flex items-center gap-1 hover:text-orange-600">
          ENGAGEMENT RATE {getSortIcon('engagement')} <Info size={12} />
        </button>
        <button onClick={() => onSort('subscribers')} className="flex items-center gap- hover:text-orange-600">
          FOLLOWERS {getSortIcon('subscribers')} <Info size={12} />
        </button>
        <button onClick={() => onSort('views')} className="flex items-center gap-1 hover:text-orange-600">
          VIEWS {getSortIcon('views')} <Info size={12} />
        </button>
      </div>

      {loading ? (
        
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
        </div>
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
             
              {creator.profilePicUrlHD ? (
                
                <img src={creator.profilePicUrlHD} alt={creator.username} className="w-10 h-10 rounded-full border" />
              ) : (
               <div className="w-10 h-10 rounded-full border shadow-md flex items-center justify-center bg-gray-200 text-gray-700 text-3xl font-bold uppercase">
              {creator.username?.[0] || "?"}
            </div>
              )}
              <div>
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  {creator.username || 'Unknown'} <Bookmark size={14} className="text-orange-500" />
                </div>
                <div className="text-gray-500 text-xs">{creator.businessCategoryName}</div>
              </div>
            </div>
            <div className="text-right text-black font-semibold">{creator.engagementRate || 'N/A'}</div>
            <div className="text-right text-black font-semibold">{creator.followers || 'N/A'}</div>
            <div className="text-right text-black font-semibold">{creator.totalViews || 'N/A'}</div>
          </button>
        ))
      )}
    </div>
  );
}
