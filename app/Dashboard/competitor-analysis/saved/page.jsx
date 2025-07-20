'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Searchbar from '../SearchBar'; // Assuming you have a SearchBar component

export default function SavedCompetitors() {
  const [savedApps, setSavedApps] = useState([]);
  const [allApps, setAllApps] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [minCreators, setMinCreators] = useState(0);

  // Load bookmarks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('savedApps');
    if (stored) {
      setSavedApps(JSON.parse(stored));
    }
  }, []);

  // Fetch apps from API
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await fetch('/api/topAppsByIndustry');
        const data = await res.json();
        setAllApps(data);
      } catch (err) {
        console.error('Error fetching apps:', err);
      }
    };
    fetchApps();
  }, []);

  // Filter bookmarked apps
  useEffect(() => {
    const saved = allApps.filter(
      (app) => savedApps.includes(app.id) && app.totalCreators >= minCreators
    );
    setFiltered(saved);
  }, [allApps, savedApps, minCreators]);

  return (
    <div>
    <Searchbar/>
    <div className="w-full max-w-7xl mt-5 mx-auto h-[calc(95vh-100px)] overflow-y-auto bg-white rounded-3xl border shadow-sm p-6 md:p-10 space-y-10">
      <div className="space-y-2">
  <nav className="text-sm text-gray-500">
    Competitor Analytics <span className="mx-1">›</span> <span className="font-medium text-gray-600">saved</span>
  </nav>
  <h2 className="text-3xl font-bold text-orange-500">Saved Competitors</h2>
  <p className="text-gray-500">Your bookmarked competitors</p>
</div>

<div className="flex flex-wrap items-center gap-3 mt-4">
  <button className="flex items-center gap-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-200 transition">
    <span className="text-lg">≡</span> Filter
  </button>

  <div className="relative">
    <select
      className="appearance-none bg-gray-100 text-gray-800 font-medium px-4 py-2 rounded-full text-sm pr-6 cursor-pointer hover:bg-gray-200 transition"
      onChange={(e) => setMinCreators(Number(e.target.value))}
    >
      <option value="0">Industry: All</option>
      <option value="1000">Industry: 1,000+</option>
    </select>
    <span className="absolute right-3 top-2.5 text-gray-500 pointer-events-none">▼</span>
  </div>

  <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:from-orange-500 hover:to-orange-600 transition">
    See Shortlisted Creators
  </button>
</div>


    

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Saved Competitors Yet</h3>
          <p className="text-gray-500 max-w-md">
            Start building your competitive analysis by saving brands you want to track.
            Browse our analytics section to discover and bookmark competitors.
          </p>
          <img
            src="/shortlist.png" // Replace with your actual image path
            alt="No saved competitors"
            className="w-64 mt-6"
          />
          <Link href="/competitors">
            <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition">
              Browse Competitors
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="p-5 border rounded-2xl bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={app.icon}
                    alt={app.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{app.title}</h3>
                    <p className="text-sm text-gray-500">
                      {app.url.replace(/^https?:\/\//, '')}
                    </p>
                  </div>
                </div>
              </div>

              <span className="inline-block text-xs font-medium px-2 py-1 rounded-full mb-2 bg-orange-100 text-orange-700">
                {app.industry}
              </span>

              <p className="text-sm text-gray-700 mb-1">
                <strong>Total Creators:</strong>{' '}
                {app.totalCreators.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Top Creator:</strong> {app.topCreator.name} •{' '}
                {app.topCreator.followers.toLocaleString()} followers
              </p>

              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-orange-600 hover:underline"
              >
                🔗 Open App
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
