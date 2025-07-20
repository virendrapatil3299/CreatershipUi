// // pages/api/topIpadGames.js
// const store = require('app-store-scraper');

// export default async function handler(req, res) {
//   try {
//     const result = await store.list({
//       collection: store.collection.TOP_FREE_IPAD,
//       category: store.category.GAMES_ACTION,
//       num: 2,
//       country: 'us',
//       device: 'ipad'
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Error fetching iPad games:', error.message);
//     res.status(500).json({
//       error: 'Failed to fetch top free iPad action games',
//       details: error.message
//     });
//   }
// }

const store = require('app-store-scraper');

const validCategories = [
  'NEWS', 'GAMES_ACTION', 'GAMES_PUZZLE', 'BOOKS', 'EDUCATION',
  'HEALTH_AND_FITNESS', 'FINANCE', 'PHOTO_AND_VIDEO',
  'PRODUCTIVITY', 'SOCIAL_NETWORKING', 'TRAVEL'
];

// These categories support TOP_PAID in app-store-scraper
const allowedPaidCategories = [
  'GAMES_ACTION', 'GAMES_PUZZLE', 'BOOKS', 'EDUCATION',
  'PRODUCTIVITY', 'HEALTH_AND_FITNESS', 'SOCIAL_NETWORKING'
];

export default async function handler(req, res) {
  const { category = 'NEWS', appType = 'free' } = req.query;

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: `Invalid category: ${category}` });
  }

  // Fallback logic for unsupported paid categories
  const isPaidSupported = appType === 'paid' && allowedPaidCategories.includes(category);
  const collection = isPaidSupported
    ? store.collection.TOP_PAID
    : store.collection.TOP_FREE;

    try {
          const result = await store.list({
            collection: store.collection.collection,
            category: store.category.validCategories,
            
            country: 'us',
            device: 'ipad'
          });

          res.status(200).json(result);
            } catch (error) {
              console.error('Error fetching iPad games:', error.message);
              res.status(500).json({
                error: 'Failed to fetch top free iPad action games',
                details: error.message
              });
}
}
