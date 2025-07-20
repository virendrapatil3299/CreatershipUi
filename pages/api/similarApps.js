const store = require('app-store-scraper');

// Format ISO date string to YYYY-MM-DD
function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Date(iso).toISOString().split('T')[0];
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const { id } = req.query;

  // Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Valid App ID is required.' });
  }

  try {
    const similar = await store.similar({ id: parseInt(id, 10), country: 'us' });

    const apps = similar.map(app => ({
      id: app.id,
      title: app.title,
      developer: app.developer,
      score: app.score,
      url: app.url,
      icon: app.icon,
      released: formatDate(app.released),
      ratings: app.ratings,
      price: app.price === 0 ? 'Free' : `$${app.price.toFixed(2)}`,
    }));

    res.status(200).json(apps);
  } catch (error) {
    console.error('Error fetching similar apps:', error.message);
    res.status(500).json({ error: 'Failed to fetch similar apps', details: error.message });
  }
}
