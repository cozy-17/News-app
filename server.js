const express = require('express');
const fetch = require('node-fetch'); // Install with npm
const app = express();
const port = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

// Serve static files (your HTML, CSS, JS frontend)
app.use(express.static('.'));

// Proxy route for fetching news
app.get('/news', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'No query provided' });

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
