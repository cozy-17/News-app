const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const API_KEY = 'your_api_key_here';

app.use(express.static('.')); // Serve HTML, CSS, JS files

app.get('/news', async (req, res) => {
    const query = req.query.q;
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
