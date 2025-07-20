// /pages/api/searchApp.js
const store = require('app-store-scraper');

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q || q.trim() === '') {
    return res.status(400).json({ error: 'Missing query string' });
  }

  try {
    const results = await store.search({
      term: q,
      num: 10,
      country: 'us',
    });

    function formatDate(date) {
      if (!date) return null;
      return new Date(date).toISOString().split('T')[0];
    }

    const simplified = results.map(app => ({
      id: app.id,
      appId: app.appId,
      title: app.title,
      url: app.url,
      icon: app.icon,
      developer: app.developer,
      description: app.description,
      genre: app.genre,
      version: app.version,
      price: app.price === 0 ? 'Free' : `$${app.price?.toFixed(2) || '0.00'}`,
      score: app.score,
      ratings: app.contentRating,
      reviews: app.reviews,
      updated: formatDate(app.updated),
      released: formatDate(app.released),
      size: app.size || 'Unknown',
      languages: app.languages || ['EN'],
      releaseNotes: app.releaseNotes || '',
      screenshots: Array.isArray(app.screenshots) ? app.screenshots.slice(0, 5) : [],
      privacyPolicyUrl: app.privacyPolicyUrl,
      appStoreUrl: app.url,
      supportedDevices: app.supportedDevices || [],
      industry: app.primaryGenre || app.genre,
      totalCreators: Math.floor(Math.random() * 500), // placeholder
      developerUrl: app.developerUrl || '',

      socialLinks: {
        facebook: `https://facebook.com/${app.developer?.replace(/\s+/g, '').toLowerCase()}`,
        twitter: `https://twitter.com/${app.developer?.replace(/\s+/g, '').toLowerCase()}`,
        instagram: `https://instagram.com/${app.developer?.replace(/\s+/g, '').toLowerCase()}`,
      },
    }));

    res.status(200).json(simplified);
  } catch (err) {
    console.error('App search failed:', err);
    res.status(500).json({ error: 'App search failed' });
  }
}
