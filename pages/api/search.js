// pages/api/search.ts



export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query param' });

  try {
    const apiRes = await fetch(`https://your-api.com/search?query=${query}`);
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
