const axios = require('axios');

const API_KEY = process.env.YOUTUBE_API_KEY_3;

// Fetch recent videos for a channel
const fetchChannelVideos = async (channelId) => {
  try {
    const searchRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        channelId,
        maxResults: 3,
        order: 'date',
        type: 'video',
        key: API_KEY,
      },
    });

    const videoIds = searchRes.data.items.map((item) => item.id?.videoId).filter(Boolean);
    if (!videoIds.length) return [];

    const videosRes = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,statistics',
        id: videoIds.join(','),
        key: API_KEY,
      },
    });

    return videosRes.data.items.map((video) => ({
      id: video.id,
      title: video.snippet.title,
      views: `${Number(video.statistics.viewCount || 0).toLocaleString()} views`,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: video.snippet.thumbnails?.medium?.url || '',
      publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString(),
    }));
  } catch (err) {
    console.warn(`❌ Failed to fetch videos for channel ${channelId}:`, err.message);
    return [];
  }
};

// Parse and normalize channel data
const parsedChannelData = async (channel) => {
  const customUrl = channel.snippet?.customUrl || channel.id;
  const recentVideos = await fetchChannelVideos(channel.id);

  const socialUrl = (platform) =>
    `https://${platform}.com/${customUrl.replace(/^@/, '')}`;

  return {
    id: channel.id,
    name: channel.snippet?.title || 'Untitled Channel',
    description: channel.snippet?.description || 'No description available.',
    about: channel.snippet?.description || 'No description available.',
    image: channel.snippet?.thumbnails?.default?.url || '',
    banner: channel.brandingSettings?.image?.bannerExternalUrl || '',
    screenShots: channel.snippet?.thumbnails?.high?.url || '',

    subscribers: Number(channel.statistics?.subscriberCount || 0).toLocaleString(),
    views: Number(channel.statistics?.viewCount || 0).toLocaleString(),
    videos: Number(channel.statistics?.videoCount || 0).toLocaleString(),

    engagement: (
      (Number(channel.statistics?.viewCount || 0) /
        Math.max(Number(channel.statistics?.subscriberCount || 1), 1)) *
      100
    ).toFixed(2),

    createdAt: new Date(channel.snippet?.publishedAt).toLocaleDateString(),
    country: channel.snippet?.country || 'N/A',
    channelUrl: `https://www.youtube.com/channel/${channel.id}`,
    customUrl: `https://www.youtube.com/${customUrl}`,

    website: channel.brandingSettings?.channel?.unsubscribedTrailer || null,

    thumbnails: channel.snippet?.thumbnails || {},

    links: {
      youtube: `https://www.youtube.com/channel/${channel.id}`,
      twitter: socialUrl('twitter'),
      instagram: socialUrl('instagram'),
    },

    recentVideos,
  };
};

// Fetch full channel details in chunks
const fetchChannelDetails = async (channelIds) => {
  const chunks = Array.from({ length: Math.ceil(channelIds.length / 40) }, (_, i) =>
    channelIds.slice(i * 40, (i + 1) * 40)
  );

  const allDetails = [];

  for (const chunk of chunks) {
    try {
      const detailsRes = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet,statistics,brandingSettings',
          id: chunk.join(','),
          key: API_KEY,
        },
      });

      const filtered = detailsRes.data.items.filter(
        (channel) => Number(channel.statistics?.subscriberCount || 0) >= 500
      );

      const enriched = await Promise.allSettled(filtered.map(parsedChannelData));
      enriched.forEach((res) => {
        if (res.status === 'fulfilled') {
          allDetails.push(res.value);
        }
      });
    } catch (err) {
      console.warn('❌ Error fetching channel details:', err.message);
    }
  }

  return allDetails;
};

// API route handler
const handler = async (req, res) => {
  try {
    const allChannelIds = new Set();

    const queries = [
      'Public figure', 'Digital creator', 'Music Composer', 'Artist', 'Media',
      'Reel creator', 'Musician/band', 'Real Estate', 'Video creator',
      'fitness creator', 'Education', 'Personal blog', 'Athlete', 'Podcast',
      'Community', 'Fitness Model', 'Entertainment website', 'Actor',
      'Journalist', 'Photography Videography', 'Photographer', 'Blogger',
      'Gamer', 'Movie Theater', 'Comedian', 'sports', 'uncategorized',
      'Art & entertainment', 'Scientist', 'Beauty, cosmetic & personal care'
    ];

    for (const query of queries) {
      let nextPageToken = '';
      let pagesFetched = 0;

      while (pagesFetched < 2) {
        const searchRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            type: 'channel',
            regionCode: 'US',
            q: query,
            maxResults: 50,
            order: 'relevance',
            pageToken: nextPageToken,
            key: API_KEY,
          },
        });

        const ids = searchRes.data.items.map((item) => item.id?.channelId).filter(Boolean);
        ids.forEach((id) => allChannelIds.add(id));

        nextPageToken = searchRes.data.nextPageToken;
        if (!nextPageToken) break;

        pagesFetched++;
      }
    }

    const uniqueIds = Array.from(allChannelIds).slice(0, 300);
    const creators = await fetchChannelDetails(uniqueIds);

    res.status(200).json({ creators });
  } catch (err) {
    console.error('❌ Error fetching YouTube creators:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch YouTube creators' });
  }
};

module.exports = handler;
