import { useState } from 'react';
import { Filter, Plus } from 'lucide-react';
import RangeSlider from './RangeSlider';
import CategoryDropdown from './CategoryDropdown';
import LocationDropdown from './LocationDropdown';
import MetricModal from './MetricModal';

export default function FilterBar({ setCreators, setCurrentPage }) {
  const countries = ['USA', 'India', 'UK', 'Germany', 'Canada'];
  const categories = ['Fitness', 'Gaming', 'Education', 'Beauty', 'Food'];

  const tabs = [
    'All Creators',
    'Top Gainers',
    'Most Active',
    'Highest Engagement Rate',
    'Top Trending',
    'Top ROI Potential',
    'Fastest Growing Niches',
    'High-Impact Creators',
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState(['Engagement Rate', 'Followers', 'Views']);
  const [sortKey, setSortKey] = useState('engagement');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewsRange, setViewsRange] = useState([0, 100000000]);
  const [followersRange, setFollowersRange] = useState([0, 1000000]);
  const [engagementRange, setEngagementRange] = useState([0, 10000]);
  const [activeTab, setActiveTab] = useState('All Creators');

  const [loading, setLoading] = useState(false);
  const defaultMetrics = ['Engagement Rate', 'Followers', 'Views'];
  const additionalMetrics = ['Likes'];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleMetric = (metric) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]
    );
  };

  const clearAll = () => setSelectedCategories([]);
  const done = () => setIsDropdownOpen(false);
  const selectAll = () => setSelectedMetrics([...defaultMetrics, ...additionalMetrics]);
  const deselectAll = () => setSelectedMetrics([]);

  const apply = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        views: viewsRange.join(','),
        followers: followersRange.join(','),
        engagement: engagementRange.join(','),
        sortKey,
        sortOrder,
      });

      const res = await fetch(`/api/you?${params.toString()}`);
      const data = await res.json();
      setCreators(data.creators || []);
      setCurrentPage(1);
      console.log(data);
    } catch (err) {
      console.error('Error applying filters:', err);
      setCreators([]);
    } finally {
      setLoading(false);
      setIsFilterVisible(false);
    }
  };

  return (
    <div className="p-5 ">
      <div className="flex flex-wrap items-center gap-2">
        <CategoryDropdown
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          clearAll={clearAll}
          done={done}
        />

        <LocationDropdown
          countries={countries}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          isLocationDropdownOpen={isLocationDropdownOpen}
          setIsLocationDropdownOpen={setIsLocationDropdownOpen}
        />

        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className="flex items-center gap-2 bg-[#f2f5f6] border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition"
        >
          <Filter size={16} /> Filter
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#f2f5f6] border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition ml-auto"
        >
          <Plus size={16} /> Add Metric
        </button>
      </div>

      {isFilterVisible && (
        <div className="bg-[#f9fbfc] mt-4  rounded-2xl p-6 space-y-6 text-black">
          <h3 className="font-semibold text-md">Filter</h3>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:border-orange-400 hover:text-orange-500 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <h3 className="font-semibold text-md">Advanced Filter</h3>

          <RangeSlider label="Views" min={0} max={100000000} step={100000} values={viewsRange} onChange={setViewsRange} />
          <RangeSlider label="Followers" min={0} max={1000000} step={1000} values={followersRange} onChange={setFollowersRange} />
          <RangeSlider
            label="Engagement Rate (%)"
            min={0}
            max={10000}
            step={10}
            values={engagementRange}
            onChange={setEngagementRange}
            suffix="%"
            maxLabel="10000%"
          />

          <div className="flex justify-end">
            <button
              onClick={apply}
              disabled={loading}
              className={`${
                loading ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
              } text-white text-sm px-6 py-2 rounded-full transition`}
            >
              {loading ? 'Applying...' : 'Apply'}
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
        </div>
      )}

      {isModalOpen && (
        <MetricModal
          selectedMetrics={selectedMetrics}
          toggleMetric={toggleMetric}
          defaultMetrics={defaultMetrics}
          additionalMetrics={additionalMetrics}
          selectAll={selectAll}
          deselectAll={deselectAll}
          onClose={() => setIsModalOpen(false)}
          onApply={apply}
        />
      )}
    </div>
  );
}
