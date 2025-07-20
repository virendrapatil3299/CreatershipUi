// File: app/dashboard/CreatorSearchDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Filter,
  Info,
  Plus,
  ChevronRight,
  ChevronLeft,
  ArrowDown,
  ArrowUp,
  X,
} from 'lucide-react';
import { Youtube, Instagram, Twitter,ChevronDownIcon  } from 'lucide-react';
import { RefreshCcw } from 'lucide-react';

const timeRanges = ['72H', '1 Week', '2 Weeks', '1 Month'];
const tabs = ['Overview', 'Collaboration History'];
const clearAll = () => setSelected([]);
const apply = () => setOpen(false);
const ITEMS_PER_PAGE = 12;

export default function CreatorSearchDashboard() {
  const [activeTime, setActiveTime] = useState('72H');
  const [activeTab, setActiveTab] = useState('Overview');
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('engagement');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCreator, setSelectedCreator] = useState(null);

  const totalPages = Math.ceil(creators.length / ITEMS_PER_PAGE);

  
     const fetchTopCreators=async()=> {
      setLoading(true);
      try {
        const res = await fetch('/api/you');
        const data = await res.json();
        const sorted = sortCreators(data.creators || [], sortKey, sortOrder);
        setCreators(sorted);
      } catch (err) {
        console.error('Error fetching top creators:', err);
        setCreators([]);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchTopCreators(); // Load once on mount
  }, []);

  function sortCreators(data, key, order) {
    if (!key) return data;
    return [...data].sort((a, b) => {
      const aVal = parseFloat((a[key] || '0').toString().replace(/,/g, '')) || 0;
      const bVal = parseFloat((b[key] || '0').toString().replace(/,/g, '')) || 0;
      return order === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }

  const handleSort = (key) => {
    const newOrder = sortKey === key && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortKey(key);
    setSortOrder(newOrder);
    const sorted = sortCreators(creators, key, newOrder);
    setCreators(sorted);
    setCurrentPage(1);
  };

  const getSortIcon = (key) => {
    if (sortKey !== key) return null;
    return sortOrder === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  };

  const paginatedCreators = creators.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={`relative ${selectedCreator ? 'backdrop-blur-sm' : ''}`}>
      <div className="w-full max-w-6xl mt-5 mx-auto h-[calc(95vh-100px)] overflow-y-auto bg-white rounded-3xl border shadow-md p-6 md:p-10 space-y-10">
        {/* Header */}
        <div className="flex items-center gap-4 mt-4">
          <div className="bg-orange-500 text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl">📈</div>
          <div>
            <h2 className="text-2xl font-bold text-orange-600">Creator Search</h2>
            <p className="text-gray-500 text-sm">Discover the top 100 creators with verified performance metrics</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center bg-[#f5f9fc] px- py-1 rounded-full shadow-inner border border-gray-200">
      {timeRanges.map((range) => {
        const isActive = activeTime === range;
        return (
          <button
            key={range}
            onClick={() => setActiveTime(range)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200
              ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-sm'
                  : 'text-gray-700 hover:text-orange-500'
              }
            `}
          >
            {range}
          </button>
        );
      })}
    </div>
    <div className="flex flex-wrap items-center gap-3">

{/* Category Dropdown */}
<button className="group relative bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition">
  Categories: <span className="font-semibold">All</span>
  <ChevronDownIcon className="inline ml-2 h-4 w-4 transition-transform group-hover:rotate-180" />
</button>

{/* Location Dropdown */}
<button className="group relative bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition">
  Location: <span className="font-semibold">All</span>
  <ChevronDownIcon className="inline ml-2 h-4 w-4 transition-transform group-hover:rotate-180" />
</button>

{/* Filter Button */}
<button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition">
  <Filter size={16} /> Filter
</button>

{/* Add Metric Button */}
<button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition ml-auto">
  <Plus size={16} /> Add Metric
</button>

</div>

        </div>
        

        {/* Tabs */}
        <div className="flex gap-4 pt-2 border-b border-gray-100 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition ${
                activeTab === tab ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

         <div className="">
      <button
        onClick={fetchTopCreators}
        disabled={loading}
        className="flex items-center gap-1 px-1 py-1 bg-orange-400 text-white rounded-full hover:bg-orange-500 disabled:opacity-60"
      >
        <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        {loading }
      </button>

      {creators.length === 0 && !loading }
    </div>
        

        {/* Table */}
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <div className="bg-gray-50 px-8  py-4 text-xs text-gray-500 font-semibold gap-20  grid grid-cols-4 items-center">
            <span className="col-span-1 ">CREATORS</span>
            <button onClick={() => handleSort('engagement')} className="flex items-center gap-1 hover:text-orange-600">
              ENGAGEMENT RATE {getSortIcon('engagement')} <Info size={12} />
            </button>
            <button onClick={() => handleSort('subscribers')} className="flex items-center gap-1 hover:text-orange-600">
              FOLLOWERS {getSortIcon('subscribers')} <Info size={12} />
            </button>
            <button onClick={() => handleSort('views')} className="flex items- gap-1 hover:text-orange-600">
              VIEWS {getSortIcon('views')} <Info size={12} />
            </button>
          </div>

          {loading ? (
            <div className="px-6 py-8 text-center text-gray-500">Loading creators...</div>
          ) : paginatedCreators.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">No creators found.</div>
          ) : (
            paginatedCreators.map((creator, idx) => (
              <button
                onClick={() => setSelectedCreator(creator)}
                key={idx}
                className="w-full text-left px-6 py-4 grid grid-cols-4 items-center text-sm border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4 col-span-1">
                  {creator.username ? (
                    <img src={creator.profilePicUrlHD} alt={creator.username} className="w-10 h-10 rounded-full border" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                      N/A
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      {creator.username || 'Unknown'} <Bookmark size={14} className="text-orange-500" />
                    </div>
                    <div className="text-gray-500 text-xs">{creator.businessCategory}</div>
                  </div>
                </div>
                <div className="text-right text-black font-semibold">{creator.engagementRate || 'N/A'}</div>
                <div className="text-right text-black font-semibold">{creator.followersCount || 'N/A'}</div>
                <div className="text-right text-black font-semibold">{creator.totalViews || 'N/A'}</div>
              </button>
            ))
          )}
        </div>

        <div className="flex justify-between items-center pt-6 pb-10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition ${
              currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition ${
              currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
  <div className="bg-white w-full max-w-2xl p-6 md:p-8 rounded-2xl shadow-2xl h-[calc(95vh-100px)] overflow-y-auto relative">
    
    {/* Close Button */}
    <button
      onClick={() => setSelectedCreator(null)}
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      aria-label="Close"
    >
      <X size={20} />
    </button>

    {/* Header - Profile Info */}
    <div className="flex items-center gap-4">
      {selectedCreator.image ? (
        <img
          src={selectedCreator.profilePicUrl}
          alt={selectedCreator.username}
          className="w-16 h-16 rounded-full border border-gray-300 object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
          N/A
        </div>
      )}
      <div>
        <h3 className="text-2xl font-semibold text-orange-600">{selectedCreator.username}</h3>
        <p className="text-gray-500 text-sm">{selectedCreator.businessCategory}</p>
      </div>
    </div>

    {/* View Channel */}
    <div className="mt-4">
      <Link
        href={selectedCreator.channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-orange-500 hover:underline font-medium"
      >
        View Channel →
      </Link>
    </div>

    {/* Basic Info */}
    <div className="mt-4 space-y-2 text-sm text-gray-700">
      <p>
        <strong className="text-gray-900">Created At:</strong> {selectedCreator.createdAt}
      </p>
      <p>
        <strong className="text-gray-900">Engagement:</strong> {selectedCreator.engagement}
      </p>
      <p>
        <strong className="text-gray-900">Followers:</strong> {selectedCreator.subscribers}
      </p>
      <p>
        <strong className="text-gray-900">Views:</strong> {selectedCreator.views}
      </p>
      <p>
        <strong className="text-gray-900">Videos:</strong> {selectedCreator.videos || '0'}
      </p>
      <p>
        <strong className="text-gray-900">Location:</strong> {selectedCreator.location || 'Unknown'}
      </p>
    </div>

    {/* Description */}
    <div className="mt-4 text-sm text-gray-700">
      <p>
        <strong className="text-gray-900">Description:</strong>{' '}
        {selectedCreator.description || 'No description available.'}
      </p>
    </div>

    {/* Social Links */}
    {selectedCreator.links && (() => {
      const iconMap = {
        youtube: <Youtube size={16} className="inline mr-2 text-red-600" />,
        twitter: <Twitter size={16} className="inline mr-2 text-blue-500" />,
        instagram: <Instagram size={16} className="inline mr-2 text-pink-500" />,
      };
      return (
        <div className="mt-4 text-sm text-gray-700 bg-white rounded-3xl  shadow-md p-6 md:p-10 space-y-10">
          <p className="font-semibold text-gray-900 mb-1">Links:</p>
          <ul className="list-disc list-inside space-y-1">
            {Object.entries(selectedCreator.links).map(([platform, url]) => (
              <li key={platform}>
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline"
                >
                  {iconMap[platform]}
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    })()}
    <div className='mt-4 text-sm text-gray-700 bg-white rounded-3xl  shadow-md p-6 md:p-10 space-y-10'>
      {selectedCreator.recentVideos && selectedCreator.recentVideos.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-gray-900 mb-1">Recent Videos:</p>
          <ul className="list-disc list-inside space-y-1">
            {selectedCreator.recentVideos.map((video, idx) => (
              <li key={idx}>
                {video.title ? (
                  <Link
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline"
                  >
                    {video.title}
                  </Link>
                ) : (
                  <span>No title</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
</div>

      )}
    </div>
  );
}
