import axios from 'axios';

const API_KEY = process.env.YOUTUBE_API_KEY;

const searchCreatorsByKeyword = async (query) => {
  const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      q: query,
      part: 'snippet',
      type: 'channel',
      maxResults: 10,
      key: API_KEY,
    }
  });
  return res.data.items;
};

const getChannelStats = async (channelId) => {
  const res = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
    params: {
      id: channelId,
      part: 'statistics,snippet',
      key: API_KEY
    }
  });
  return res.data.items[0];
};

const getChannelVideos = async (channelId) => {
  const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      channelId,
      part: 'snippet',
      order: 'viewCount',
      maxResults: 5,
      type: 'video',
      key: API_KEY
    }
  });
  return res.data.items;
};

const calculateMatchScore = (text = '', tags = []) => {
  const t = text.toLowerCase();
  const matches = tags.filter(tag => t.includes(tag.toLowerCase()));
  return Number((matches.length / tags.length).toFixed(2));
};

export default async function handler(req, res) {
  const keyword = req.query.q || 'fitness';
  const influencerTags = keyword.split(','); // or fixed tag list

  try {
    const creators = await searchCreatorsByKeyword(keyword);

    const enriched = await Promise.all(creators.map(async (item) => {
      const channelId = item.snippet.channelId;
      const channel = await getChannelStats(channelId);
      const videos = await getChannelVideos(channelId);

      const topVideo = videos[0];
      const videoMatch = calculateMatchScore(topVideo?.snippet?.title, influencerTags);
      const channelMatch = calculateMatchScore(channel?.snippet?.description, influencerTags);

      return {
        channelId,
        name: channel.snippet.title,
        description: channel.snippet.description,
        subscribers: Number(channel.statistics.subscriberCount),
        views: Number(channel.statistics.viewCount),
        topVideo: {
          title: topVideo?.snippet?.title,
          videoId: topVideo?.id?.videoId,
          matchScore: videoMatch
        },
        matchScore: Math.max(channelMatch, videoMatch)
      };
    }));

    res.status(200).json({ creators: enriched.sort((a, b) => b.matchScore - a.matchScore) });
  } catch (err) {
    console.error('YouTube API error:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
}
