const TorrentSearchApi = require('torrent-search-api');

// تفعيل المزودين العموميين
TorrentSearchApi.enablePublicProviders();

module.exports = async (req, res) => {
  // إعدادات CORS للسماح للفرونت-إند بالاتصال
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    // البحث في التورنت (جلب 20 نتيجة)
    const torrents = await TorrentSearchApi.search(q, 'All', 20);
    return res.status(200).json(torrents);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch torrents', details: error.message });
  }
};
