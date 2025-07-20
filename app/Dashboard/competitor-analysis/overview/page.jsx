'use client';

import { useEffect, useState } from 'react';
import { Bookmark, BookmarkCheck, X } from 'lucide-react';
import IndustryMultiSelectDropdown from './Dropdown';
import SearchBar from '../SearchBar';
import { ExternalLink } from 'lucide-react';

const industries = [
  'Image & Video', 'Health & Fitness', 'Music', 'Business',
  'Shopping', 'Education', 'Entertainment', 'Book', 'News', 'Travel', 'Games'
];

const industryIcons = {
  'Image & Video': '🖼️',
  'Health & Fitness': '💪',
  'Music': '🎵',
  'Business': '🏢',
  'Shopping': '🛒',
  'Education': '📘',
  'Entertainment': '🍿',
  'Book': '📚',
  'News': '📰',
  'Travel': '✈️',
  'Games': '🎮',
};

const industryColors = {
  'Image & Video': 'bg-orange-100 text-orange-700',
  'Health & Fitness': 'bg-green-100 text-green-700',
  'Music': 'bg-blue-100 text-blue-700',
  'Business': 'bg-emerald-100 text-emerald-700',
  'Shopping': 'bg-red-100 text-red-700',
  'Education': 'bg-teal-100 text-teal-700',
  'Entertainment': 'bg-yellow-100 text-yellow-700',
  'Book': 'bg-lime-100 text-lime-700',
  'News': 'bg-indigo-100 text-indigo-700',
  'Games': 'bg-purple-100 text-purple-700',
  'Travel': 'bg-pink-100 text-pink-700',
};

export default function IndustryBrowser() {
  const [selected, setSelected] = useState('Image & Video');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedApps, setSavedApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('savedApps');
    if (stored) setSavedApps(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('savedApps', JSON.stringify(savedApps));
  }, [savedApps]);

  const toggleSave = (appId) => {
    setSavedApps((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/topAppsByIndustry?industry=${encodeURIComponent(selected)}`);
      const data = await res.json();
      setApps(data);
    } catch (e) {
      console.error('Fetch error:', e);
    }
    setLoading(false);
  };

  const fetchAppsByMultipleIndustries = async (industries) => {
    setLoading(true);
    try {
      const query = industries.length ? `?industries=${encodeURIComponent(industries.join(','))}` : '';
      const res = await fetch(`/api/topAppsByIndustries${query}`);
      const data = await res.json();
      setApps(data);
    } catch (e) {
      console.error('Multi-fetch error:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedIndustries.length > 0) {
      fetchAppsByMultipleIndustries(selectedIndustries);
    } else if (selected) {
      fetchApps();
    } else {
      setApps([]);
    }
  }, [selected, selectedIndustries]);

  return (
    <div>
      <SearchBar />
      <div className="w-full max-w-6xl mt-5 mx-auto h-[calc(95vh-100px)] overflow-y-auto bg-white rounded-3xl border shadow-md p-6 md:p-10 space-y-10">
        <div className="bg-[#FFF5F3] rounded-2xl p-6 shadow-sm border border-orange-100 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center text-white text-2xl">🌐</div>
            <div>
              <h2 className="text-4xl font-bold text-orange-600">Uncover Competitor Brand Strategies</h2>
              <p className="text-xl font-semibold text-gray-800 mt-1">Track Performance, Creators & Content Success</p>
              <p className="text-gray-600 mt-2">
                Dive deep into competitor brand strategies with data-driven insights. Analyze their creator partnerships, track top-performing content, and discover winning tactics to outperform the competition.
              </p>
              <div className="flex gap-3 mt-4 flex-wrap">
                <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">● Live Brand Data</span>
                <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">● Creator Analytics</span>
                <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">● Performance Insights</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => {
                setSelected(ind);
                setSelectedIndustries([]);
              }}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium border ${
                selected === ind && selectedIndustries.length === 0
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span>{industryIcons[ind]}</span>
              {ind}
            </button>
          ))}
        </div>

        <div className="mb-10">
          <IndustryMultiSelectDropdown
            onChange={(selected) => {
              setSelectedIndustries(selected);
              setSelected('');
            }}
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading apps...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => {
              const isSaved = savedApps.includes(app.id);
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="cursor-pointer p-5 border rounded-2xl bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img src={app.icon} alt={app.title} className="w-12 h-12 rounded-xl" />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{app.title}</h3>
                        <p className="text-sm text-gray-500">{app.developer}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(app.id);
                      }}
                      className="text-orange-500"
                    >
                      {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Industry</p>
                  <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full mb-2 ${
                    industryColors[app.industry] || 'bg-gray-100 text-gray-700'
                  }`}>
                    {app.industry}
                  </span>
                  <p className="text-sm text-gray-700"><strong>Total Creators:</strong> {app.totalCreators}</p>
                  {app.topCreator && typeof app.topCreator === 'object' ? (
                    <p className="text-sm text-gray-700">
                      <strong>Top Creator:</strong> {app.topCreator.name} 
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">Top Creator: N/A</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedApp && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-3xl h-[calc(100vh-100px)] overflow-y-auto w-full p-6 rounded-2xl shadow-2xl relative">
            <button onClick={() => setSelectedApp(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
            <div className="flex items-center gap-4 mb-4">
            
              <img src={selectedApp.icon} alt={selectedApp.title} className="w-16 h-16 rounded-xl" />
              <div>
              
                <h3 className="text-xl font-semibold text-orange-600">{selectedApp.title}</h3>
                <p className="text-gray-500 text-sm">{selectedApp.developer}</p>

              </div>
          
            </div>

            <a
             href={selectedApp.url}
             target="_blank"
            rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline"
                >
               <ExternalLink className="w-4 h-4" />
               Open in App Store
              </a>
            <p className="text-sm text-gray-700 mb-1"><strong>Industry:</strong> {selectedApp.industry}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Total Creators:</strong> {selectedApp.totalCreators}</p>
           <p className='text-black'>{selectedApp.ratings}</p>
            <p className='text-black m-4'>About</p>
            <div className="text-sm text-black p-6 bg-white rounded-3xl border shadow-md">
                <p className="line-clamp-3">
                {selectedApp.description || 'No description available.'}
                   </p>
                    </div>
                    <p className='text-black mt-5 '>iPhone Screenshots</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                    
                  {selectedApp.screenshots?.slice(0, 5).map((src, index) => (
                  <img
                  key={index}
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  className="h-80 w-50 object-cover rounded-xl border"
                   />
                   ))}
                  </div>            
          </div>
        </div>
      )}
    </div>
  );
}
