'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  BarChart2,
  Bookmark,
  Settings,
  HelpCircle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { usePathname } from 'next/dist/client/components/navigation';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const path=usePathname();
  console.log(path);
  

  const navItems = [
    {
      id: 1,
      icon: <Search className="w-5 h-5" />,
      path: '/Dashboard',
      label: 'Creator Search',
      highlight: true,
    },
    {
      id: 2,
      icon: <BarChart2 className="w-5 h-5" />,
      path: '/Dashboard/competitor-analysis',
      label: 'Competitor Analysis',
      hasDropdown: true,
      

    },
    {
      id: 3,
      icon: <Bookmark className="w-5 h-5" />,
      path: '/Dashboard/shortlist',
      label: 'Your Shortlists',
    },
    {
      id: 4,
      icon: <Lightbulb className="w-5 h-5" />,
      path: '/Dashboard/app-tracker',
      label: 'App Tracker',
    },
  ];

  const bottomItems = [
    {
      id: 5,
      icon: <Settings className="w-5 h-5" />,
      path: '/Dashboard/settings',
      label: 'Settings',
    },
    {
      id: 6,
      icon: <HelpCircle className="w-5 h-5" />,
      path: '/Dashboard/help',
      label: 'Help & Support',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideAnyDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      );
      if (!isClickInsideAnyDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow"
      >
        <Menu />
      </button>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed  ml-1 h-full z-50 md:relative md:z-10 transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <aside
          className={`mt-5 h-full md:h-fit rounded-2xl md:rounded-4xl bg-white border shadow-xl p-4
          ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col transition-all duration-300 ease-in-out`}
        >
          {/* Close Button on Mobile */}
          <div className="md:hidden flex justify-end mb-4">
            <button onClick={() => setMobileOpen(false)} className="text-gray-500">
              <X />
            </button>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            {!isCollapsed ? (
              <h1 className="text-xl font-bold whitespace-nowrap">
                <span className="text-orange-500">CREATOR</span>
                <span className="text-black">SHIPS</span>
              </h1>
            ) : (
              <span className="text-orange-500 font-extrabold text-xl">C</span>
            )}
            <button
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="text-gray-500 hover:text-black transition hidden md:block"
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-4 mb-6">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                ref={(el) => (dropdownRefs.current[item.id] = el)}
              >
                {item.hasDropdown ? (
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.id ? null : item.id)
                    }
                    className={`flex items-center gap-3 w-full px-4 py-2 rounded-2xl transition-all duration-200 active:scale-95 ${
                      item.highlight
                        ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold shadow'
                        : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'
                    }`}
                  >
                    {item.icon}
                    {!isCollapsed && item.label}
                  </button>
                ) : (
                  <Link href={item.path}>
                    <button
                      className={`flex items-center gap-3 w-full px-4 py-2 rounded-2xl transition-all duration-200 active:scale-95 ${
                        item.highlight
                          ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold shadow'
                          : 'text-gray-800 hover:bg-gray-100 active:bg-gray-200'
                      }`}
                    >
                      {item.icon}
                      {!isCollapsed && item.label}
                    </button>
                  </Link>
                )}

                {/* Dropdown */}
                {item.hasDropdown && activeDropdown === item.id && !isCollapsed && (
                  <div className="ml-8 mt-2 space-y-2">
                    <Link href={`${item.path}/overview`}>
                      <button className="block w-full text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition active:bg-gray-200">
                        Overview
                      </button>
                    </Link>
                    <Link href={`${item.path}/saved`}>
                      <button className="block w-full text-left px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition active:bg-gray-200">
                        Saved
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="space-y-2 border-t pt-6  mt-21">
            {bottomItems.map((item) => (
              <Link href={item.path} key={item.id}>
                <button className="flex items-center w-full gap-3 text-gray-800 px-4 py-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-all duration-200 active:scale-95">
                  {item.icon}
                  {!isCollapsed && item.label}
                </button>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
