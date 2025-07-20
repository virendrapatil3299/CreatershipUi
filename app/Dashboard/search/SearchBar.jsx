'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  User, Settings, Lock, CreditCard, HelpCircle, Info, LogOut, Bell, Search,
} from 'lucide-react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import CreatorDetailPage from '../component/CreatorDetailPage';

export default function HeaderWithDropdown() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);

  const profileRef = useRef();
  const notifRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearchTerm.trim()) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/you?q=${debouncedSearchTerm}`);
        setSearchResults(data.creators || []);
      } catch (err) {
        console.error('Search error:', err);
        setSearchResults([]);
      }
      setLoading(false);
    };

    fetchResults();
  }, [debouncedSearchTerm]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/SignIn');
  };

  const getInitials = (name = '') =>
    name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  return (
    <div className="relative flex justify-between items-center px-6 py-2 bg-white rounded-3xl shadow-lg">
      {/* Search */}
      <div className="relative w-full max-w-xl">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Discover creators username, or niche( tech,fitness, beauty,fashion etc.)"
            className="ml-5 text-black bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>

        {debouncedSearchTerm && (
          <div className="absolute top-12 left-0 right-0 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
            {loading ? (
             <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
        </div>
            ) : searchResults.length ? (
              searchResults.map(c => (
                <div
                  key={c.username}
                  onClick={() => {
                    setSelectedCreator(c);
                    setSearchTerm('');
                    setSearchResults([]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-800 cursor-pointer"
                >
                  {c.profilePicUrlHD ? (
                  <img
                src={c.profilePicUrlHD}
                alt={c.username}
                className="w-10 h-10 rounded-full border"
              />
            ) : (
              <div className="w-10 h-10 rounded-full border shadow-md flex items-center justify-center bg-gray-200 text-gray-700 text-3xl font-bold uppercase">
                {c.username?.[0] || "?"}
              </div>
                  )}
                  <div>
                    <div className="font-medium">{c.fullName || c.username}</div>
                    <div className="text-xs text-gray-500">@{c.username}</div>
                    <div className="text-xs text-gray-500">{c.businessCategoryName || 'Creator'}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>

      {/* Notifications + Profile */}
      <div className="flex items-center gap-5 ml-6">
        <div className="relative" ref={notifRef}>
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">1</span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-4 text-sm text-gray-700">🔔 You have 1 new alert.</div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 focus:outline-none">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center">
              {getInitials(user?.displayName)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{user?.displayName || 'User Name'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="py-2">
                  <DropdownItem icon={<User size={18} />} text="User Profile" href="/Dashboard/settings" />
                  <DropdownItem icon={<Settings size={18} />} text="Preferences" href="/Dashboard/settings" />
                  <DropdownItem icon={<Lock size={18} />} text="Security" href="/Dashboard/settings" />
                  <DropdownItem icon={<CreditCard size={18} />} text="Billing & Payments" href="/Dashboard/settings" />
                </div>
                <div className="py-2">
                  <DropdownItem icon={<HelpCircle size={18} />} text="Help & Support" href="/Dashboard/help" />
                  <DropdownItem icon={<Info size={18} />} text="Privacy & Terms" href="/Dashboard/privacy" />
                </div>
                <div className="py-2">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition text-sm text-red-500">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Creator Detail Modal */}
      {selectedCreator && (
        <CreatorDetailPage
          selectedCreator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
        />
      )}
    </div>
  );
}

function DropdownItem({ icon, text, href, textColor = 'text-gray-800' }) {
  return (
    <Link href={href}>
      <div className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition text-sm cursor-pointer ${textColor}`}>
        {icon}
        <span>{text}</span>
      </div>
    </Link>
  );
}
