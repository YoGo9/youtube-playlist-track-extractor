const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/yt-playlist', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "Missing URL parameter" });

    try {
        const ytWorker = `https://yt-dlp-worker.example.com?url=${encodeURIComponent(url)}`;
        const response = await fetch(ytWorker);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch playlist" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
