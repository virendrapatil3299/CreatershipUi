'use client';

import { useState, useRef, useEffect } from 'react';
import {
  User, Settings, Lock, CreditCard, HelpCircle, Info, LogOut,
  Bell, Search, ExternalLink, X
} from 'lucide-react';

export default function HeaderWithDropdown() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const profileRef = useRef();
  const notifRef = useRef();
  const searchRef = useRef();
  const timeoutRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/searchAppsByName?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSearchResults(data);
        setShowDropdown(true);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  return (
    <div className="flex justify-between items-center px-6 py-2 bg-white rounded-3xl shadow-sm">
      <div className="relative w-full max-w-md" ref={searchRef}>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search App Store for mobile apps"
            className="ml-3 bg-transparent text-black outline-none text-sm max-w-full placeholder:text-gray-400"
            onFocus={() => {
              if (searchResults.length > 0) setShowDropdown(true);
            }}
          />
        </div>

        {loading && (
          <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
        </div>
        )}

        {showDropdown && (
          <div className="absolute mt-2 w-full bg-transparent rounded-xl shadow-lg z-50 max-h-80 overflow-auto">
            {searchResults.length > 0 ? (
              searchResults.map((app) => (
                <div
                  key={app.id}
                  onClick={() => {
                    setSelectedApp(app);
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer flex items-center gap-3 mb-3 bg-white rounded-4xl shadow-sm px-4 py-2 hover:bg-gray-100 transition text-sm"
                >
                  <img src={app.icon} alt={app.title} className="w-8 h-8 rounded-md" />
                  <div>
                    <p className="font-semibold text-gray-800">{app.title}</p>
                    <p className="text-xs text-gray-500">{app.developer}</p>
                    <p className="text-xs text-gray-500">{app.contentRating}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm">No apps found.</div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-5">
        <div className="relative" ref={notifRef}>
          <button className="relative" onClick={() => setNotifOpen(!notifOpen)}>
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              1
            </span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-4 text-sm text-gray-700">🔔 You have 1 new alert.</div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center">
              VD
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">virendra Damodhar Patil</p>
              <p className="text-xs text-gray-500">virendrapatil3299@gmail.com</p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="py-2">
                  <DropdownItem icon={<User size={18} />} text="User Profile" />
                  <DropdownItem icon={<Settings size={18} />} text="Preferences" />
                  <DropdownItem icon={<Lock size={18} />} text="Security" />
                  <DropdownItem icon={<CreditCard size={18} />} text="Billing & Payments" />
                </div>
                <div className="py-2">
                  <DropdownItem icon={<HelpCircle size={18} />} text="Help & Support" />
                  <DropdownItem icon={<Info size={18} />} text="Terms & Privacy Policy" />
                </div>
                <div className="py-2">
                  <DropdownItem
                    icon={<LogOut size={18} className="text-red-500" />}
                    text="Logout"
                    textColor="text-red-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
      <div className="flex items-start gap-4 mb-4">
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

function DropdownItem({ icon, text, textColor = 'text-gray-800' }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition text-sm ${textColor}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
