import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // set in .env

// Fetch basic channel info by YouTube Channel ID
export async function getChannelInfo(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/channels`;
  
  const response = await axios.get(url, {
    params: {
      part: 'snippet,statistics',
      id: channelId,
      key: YOUTUBE_API_KEY,
    },
  });

  if (response.data.items.length === 0) {
    throw new Error('Channel not found');
  }

  const data = response.data.items[0];
  return {
    channelId: data.id,
    title: data.snippet.title,
    description: data.snippet.description,
    thumbnails: data.snippet.thumbnails,
    publishedAt: data.snippet.publishedAt,
    subscriberCount: data.statistics.subscriberCount,
    videoCount: data.statistics.videoCount,
    viewCount: data.statistics.viewCount,
  };
}

// Fetch recent videos from a channel
export async function getRecentVideos(channelId, maxResults = 5) {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search`;

  const res = await axios.get(searchUrl, {
    params: {
      key: YOUTUBE_API_KEY,
      channelId,
      part: 'snippet',
      order: 'date',
      maxResults,
    },
  });

  return res.data.items.map((item) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));
}
