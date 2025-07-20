import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { useState, useMemo } from 'react';

const metrics = [
  { label: "Engagement Rate", key: "engagementRate" },
  { label: "Followers", key: "followers" },
  { label: "Total Views", key: "views" },
  { label: "Total Likes", key: "likes" },
];

export default function AnalyticsChart({ selectedCreator }) {
  const [selectedMetric, setSelectedMetric] = useState("engagementRate");
  const [view, setView] = useState("daily");

  const fallbackData = [
    { date: 'Jul 09', engagementRate: 40, followers: 1000, views: 5000, likes: 300 },
    { date: 'Jul 10', engagementRate: 5, followers: 1010, views: 5100, likes: 310 },
    { date: 'Jul 11', engagementRate: 60, followers: 1050, views: 5300, likes: 330 },
    { date: 'Jul 12', engagementRate: 120, followers: 1100, views: 6000, likes: 400 },
    { date: 'Jul 13', engagementRate: 160, followers: 1150, views: 6500, likes: 440 },
    { date: 'Jul 14', engagementRate: 190, followers: 1200, views: 7000, likes: 470 },
    { date: 'Jul 15', engagementRate: 210, followers: 1250, views: 7500, likes: 500 },
    { date: 'Jul 16', engagementRate: 230, followers: 1300, views: 8000, likes: 520 },
  ];

  const rawData = selectedCreator?.analyticsData?.length
    ? selectedCreator.analyticsData
    : fallbackData;

  const monthlyAggregated = useMemo(() => {
    if (view !== "monthly") return rawData;
    return [
      { date: 'May', engagementRate: 80, followers: 1000, views: 15000, likes: 900 },
      { date: 'Jun', engagementRate: 160, followers: 1200, views: 18000, likes: 1100 },
      { date: 'Jul', engagementRate: 220, followers: 1300, views: 20000, likes: 1300 },
    ];
  }, [view, rawData]);

  const chartData = useMemo(() => {
    return monthlyAggregated.map((item) => ({
      ...item,
      [selectedMetric]: Number(item[selectedMetric]) || 0,
    }));
  }, [selectedMetric, monthlyAggregated]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Analytics <span className="ml-1 text-gray-400 text-sm">ⓘ</span>
        </h2>
        <div className="inline-flex items-center bg-[#f5f9fc] px- py-1 rounded-full shadow-inner border border-gray-200">
          {["daily", "monthly"].map((type) => (
            <button
              key={type}
              onClick={() => setView(type)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                view === type
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-sm'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Tabs */}
      <div className="inline-flex items-center bg-[#f5f9fc] px- py-1 rounded-full shadow-inner border border-gray-200">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedMetric === metric.key
                ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-sm'
                  : 'text-gray-700 hover:text-orange-500'
            }`}
          >
            {metric.label}
          </button>
        ))}
      </div>
      <div className='bg-white border border-gray-200 rounded-2xl p-6 mt-5 shadow-md'>
      {/* Chart Header */}
      <h3 className="text-md font-medium text-gray-700 mb-2">
        {metrics.find((m) => m.key === selectedMetric)?.label} Overview
      </h3>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
            formatter={(value, name) => [
              Number(value).toLocaleString(),
              metrics.find((m) => m.key === name)?.label || name,
            ]}
          />
          <Line
            type="monotone"
            dataKey={selectedMetric}
            stroke="#fb5f2a"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
