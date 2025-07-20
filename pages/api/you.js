const axios = require('axios');

const BASE_URL = 'https://instagram.faju1-1.fna.fbcdn.net';
const toAbsoluteUrl = (url) => (!url ? '' : url.startsWith('http') ? url : `${BASE_URL}${url}`);

const generateAnalyticsData = (item) => {
  const days = 7;
  const analytics = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });

    analytics.push({
      date: formattedDate,
      engagementRate: Math.max(0, item.engagementRateValue + (Math.random() - 0.5) * 5),
      followers: Math.max(0, item.followers + Math.floor((Math.random() - 0.5) * 100)),
      views: Math.max(0, item.totalViews + Math.floor((Math.random() - 0.5) * 1000)),
      likes: Math.floor(Math.random() * 1000),
    });
  }

  return analytics;
};

const handler = async (req, res) => {
  try {
    // Allow cross-origin requests
    res.setHeader('Access-Control-Allow-Origin', '*');

    const {
      category = '',
      time = '1 Week',
      sortKey = 'followers',
      sortOrder = 'desc',
      page = 1,
      pageSize = 1000,
      views = '0,999999',
      followers = '0,999999',
      engagement = '0,100',
    } = req.query;

    const [minViews, maxViews] = views.split(',').map(Number);
    const [minFollowers, maxFollowers] = followers.split(',').map(Number);
    const [minEngagement, maxEngagement] = engagement.split(',').map(Number);

    const url = 'https://api.apify.com/v2/datasets/6tpvGtGJKA0QrW4hj/items?clean=true&format=json';
    const response = await axios.get(url);
    const rawData = response.data;

    const data = rawData.map((item) => {
      const followers = Number(item.followersCount || item.followers || 0);

      const latestPosts = Array.isArray(item.latestPosts)
        ? item.latestPosts.slice(0, 6).map((post) => ({
            url: post.url || '',
            caption: post.caption || '',
            displayUrl: toAbsoluteUrl(post.displayUrl || ''),
            videoUrl: toAbsoluteUrl(post.videoUrl || ''),
            videoViewCount: Number(post.videoViewCount || 0),
            likesCount: Number(post.likesCount || 0),
            commentsCount: Number(post.commentsCount || 0),
          }))
        : [];

      const totalLikes = latestPosts.reduce((sum, post) => sum + post.likesCount, 0);
      const totalComments = latestPosts.reduce((sum, post) => sum + post.commentsCount, 0);
      const totalViews = latestPosts.reduce((sum, post) => sum + post.videoViewCount, 0);

      const engagementRateValue =
        followers > 0 && latestPosts.length > 0
          ? ((totalLikes + totalComments) / followers / latestPosts.length) * 100
          : 0;

      return {
        username: item.username || '',
        fullName: item.fullName || '',
        profilePicUrl: toAbsoluteUrl(item.profilePicUrl),
        followers,
        postsCount: Number(item.postsCount || 0),
        biography: item.biography || '',
        externalUrl: item.externalUrl || '',
        businessCategoryName: item.businessCategoryName || '',
        engagementRate: engagementRateValue.toFixed(2) + '%',
        engagementRateValue,
        totalViews,
        latestPosts,
        analyticsData: generateAnalyticsData({
          engagementRateValue,
          followers,
          totalViews,
        }),
      };
    });

    const filteredData = data.filter((item) => {
      const eRate = Number(item.engagementRateValue) || 0;

      return (
        (!category ||
          item.businessCategoryName?.toLowerCase().includes(category.toLowerCase())) &&
        item.followers >= minFollowers &&
        item.followers <= maxFollowers &&
        item.totalViews >= minViews &&
        item.totalViews <= maxViews &&
        eRate >= minEngagement &&
        eRate <= maxEngagement
      );
    });

    const sortedData = filteredData.sort((a, b) => {
      const aVal = sortKey === 'engagementRate' ? a.engagementRateValue : a[sortKey] ?? 0;
      const bVal = sortKey === 'engagementRate' ? b.engagementRateValue : b[sortKey] ?? 0;
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    const currentPage = Number(page);
    const size = Number(pageSize);
    const start = (currentPage - 1) * size;
    const paginatedData = sortedData.slice(start, start + size);

    res.status(200).json({
      total: sortedData.length,
      currentPage,
      pageSize: size,
      creators: paginatedData,
    });
  } catch (err) {
    console.error('❌ API Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch or process data' });
  }
};

module.exports = handler;
