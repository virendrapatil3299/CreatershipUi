// /api/image-proxy.js
const axios = require('axios');

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send('Missing image URL');

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Failed to proxy image');
  }
}
