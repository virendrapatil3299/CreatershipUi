'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [creators, setCreators] = useState([]);
  const [sortKey, setSortKey] = useState('followers');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/you?sortKey=${sortKey}&sortOrder=${sortOrder}`);
      const data = await res.json();
      setCreators(data.creators);
    };

    fetchData();
  }, [sortKey, sortOrder]);

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Creator Table</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th
              onClick={() => handleSort('name')}
              className="cursor-pointer border p-2"
            >
              Name {sortKey === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              onClick={() => handleSort('followers')}
              className="cursor-pointer border p-2"
            >
              Followers {sortKey === 'followers' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              onClick={() => handleSort('views')}
              className="cursor-pointer border p-2"
            >
              Views {sortKey === 'views' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              onClick={() => handleSort('engagementRate')}
              className="cursor-pointer border p-2"
            >
              Engagement {sortKey === 'engagementRate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {creators.map((creator, i) => (
            <tr key={i}>
              <td className="border p-2">{creator.name}</td>
              <td className="border p-2">{creator.followers}</td>
              <td className="border p-2">{creator.views}</td>
              <td className="border p-2">{creator.engagementRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
