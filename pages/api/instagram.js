import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Missing username' });

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36'
    );

    await page.goto(`https://www.instagram.com/${username}/`, {
      waitUntil: 'networkidle2',
      timeout: 0,
    });

    await page.waitForSelector('header', { timeout: 10000 });

    const data = await page.evaluate(() => {
      const name = document.querySelector('header h1, header h2')?.innerText || '';
      const stats = document.querySelectorAll('header li span');
      const posts = stats[0]?.innerText;
      const followers = stats[1]?.title || stats[1]?.innerText;
      const following = stats[2]?.innerText;
      const bio = document.querySelector('header .-vDIg span')?.innerText || '';
      const profilePic = document.querySelector('header img')?.src;

      return { name, posts, followers, following, bio, profilePic };
    });

    await browser.close();
    res.status(200).json(data);
  } catch (err) {
    console.error('SCRAPER ERROR:', err);
    res.status(500).json({ error: 'Failed to scrape profile.' });
  }
}
