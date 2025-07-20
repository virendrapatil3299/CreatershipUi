import axios from 'axios';

const API_KEY = process.env.YOUTUBE_API_KEY;

// 1. Get recent videos for a given channel
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

    const videoIds = searchRes.data.items.map((item) => item.id.videoId).filter(Boolean);
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
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: video.snippet.thumbnails.medium?.url || '',
      publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString(),
      views: Number(video.statistics.viewCount || 0).toLocaleString(),
    }));
  } catch (err) {
    console.warn(`❌ Error fetching videos for ${channelId}:`, err.message);
    return [];
  }
};

// 2. Normalize and format channel data
const parseChannelData = async (channel) => {
  const customUrl = channel.snippet.customUrl || channel.id;
  const recentVideos = await fetchChannelVideos(channel.id);

  return {
    id: channel.id,
    username: channel.snippet.title,
    about: channel.snippet.description,
    profileImage: channel.snippet.thumbnails.default?.url || '',
    banner: channel.brandingSettings?.image?.bannerExternalUrl || '',
    followers: Number(channel.statistics.subscriberCount || 0).toLocaleString(),
    views: Number(channel.statistics.viewCount || 0).toLocaleString(),
    totalPosts: Number(channel.statistics.videoCount || 0).toLocaleString(),
    websiteLink: channel.brandingSettings?.channel?.unsubscribedTrailer || '',
    instagramLink: `https://www.youtube.com/${customUrl}`,
    platform: 'youtube',
    recentVideos,
  };
};

// 3. Fetch channels for multiple queries and filter
const fetchYoutubeCreators = async () => {
  const queries = [
    'fitness creator', 'travel vlog', 'tech review', 'comedy videos', 'beauty influencer',
    'gaming streamer', 'music artist', 'food blogger', 'education', 'motivational speaker',
  ];

  const allChannelIds = new Set();

  for (const query of queries) {
    let nextPageToken = '';
    let pagesFetched = 0;

    while (pagesFetched < 2) {
      const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: query,
          type: 'channel',
          regionCode: 'US',
          maxResults: 50,
          pageToken: nextPageToken,
          key: API_KEY,
        },
      });

      const ids = res.data.items.map((item) => item.id.channelId).filter(Boolean);
      ids.forEach((id) => allChannelIds.add(id));

      nextPageToken = res.data.nextPageToken;
      if (!nextPageToken) break;
      pagesFetched++;
    }
  }

  const chunks = Array.from(allChannelIds).slice(0, 300); // limit for API
  const finalCreators = [];

  for (let i = 0; i < chunks.length; i += 40) {
    const batch = chunks.slice(i, i + 40);

    try {
      const res = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet,statistics,brandingSettings',
          id: batch.join(','),
          key: API_KEY,
        },
      });

      const validChannels = res.data.items.filter(
        (ch) => Number(ch.statistics.subscriberCount || 0) > 1000
      );

      const detailed = await Promise.allSettled(validChannels.map(parseChannelData));
      detailed.forEach((r) => {
        if (r.status === 'fulfilled') finalCreators.push(r.value);
      });
    } catch (err) {
      console.warn('❌ Failed fetching batch:', err.message);
    }
  }

  return finalCreators;
};

// 4. API route
export default async function handler(req, res) {
  try {
    const creators = await fetchYoutubeCreators();
    res.status(200).json({ creators });
  } catch (err) {
    console.error('❌ YouTube Scrape Error:', err.message);
    res.status(500).json({ error: 'Failed to scrape YouTube creators' });
  }
}
