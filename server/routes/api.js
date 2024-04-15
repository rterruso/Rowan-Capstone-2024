require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();



router.get('/', (req, res) => {
  res.send('API Home');
});




// Movie search endpoint instead of directly calling to .env
router.get('/moviesearch', async (req, res) => {
  const query = req.query.query;
  const apiKey = process.env.TMDB_API_KEY;

  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


module.exports = router;