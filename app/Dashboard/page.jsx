'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw } from 'lucide-react';
import { Youtube, Instagram, Twitter, X as CloseIcon } from 'lucide-react';
import { FaYoutube } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";

import TimeFilter from './component/TimeFilter';
import FilterBar from './filter/FilterBar';
import Tabs from './component/Tabs';
import Pagination from './component/Pagination';
import CreatorTable from './component/CreatorTable';
import SearchBox from './search/SearchBar';
import CreatorCollaborations from './component/CreatorCollaborations';
import CreatorModal from './component/CreatorDetailPage';

const timeRanges = ['72H', '1 Week', '2 Weeks', '1 Month'];
const tabs = ['Overview', 'Collaboration History'];
const ITEMS_PER_PAGE = 12;

export default function CreatorSearchDashboard() {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [activeTime, setActiveTime] = useState('72H');
  const [activeTab, setActiveTab] = useState('Overview');
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('engagement');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const totalPages = Math.ceil(creators.length / ITEMS_PER_PAGE);

  const fetchTopCreators = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/you');
      const data = await res.json();

      const creatorList = data?.creators || data?.data || [];
      const sorted = sortCreators(creatorList, sortKey, sortOrder);
      setCreators(sorted);
    } catch (err) {
      console.error('❌ Fetch Error:', err.message);
      setErrorMessage('Failed to load creators. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopCreators();
  }, [sortKey, sortOrder]);

  const fetchCreatorById = async (id) => {
    try {
      const res = await fetch(`/api/you?id=${id}`);
      const data = await res.json();
      return data.creator || selectedCreator;
    } catch (err) {
      console.error('Error refreshing creator data:', err);
      return selectedCreator;
    }
  };

  const refreshCreatorData = async () => {
    if (!selectedCreator?.id) return;
    const updated = await fetchCreatorById(selectedCreator.id);
    setSelectedCreator(updated);
  };

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
  };

  const paginatedCreators = creators.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <SearchBox />

      <div className="relative">
        <div className={`${selectedCreator ? 'blur-sm' : ''}`}>
          <div className="w-full max-w-6xl border mt-5 mx-auto h-[calc(95vh-100px)] overflow-y-auto bg-white rounded-3xl  shadow-md p-6 md:p-10 space-y-10">
            {/* Header */}
            <div className="flex items-center border-b-1 border-gray-100 gap-4 mt-2 mb-2">
              <div className="bg-orange-500 text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl">📈</div>
              <div>
                <h2 className="text-2xl font-bold text-orange-600">Creator Search</h2>
                <p className="text-gray-500 text-sm mb-1">
                  Find and analyze micro & nano influencers with detailed performance metrics and growth analytics
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap  items-center gap-2">
  <TimeFilter
    timeRanges={timeRanges}
    activeTime={activeTime}
    setActiveTime={setActiveTime}
  />
  <FilterBar
    setCreators={setCreators}
    setCurrentPage={setCurrentPage}
    loading={loading}
    setLoading={setLoading}
  />
</div>

<CreatorModal
  selectedCreator={selectedCreator}
  onClose={() => setSelectedCreator(null)}
  loading={loading}
  setLoading={setLoading}
// onRefresh={refreshCreatorData}
/>

            

            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Refresh */}
            <div className="flex justify-end mb-2">
              <button
                onClick={fetchTopCreators}
                disabled={loading}
                className="flex items-center  gap-1 px-2 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-90"
              >
                <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading }
              </button>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'Overview' && (
                <>
                  {loading ? (
                    <p className="text-center text-sm text-gray-400">Loading creators...</p>
                  ) : creators.length > 0 ? (
                    <CreatorTable
                      loading={loading}
                      creators={paginatedCreators}
                      sortKey={sortKey}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      onSelectCreator={setSelectedCreator}
                    />
                  ) : (
                    <p className="text-center text-gray-500 text-sm">🚫 Data not available</p>
                  )}
                  {creators.length > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                      totalItems={creators.length}
                      onPrev={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
                      onNext={() => currentPage < totalPages && setCurrentPage((p) => p + 1)}
                    />
                  )}
                </>
              )}
              {activeTab === 'Collaboration History' && <CreatorCollaborations />}
            </div>
          </div>
        </div>

        {/* Modal */}
        <CreatorModal
          selectedCreator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
          onRefresh={refreshCreatorData}
        />
      </div>
    </div>
  );
}
