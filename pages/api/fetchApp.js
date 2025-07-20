const store = require('app-store-scraper');

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'App ID is required' });

  try {
    const appData = await store.app({ id: parseInt(id), ratings: true });
    res.status(200).json({
      title: appData.title,
      developer: appData.developer,
      score: appData.score,
      ratings: appData.ratings,
      url: appData.url,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch app data', details: error.message });
  }
}
