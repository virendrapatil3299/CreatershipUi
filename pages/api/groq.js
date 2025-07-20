import play from 'google-play-scraper';
import axios from 'axios';

export default async function handler(req, res) {
  const query = req.query.q || "fitness";

  try {
    // 🟢 Google Play Apps
    const playApps = await play.search({
      term: query,
      num: 10
    });

    const playResults = playApps.map(app => ({
      name: app.title,
      icon: app.icon,
      rating: app.score,
      store: "google",
      downloads: app.minInstalls,
      category: app.genre,
      description: app.summary,
      appId: app.appId
    }));

    // 🔵 Apple App Store
    const appleRes = await axios.get(
      `https://itunes.apple.com/search`,
      {
        params: {
          term: query,
          entity: "software",
          limit: "auto",
          country: "us"
        }
      }
    );

    const appleResults = appleRes.data.results.map(app => ({
      name: app.trackName,
      icon: app.artworkUrl100,
      rating: app.averageUserRating,
      store: "apple",
      downloads: null,
      category: app.primaryGenreName,
      description: app.description,
      appId: app.trackId
    }));

    res.status(200).json({ apps: [...playResults, ...appleResults] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "App store fetch failed" });
  }
}
