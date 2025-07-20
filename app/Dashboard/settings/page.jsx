'use client';
import { useEffect, useState } from 'react';
import Searchbox from './SearchBar';
import ProfileForm from './ProfileForm';
import Billing from './Billing';
import Preferences from './Preferences';
import Security from './Security';


export default function EditProfileTabs() {
  const [selectedTab, setSelectedTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Edit Profile' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'security', label: 'Security' },
    { id: 'billing', label: 'Billing & Payments' },
  ];

  return (
    <div>
    <Searchbox/>
    <div className="w-full max-w-6xl mx-auto mt-5 px-4 sm:px-6 lg:px-8 h-[calc(93vh-90px)] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
  {/* Tabs Header */}
 
  
  <div className="flex gap-6 mt-4 sm:gap-8 border-b pb-4 overflow-x-auto">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setSelectedTab(tab.id)}
        className={`text-md  whitespace-nowrap font-semibold pb-6 transition ${
          selectedTab === tab.id
            ? 'text-orange-500 border-b border-orange-500'
            : 'text-gray-500'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>

  {/* Scrollable Content */}
  <div className="overflow-y-auto flex-grow mt-4 pr-30">
    {selectedTab === 'profile' && <ProfileForm />}
    {selectedTab === 'preferences' && <Preferences />}
    {selectedTab === 'security' && <Security />}
    {selectedTab === 'billing' && <Billing />}
  </div>
</div>
</div>

  );
}

