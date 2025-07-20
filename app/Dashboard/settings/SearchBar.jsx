'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  User, Settings, Lock, CreditCard, HelpCircle, Info, LogOut,
  Bell, Search,
} from 'lucide-react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase'; // Adjust path if needed
import { useRouter } from 'next/navigation';

export default function HeaderWithDropdown() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [user, setUser] = useState(null);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/SignIn'); // prevents going back with browser history
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitials = () => {
    if (!user?.displayName) return 'U';
    return user.displayName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex justify-end items-center px-6 py-2 bg-white rounded-3xl shadow-sm">
      {/* 🔍 Search Bar */}
      {/* <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search App Store for mobile apps"
          className="ml-3 bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
        />
      </div> */}

      {/* 🔔 Notifications + Profile */}
      <div className="flex items-center gap-5 ml-6">
        {/* 🔔 Notification */}
        <div className="relative" ref={notifRef}>
          <button
            className="relative"
            onClick={() => setNotifOpen(!notifOpen)}
          >
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

        {/* 👤 Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center">
              {getInitials()}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">
                {user?.displayName || 'User Name'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || 'user@example.com'}
              </p>
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
                  <DropdownItem icon={<Info size={18} />} text="Terms & Privacy Policy" href="/Dashboard/settings" />
                </div>
                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition text-sm text-red-500"
                  >
                    <LogOut size={18} className="text-red-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DropdownItem({ icon, text, href, textColor = 'text-gray-800' }) {
  return (
    <Link href={href}>
      <div
        className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition text-sm cursor-pointer ${textColor}`}
      >
        {icon}
        <span>{text}</span>
      </div>
    </Link>
  );
}
