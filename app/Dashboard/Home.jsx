'use client'
import { useState } from 'react';
import AppSearch from './FeatureBox';

export default function Home() {
  const [app, setApp] = useState(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎯 Search & Analyze Android Apps</h1>
      <AppSearch onSelect={setApp} />

      {app && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">{app.title}</h2>
          <p>Developer: {app.developer}</p>
          <p>Installs: {app.installs}</p>
          <p>Score: ⭐ {app.score}</p>
          <img src={app.icon} className="mt-4 w-20 h-20" />
        </div>
      )}
    </div>
  );
}
