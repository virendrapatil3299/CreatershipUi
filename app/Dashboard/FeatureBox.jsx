// ✅ FIXED: Use <img> instead of <Image> from 'lucide-react' and fix CORS/image URL handling.
// ✅ FIXED: Added safe fallback for missing profile picture URLs.
// ✅ FIXED: Video and image rendering logic inside modal.
// ✅ CLEANED: HTML structure and safety checks.

import { useEffect, useState } from 'react';
import { CiInstagram } from 'react-icons/ci';

const PROFILES_PER_PAGE = 12;

export default function InstagramProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('/api/you')
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Fetch Error:', err.message);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(profiles.length / PROFILES_PER_PAGE);
  const currentProfiles = profiles.slice(
    (page - 1) * PROFILES_PER_PAGE,
    page * PROFILES_PER_PAGE
  );

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-2 text-orange-600">Influencer Discovery & Analytics</h1>
      <p className="text-sm text-gray-600 mb-4">
        Find and analyze authentic micro-influencers with advanced performance metrics and real-time creator analytics
      </p>

      <p className="text-sm text-gray-500 mb-6">
        Showing {currentProfiles.length} of {profiles.length} creators (Page {page} of {totalPages})
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-gray-500 text-sm uppercase tracking-wider">
              <th className="pl-4">Creators</th>
              <th>Engagement Rate</th>
              <th>Followers</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {currentProfiles.map((profile) => (
              <tr
                key={profile.username}
                onClick={() => setSelectedProfile(profile)}
                className="bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-xl transition-shadow duration-150"
              >
                <td className="flex items-center gap-4 p-4">
                  <img
                    src={profile.profilePicUrlHD || '/default-avatar.png'}
                    alt={profile.username}
                    className="w-12 h-12 rounded-full border"
                  />
                  <div>
                    <p className="font-semibold text-black">{profile.username}</p>
                    <p className="text-sm text-gray-500">@{profile.username}</p>
                    <p className="text-xs text-gray-400">{profile.businessCategoryName}</p>
                  </div>
                </td>
                <td className="font-medium text-sm">{profile.engagementRate}</td>
                <td className="text-sm">
                  {Number(profile.followers || profile.followersCount)?.toLocaleString()}
                </td>
                <td className="text-sm">{profile.totalViews || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-start justify-center overflow-y-auto p-6">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl mt-10 relative">
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-light"
            >
              &times;
            </button>

            <div className="flex items-center gap-5 border-b px-8 py-6">
              <img
                src={selectedProfile.profilePicUrl || '/default-avatar.png'}
                alt={selectedProfile.username}
                className="w-20 h-20 rounded-full border border-gray-300"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedProfile.username}</h2>
                <p className="text-sm text-gray-500">@{selectedProfile.username}</p>
                <p className="text-xs text-orange-500">{selectedProfile.category}</p>
                <a
                  href={`https://instagram.com/${selectedProfile.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-pink-300 hover:text-pink-500 mt-2 text-sm"
                >
                  <CiInstagram size={18} /> Instagram
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 text-center px-8 py-6 border-b bg-gray-50">
              <div>
                <p className="text-sm text-gray-500">Total Posts</p>
                <p className="text-xl font-semibold text-gray-900">{selectedProfile.postsCount || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Followers</p>
                <p className="text-xl font-semibold text-gray-900">
                  {Number(selectedProfile.followers || selectedProfile.followersCount)?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement Rate</p>
                <p className="text-xl font-semibold text-orange-500">{selectedProfile.engagementRate}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 px-8 py-8">
              {/* Recent Posts */}
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-800 text-base mb-3">Recent Content</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {selectedProfile.latestPosts?.slice(0, 3).map((post, idx) => (
    <a
      key={idx}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group overflow-hidden rounded-2xl shadow-md"
    >
      {post.videoUrl ? (
        <video
          src={post.videoUrl}
          className="w-full h-[360px] object-cover rounded-2xl"
          loop
          playsInline
          muted
          onMouseEnter={(e) => {
            const video = e.currentTarget;
            video.play().catch(() => {});
          }}
          onMouseLeave={(e) => e.currentTarget.pause()}
        />
      ) : post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt="Thumbnail"
          className="w-full h-[360px] object-cover rounded-2xl"
        />
      ) : null}

      {/* Text Overlay */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-sm leading-tight">
        <p className="line-clamp-3 font-medium">{post.caption || '—'}</p>
      </div>

      {/* Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14 text-white opacity-80"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Metrics */}
         <div className="absolute bottom-2 w-full px-3 text-xs text-white flex justify-between">
        <span>👁️ {post.videoViewCount ? Number(post.videoViewCount).toLocaleString() : '—'}</span>
        <span>❤️ {post.likesCount ? Number(post.likesCount).toLocaleString() : '—'}</span>
        <span>💬 {post.commentsCount ? Number(post.commentsCount).toLocaleString() : '—'}</span>
        </div>
        </a>
         ))}
    </div>

              </div>

              {/* About & Demographics */}
              <div className="space-y-6">
                <div className="border shadow-xl p-6 rounded-2xl">
                  <h3 className="font-semibold text-base text-gray-800 mb-2">About</h3>
                  {selectedProfile.locationName && (
                    <p className="text-sm text-gray-600">📍 {selectedProfile.locationName}</p>
                  )}
                  {selectedProfile.externalUrl && (
                    <a
                      href={selectedProfile.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-500 block mt-1 break-all"
                    >
                      🔗 {selectedProfile.externalUrl}
                    </a>
                  )}
                  <p className="text-black mt-2 whitespace-pre-line">{selectedProfile.biography}</p>
                </div>

                {selectedProfile.demographics?.age || selectedProfile.demographics?.gender ? (
                  <div>
                    <h3 className="font-semibold text-base text-gray-800 mb-2">Audience Demographics</h3>
                    {selectedProfile.demographics.age && (
                      <ul className="text-sm text-gray-600 space-y-1">
                        {selectedProfile.demographics.age.map((entry, idx) => (
                          <li key={idx}>
                            {entry.age}: <span className="text-gray-900 font-medium">{entry.percent}%</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {selectedProfile.demographics.gender && (
                      <div className="mt-4 grid grid-cols-2 text-sm text-gray-700">
                        <p>👩 <span className="font-medium">{selectedProfile.demographics.gender.female}%</span> Female</p>
                        <p>👨 <span className="font-medium">{selectedProfile.demographics.gender.male}%</span> Male</p>
                      </div>
                    )}
                  </div>
                  
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
