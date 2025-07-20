'use client';

import { useState } from 'react';
import { Crown, Search } from 'lucide-react';
import { Bookmark, BookmarkCheck, X } from 'lucide-react';
import { FaCrown, FaDollarSign } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { AiOutlineEye } from 'react-icons/ai';
import SearchBar from './SearchBar';
import { ExternalLink } from 'lucide-react';

const categories = [
  'Image & Video',
  'Health & Fitness',
  'Music',
  'Business',
  'Shopping',
  'Education',
  'Entertainment',
  'Book',
  'News',
  'Games',
  'Games - Action',
  'Games - Puzzle',
  'Finance',
  'Productivity',
  'Social Networking',
  'Travel',
  'Lifestyle',
  'Utilities',
  'Weather',
  'Food & Drink',
  'Reference',
  'Sports',
  'Navigation',
  'Medical',
  'Catalogs',
  'Newsstand',
  'Graphics & Design',
  'Productivity & Tools',
  'Lifestyle & Personalization',
  'Health & Fitness & Medical',
];

export default function AppStoreTools() {
  const [activeTab, setActiveTab] = useState('top');
  const [category, setCategory] = useState('News');
  const [appType, setAppType] = useState('free');
  const [appId, setAppId] = useState('');
  const [appData, setAppData] = useState(null);
  const [similarApps, setSimilarApps] = useState([]);
  const [appResults, setAppResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null); // 🔥 MODAL STATE

  const fetchAppInfo = async () => {
    setLoading(true);
    setError(null);
    setAppData(null);
    setSimilarApps([]);

    try {
      const res = await fetch(`/api/fetchApp?id=${appId}`);
      const data = await res.json();

      if (res.ok) {
        setAppData(data);

        const simRes = await fetch(`/api/similarApps?id=${appId}`);
        const simData = await simRes.json();
        if (simRes.ok) {
          setSimilarApps(simData);
        } else {
          console.warn('Failed to fetch similar apps:', simData);
        }
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      console.error(err);
      setError('Request failed');
    }

    setLoading(false);
  };

  const handleLoad = async () => {
    if (!category) {
      alert('Please select a category.');
      return;
    }

    setLoading(true);
    setError(null);
    setAppResults([]);

    try {
      const response = await fetch(
        `/api/topAppsByIndustry?industry=${encodeURIComponent(category)}&type=${appType}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load apps');
      }

      setAppResults(data);
    } catch (error) {
      console.error('Error loading apps:', error.message);
      setError(error.message || 'Unknown error');
    }

    setLoading(false);
  };

  return (
    <div>
      <SearchBar />

      <div className="w-full max-w-6xl mt-5 mx-auto h-[calc(95vh-100px)] overflow-y-auto bg-white rounded-3xl border shadow-md p-6 md:p-10 space-y-10">
        <h1 className="text-3xl mt-5 font-bold text-[#f4644e] flex justify-center items-center mb-2">
          <img src="/App_Store.webp" className="h-8 w-8" />
          <span className="ml-2">App Store Tools</span>
        </h1>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto text-center">
          Discover powerful tools to analyze the app ecosystem. Find similar apps and explore top-performing applications across various categories.
        </p>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {[
              { id: 'top', label: 'Top App Store Apps', icon: <Crown className="w-4 h-4 mr-1" /> },
              { id: 'similar', label: 'Similar Apps Finder', icon: <Search className="w-4 h-4 mr-1" /> },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-2 flex items-center rounded-md text-sm font-medium transition ${
                  activeTab === id ? 'bg-[#f4644e] text-white shadow' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Similar Apps Tab */}
        {activeTab === 'similar' && (
          <div className="max-w-6xl mx-auto bg-white border rounded-xl shadow p-8 space-y-6">
            <h2 className="text-2xl font-bold text-[#f4644e] flex items-center">
              <Search className="w-6 h-6 mr-2" />
              Find Similar Apps
            </h2>
            <p className="text-gray-600 text-sm">
              Discover apps similar to any App Store application. Enter an App Store URL or App ID to find related apps.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <input
                type="text"
                placeholder="Enter App Store URL or App ID (e.g., 835599320)"
                className="flex-1 text-black border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4644e]"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
              />
              <button
                onClick={fetchAppInfo}
                className="bg-gradient-to-r from-[#f4644e] to-[#f88f7d] text-white text-sm font-medium px-6 py-3 rounded-lg flex items-center justify-center shadow-sm hover:from-[#e65b43]"
              >
                <Search className="w-4 h-4 mr-2" /> Find Similar Apps
              </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="text-sm text-gray-600 mt-2">
              <p className="font-semibold">Examples:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>App Store URL: https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580</li>
                <li>App ID: 324684580</li>
              </ul>
            </div>

            {similarApps.length > 0 && (
              <div className="mt-10">
                <h3 className="text-black font-bold text-2xl mb-4">Similar Apps</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {similarApps.map((app) => (
                    <div key={app.id} className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-4">
                      <div className="flex items-start gap-4">
                        <img src={app.icon} alt={app.title} className="w-14 h-14 rounded-xl" />
                        <div className="flex-1">
                          <h4 className="text-md font-semibold text-gray-900">{app.title}</h4>
                          <p className="text-sm text-gray-500">{app.developer}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                        <div className="text-yellow-500 font-medium flex items-center gap-1">
                          ⭐ <span>{app.score}</span>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">Excellent</span>
                      </div>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-green-600">${app.price}</span>
                        <span>{app.released}</span>
                      </div>
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="mt-4 border border-red-400 text-red-500 font-medium py-2 text-center rounded-lg flex items-center justify-center gap-2 hover:bg-red-50 transition w-full"
                      >
                        <AiOutlineEye size={20} />
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Top Apps Tab */}
        {activeTab === 'top' && (
          <div className="max-w-5xl mx-auto bg-white border rounded-xl shadow-lg p-6 md:p-8 space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-orange-600">
              <Crown />
              Browse Top App Store Apps
            </h1>
            <p className="text-center text-gray-500 text-sm md:text-base">
              Discover the top-performing {appType === 'free' ? 'free' : 'paid'} apps in various categories from the App Store.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category & Type Selectors */}
              <div>
                <label className="block text-sm font-semibold text-gray-800">Select App Category</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-300 text-gray-800 text-sm rounded-xl py-3 px-4 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  >
                    <option value="" disabled>
                      -- Choose a Category --
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">App Type</label>
                <div className="flex bg-gray-100 rounded-full overflow-hidden">
                  <button
                    onClick={() => setAppType('free')}
                    className={`flex-1 py-2 text-sm font-medium flex items-center justify-center gap-2 transition ${
                      appType === 'free' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-orange-100'
                    }`}
                  >
                    <FaDollarSign /> Free Apps
                  </button>
                  <button
                    onClick={() => setAppType('paid')}
                    className={`flex-1 py-2 text-sm font-medium flex items-center justify-center gap-2 transition ${
                      appType === 'paid' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-orange-100'
                    }`}
                  >
                    <FaCrown /> Paid Apps
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleLoad}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <HiOutlineSearch className="w-5 h-5" />
              Load Apps
            </button>

            <p className="text-sm text-gray-600 text-center">
              <strong>Currently showing:</strong> {category} • Type: {appType === 'free' ? 'Free Apps' : 'Paid Apps'} • Country: US
            </p>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading && <p className="text-center text-gray-500">Loading apps...</p>}

            {appResults.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {appResults.map((app) => (
                  <div
                    key={app.id}
                    className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <img src={app.icon} alt={app.title} className="w-14 h-14 rounded-xl" />
                      <div className="flex-1">
                        <h4 className="text-md font-semibold text-gray-900">{app.title}</h4>
                        <p className="text-sm text-gray-500">{app.developer}</p>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                      <p className="text-green-500">$ : {app.price}</p>
                      <p>{app.released}</p>
                    </div>

                    <button
                      onClick={() => setSelectedApp(app)}
                      className="mt-4 border border-orange-400 text-orange-500 font-medium text-center py-1 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-50 transition"
                    >
                      <AiOutlineEye size={20} />
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 🔥 Modal */}
      {selectedApp && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
    <div className="bg-white w-full max-w-3xl h-[calc(100vh-80px)] overflow-y-auto rounded-2xl shadow-2xl p-6 relative">
      <button
        onClick={() => setSelectedApp(null)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <h2 className="text-md font-semibold text-gray-600 mb-1">App Details</h2>
      <p className="text-sm text-gray-500 mb-4">{selectedApp.title}</p>

      {/* App Info */}
      <div className="flex items-start gap-4 mb-4 ">
        <img src={selectedApp.icon} alt={selectedApp.title} className="w-16 h-16 rounded-xl" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{selectedApp.title}</h3>
          <p className="text-sm text-gray-500">by {selectedApp.developer}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-1 rounded-full">Finance</span>
            <span className="text-xs bg-green-100 text-green-800 font-semibold px-2 py-1 rounded-full">4+</span>
          </div>
          
        </div>
        <div className="flex flex-col gap-2">
          <a
            href={selectedApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#fd684f] text-white text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-[#f45339] transition"
          >
            App Store
          </a>
          <button className="bg-orange-50 text-orange-500 text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-orange-100 transition">
            📊 Request Brand Analytics
          </button>
        </div>
      </div>

      {/* Badges Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-800 mb-6">
        <div className="bg-blue-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">📅 Released</p>
          <p className="font-semibold">{selectedApp.released || 'October 16, 2013'}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">💾 Size</p>
          <p className="font-semibold">{selectedApp.size || '291.01 MB'}</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">👶 Age</p>
          <p className="font-semibold">{selectedApp.age || '4+'}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">🛠️ Version</p>
          <p className="font-semibold">{selectedApp.version || '5.5.0'}</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">⭐ Rating</p>
          <p className="font-semibold">
            {selectedApp.score || '4.8'} ({selectedApp.ratings || '7,626,261'})
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">💰 Price</p>
          <p className="font-semibold">{selectedApp.price === '0' ? 'Free Download' : `$${selectedApp.price}`}</p>
        </div>
      </div>

       {/* What's New */}
       {selectedApp.releaseNotes && (
        <div className="bg-blue-50 p-3 mb-4 rounded-xl">
          <h4 className="text-md text-black font-semibold mb-2">🆕 What’s New</h4>
          <p className="text-sm text-gray-700">{selectedApp.releaseNotes || 'Bug Fixes and Improvements'}</p>
        </div>
      )}

      {/* Description */}
      <div className="text-sm text-black p-6 mb-5 bg-white rounded-3xl border shadow-md">
                <p className='mb-3 font-bold'>Description</p>
                <p className="line-clamp-3">
                {selectedApp.description || 'No description available.'}
                   </p>
                    </div>

      

      {/* Categories & Languages */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-black">
        <div className="bg-blue-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">🧭 Categories</p>
          <p className="font-semibold">{selectedApp.industry || 'Finance'}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">🌐 Languages</p>
          <p className="font-semibold">{selectedApp.languages?.join(', ') || 'EN'}</p>
        </div>
      </div>

     

      {/* Technical Info */}
      <div className="bg-purple-50 p-4 rounded-xl mb-6 text-sm text-gray-800 space-y-1">
        <p><strong>📱 iOS:</strong> {selectedApp.iosVersion || '16.0+'}</p>
        <p><strong>📆 Updated:</strong> {selectedApp.updated || 'June 23, 2025'}</p>
        <p><strong>📦 Bundle:</strong> {selectedApp.appId || 'com.squareup.cash'}</p>
        <p>
          <strong>📲 Devices:</strong>{' '}
          {selectedApp.supportedDevices?.slice(0, 4).join(', ') || 'iPhone 5s, iPad Air'} +{selectedApp.devices?.length - 4 || '110'}
        </p>
      </div>

      {/* Screenshots */}
      {selectedApp.screenshots?.length > 0 && (
        <>
          <h4 className="text-md font-semibold text-gray-800 mb-2">📸 iPhone Screenshots</h4>
          <div className="flex flex-wrap gap-4">
            {selectedApp.screenshots.slice(0, 5).map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Screenshot ${index + 1}`}
                className="w-[160px] h-[320px] object-cover rounded-lg border"
              />
            ))}
          </div>
        </>
      )}
    </div>
  </div>
)}

    </div>
  );
}
