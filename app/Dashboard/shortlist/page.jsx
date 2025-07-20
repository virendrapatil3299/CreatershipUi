'use client'

import { useState } from 'react'
import SearchBar from './SearchBar'

const sortOptions = [
  'Engagement Rate',
  'Followers',
  'Total Likes',
  'Avg. Views',
  'Boom Score',
]

export default function ShortlistPage() {
  const [sortBy, setSortBy] = useState('Followers')

  return (
    <div className="   ">
   <SearchBar/>
      <div className="w-full max-w-6xl overflow-x-auto mx-auto mt-5 px-4 sm:px-6 lg:px-8 h-[calc(95vh-100px)] bg-white rounded-3xl shadow-lg  flex flex-col">
        {/* Header */}
        <div>
          <h1 className="text-2xl mt-10 font-extrabold text-[#FF8264]">My Shortlist</h1>
          <p className="text-gray-600 text-sm mt-1">
            Discover and analyze your favorite shortlisted creators.
          </p>
        </div>

        {/* Sort and Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10">
          <div className="flex items-center space-x-2 bg-white border rounded-xl shadow-sm px-2 py-2 w-full sm:w-auto">
            <label className="font-medium text-sm text-gray-700">Sort by</label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            Total creators:{' '}
            <span className="inline-block px-3 py-1 border rounded-full">0</span>
          </div>
        </div>

        {/* Scrollable Full Card Content */}
        <div className="text-center py-10 rounded-2xl mb-5 shadow-inner border mt-10 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">No Shortlisted Creators</h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto px-4">
            Start building your creator list by shortlisting creators you're interested in working with.
            Browse our creator discovery section to find and shortlist creators.
          </p>

          <img
            src="/shortlist.png"
            alt="No creators"
            className="mx-auto mt-8 w-60 sm:w-64 "
          />

          <button
            className="mt-8 bg-gradient-to-r from-[#FF8264] to-[#FF5B5B] text-white font-medium px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
            onClick={() => {
              console.log('Navigate to discovery page')
            }}
          >
            Discover Creators
          </button>
        </div>
      </div>
    </div>
  )
}
