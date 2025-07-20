import { FaYoutube } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import AnalyticsChart from "./AnalyticsChart";

export default function CreatorModal({ selectedCreator, onClose, onRefresh }) {
  if (!selectedCreator) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl text-black mt-5 mx-auto h-[calc(95vh-100px)] rounded-2xl shadow-2xl overflow-hidden relative">

        {/* Top Bar */}
        <div className="flex justify-between items-center p-4 border-b">
          <button
            onClick={onClose}
            className="text-sm text-orange-600 hover:underline"
          >
            ← Back to Search
          </button>
          {selectedCreator?.id && (
            <button
              onClick={onRefresh}
              className="text-sm text-gray-500 hover:text-black"
            >
              🔄 Refresh Data
            </button>
          )}
        </div>

        <div className="pt-2 px-6 pb-10 h-[calc(95vh-160px)] overflow-y-auto space-y-6">
          {/* Banner */}
          <div className="h-30 w-full mt-4">
            <img
              src={selectedCreator.banner || '/back.jpg'}
              alt="Banner"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Avatar Card */}
          <div className="left-6 right-6 mx-auto flex flex-col items-center bg-white px-6 py-6 rounded-2xl shadow-2xl">
            {selectedCreator.profilePicUrlHD ? (
              <img
                src={selectedCreator.profilePicUrlHD}
                alt={selectedCreator.username}
                className="w-10 h-10 rounded-full border"
              />
            ) : (
              <div className="w-10 h-10 rounded-full border shadow-md flex items-center justify-center bg-gray-200 text-gray-700 text-3xl font-bold uppercase">
                {selectedCreator.username?.[0] || "?"}
              </div>
            )}
            <h2 className="text-2xl font-bold mt-2">{selectedCreator.username}</h2>
            <p className="text-gray-500 text-sm">@{selectedCreator.username}</p>
            <p className="text-sm text-gray-600 mt-1">{selectedCreator.businessCategoryName}</p>
            <a
              href={`https://instagram.com/${selectedCreator.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-pink-300 hover:text-pink-500 mt-2 text-sm"
            >
              <CiInstagram size={18} /> Instagram
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="flex-1 bg-white border rounded-xl p-4 shadow-sm text-center">
              <p className="text-sm text-gray-500">Total Posts</p>
              <p className="text-xl font-bold">{selectedCreator.postsCount}</p>
            </div>
            <div className="flex-1 bg-white border rounded-xl p-4 shadow-sm text-center">
              <p className="text-sm text-gray-500">Followers</p>
              <p className="text-xl font-bold">{selectedCreator.followers}</p>
            </div>
          </div>

          {/* About */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">{selectedCreator.biography}</p>
            <ul className="mt-3 space-y-1 text-sm text-gray-600">
              <li>📍 {selectedCreator.locationName}</li>
              <li>🌐 <a href={selectedCreator.externalUrl} target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">{selectedCreator.website}</a></li>
              <li>🎵 {selectedCreator.tiktokHandle}</li>
            </ul>
          </div>

          {/* Recent Content */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Recent Content</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedCreator.latestPosts?.map((post, idx) => (
                <a
                  key={idx}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden rounded-2xl shadow-md"
                >
                  {post.videoUrl && (
                    <video
                      src={post.videoUrl}
                      className="w-full h-[360px] object-cover rounded-2xl"
                      loop
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                  )}

                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-sm leading-tight">
                    <p className="line-clamp-3 mb-5 font-medium">{post.caption || '—'}</p>
                  </div>

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

                  <div className="absolute bottom-2 w-full px-3 text-xs text-white flex justify-between">
                    <span>👁️ {post.videoViewCount?.toLocaleString() || '0'}</span>
                    <span>❤️ {post.likesCount?.toLocaleString() || '0'}</span>
                    <span>💬 {post.commentsCount?.toLocaleString() || '0'}</span>
                  </div>
                </a>
                
              ))}
              
            </div>
            
          </div>
          <AnalyticsChart
             selectedCreator={selectedCreator}
          />
        </div>
        
      </div>
    </div>
  );
}
