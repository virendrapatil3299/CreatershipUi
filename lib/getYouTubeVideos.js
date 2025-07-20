import axios from 'axios';

const API_KEY = process.env.YOUTUBE_API_KEY;

async function testYouTube() {
  const query = 'Instagram Meta';

  try {
    const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 3,
        regionCode: 'US',
        key: API_KEY,
      },
    });

    console.log('YouTube result:', res.data.items.map(i => i.snippet.title));
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

testYouTube();
