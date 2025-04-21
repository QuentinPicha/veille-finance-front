const express = require('express');
const Parser = require('rss-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const parser = new Parser();

app.use(cors());

const feeds = {
  "letemps": "https://www.letemps.ch/rss",
  "lemonde": "https://www.lemonde.fr/economie/rss_full.xml",
  "wsj": "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
  "bloomberg": "https://www.bloomberg.com/feed/podcast/bloombergbusinessweek.xml",
  "ft": "https://rss.app/feeds/J9Ub9yQbBJ0wRrSB.xml",
  "reddit": "https://www.reddit.com/r/wallstreetbets/.rss",
  "bi": "https://markets.businessinsider.com/rss/news",
  "cnbc": "https://www.cnbc.com/id/100003114/device/rss/rss.html",
  "reuters": "http://feeds.reuters.com/reuters/businessNews",
  "fortune": "https://fortune.com/feed/"
};

app.get('/rss/:source', async (req, res) => {
  const source = req.params.source.toLowerCase();
  const url = feeds[source];

  if (!url) return res.status(404).json({ error: 'Flux inconnu' });

  try {
    const feed = await parser.parseURL(url);
    res.json({
      title: feed.title,
      items: feed.items.slice(0, 5).map(item => ({
        title: item.title,
        link: item.link,
        date: item.pubDate
      }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur de parsing RSS' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ API de veille financière active. Essaye /rss/letemps');
});

app.listen(port, () => {
  console.log(`✅ RSS API ready on http://localhost:${port}`);
});
