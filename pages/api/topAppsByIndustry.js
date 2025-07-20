// /pages/api/topAppsByIndustry.js
const store = require('app-store-scraper');

const categoryMap = {
  'Image & Video': store.category.PHOTO_AND_VIDEO,
  'Health & Fitness': store.category.HEALTH_AND_FITNESS,
  'Music': store.category.MUSIC,
  'Business': store.category.BUSINESS,
  'Shopping': store.category.SHOPPING,
  'Education': store.category.EDUCATION,
  'Entertainment': store.category.ENTERTAINMENT,
  'Book': store.category.BOOKS,
  'News': store.category.NEWS,
  'Games': store.category.GAMES,
  'Games - Action': store.category.GAMES_ACTION,
  'Games - Puzzle': store.category.GAMES_PUZZLE,
  'Finance': store.category.FINANCE,
  'Productivity': store.category.PRODUCTIVITY,
  'Social Networking': store.category.SOCIAL_NETWORKING,
  'Travel': store.category.TRAVEL,
  'Lifestyle': store.category.LIFESTYLE,
  'Utilities': store.category.UTILITIES,
  'Weather': store.category.WEATHER,
  'Food & Drink': store.category.FOOD_AND_DRINK,
  'Reference': store.category.REFERENCE,
  'Sports': store.category.SPORTS,
  'Navigation': store.category.NAVIGATION,
  'Medical': store.category.MEDICAL,
  'Catalogs': store.category.CATALOGS,
  'Newsstand': store.category.NEWSSTAND,
  'Graphics & Design': store.category.GRAPHICS_AND_DESIGN,
  'Productivity & Tools': store.category.PRODUCTIVITY_AND_TOOLS,
  'Lifestyle & Personalization': store.category.LIFESTYLE_AND_PERSONALIZATION,
  'Health & Fitness & Medical': store.category.HEALTH_AND_FITNESS_AND_MEDICAL,
};

async function getTopCreatorForApp(appName) {
  const mockDatabase = {
    Instagram: { name: 'kyliejenner', followers: 400_000_000 },
    TikTok: { name: 'charlidamelio', followers: 150_000_000 },
    YouTube: { name: 'MrBeast', followers: 250_000_000 },
  };

  return (
    mockDatabase[appName] || {
      name: `creator_${Math.floor(Math.random() * 1000)}`,
      followers: Math.floor(Math.random() * 10_000_000),
    }
  );
}

function formatDate(date) {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
}

export default async function handler(req, res) {
  const { industry = 'Image & Video', type = 'free', limit = 100 } = req.query;
  const category = categoryMap[industry];

  if (!category) {
    return res.status(400).json({ error: 'Invalid industry selected.' });
  }

  const collection = type === 'paid' ? store.collection.TOP_PAID : store.collection.TOP_FREE;

  try {
    const basicApps = await store.list({
      collection,
      category,
      country: 'us',
      num: parseInt(limit, 10),
    });

    const results = await Promise.all(
      basicApps.map(async (app) => {
        try {
          const appDetails = await store.app({ id: app.id });
          const topCreator = await getTopCreatorForApp(appDetails.title);

          return {
            id: appDetails.id,
            appId:appDetails.appId,
            title: appDetails.title,
            url: appDetails.url,
            icon: appDetails.icon,
            developer: appDetails.developer,
            description: appDetails.description,
            genre: appDetails.genre,
            version: appDetails.version,
            price: appDetails.price === 0 ? 'Free' : `$${appDetails.price}`,
            score: appDetails.score,
            ratings: appDetails.contentRating,
            reviews: appDetails.reviews,
            updated: formatDate(appDetails.updated),
            released: formatDate(appDetails.released),
            size: appDetails.size,
            languages:appDetails.languages,
            releaseNotes: appDetails.releaseNotes,
            screenshots: appDetails.screenshots.slice(0, 5),
            privacyPolicyUrl: appDetails.privacyPolicyUrl,
            appStoreUrl: appDetails.url,
            releaseNotes:appDetails.releaseNotes,
            supportedDevices:appDetails.supportedDevices,
            industry,
            topCreator,
            totalCreators: Math.floor(Math.random() * 500),
            developerUrl: appDetails.developerUrl,
            
            socialLinks: {
              facebook: `https://facebook.com/${appDetails.developer?.replace(/\s+/g, '').toLowerCase()}`,
              twitter: `https://twitter.com/${appDetails.developer?.replace(/\s+/g, '').toLowerCase()}`,
              instagram: `https://instagram.com/${appDetails.developer?.replace(/\s+/g, '').toLowerCase()}`,
            },
          };
        } catch (error) {
          console.warn(`Failed to fetch app details for ${app.title}:`, error.message);
          return null;
        }
      })
    );

    const filtered = results.filter(Boolean);
    res.status(200).json(filtered);
  } catch (err) {
    console.error('App scraper error:', err);
    res.status(500).json({ error: 'Failed to fetch industry apps.' });
  }
}
