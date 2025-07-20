import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);
    const res = await fetch('/api/instagram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    setProfile(data);
    setLoading(false);
  };

  return (
    <div className='text-black' style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Instagram Profile Scraper</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', margin: '10px' }}
      />
      <button
        onClick={handleScrape}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Scrape
      </button>

      {loading && <p>Loading...</p>}

      {profile && !profile.error && (
        <div style={{ marginTop: '2rem' }}>
          <img
            src={profile.profilePic}
            alt="Profile"
            style={{ borderRadius: '50%', width: 120, height: 120 }}
          />
          <h2>{profile.name}</h2>
          <p><strong>Posts:</strong> {profile.posts}</p>
          <p><strong>Followers:</strong> {profile.followers}</p>
          <p><strong>Following:</strong> {profile.following}</p>
          <p>{profile.bio}</p>
        </div>
      )}

      {profile?.error && (
        <p style={{ color: 'red' }}>{profile.error}</p>
      )}
    </div>
  );
}
