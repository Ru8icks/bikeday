const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();

const CACHE_TTL_SECONDS = 15 * 60;
const cache = new NodeCache({ stdTTL: CACHE_TTL_SECONDS, checkperiod: 120 });

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running successfully' });
});

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }
  
  const cityKey = city.toLowerCase();

  const cachedData = cache.get(cityKey);
  if (cachedData) {
    console.log(`Cache for: ${cityKey}`);
    return res.json(cachedData);
  }

  console.log(`no cache for: ${cityKey}. using API.`);
  
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search`;
    const geoResponse = await axios.get(geoUrl, {
      params: { name: city, count: 1, language: 'en', format: 'json' },
    });

    const geoData = geoResponse.data;
    console.log(geoData)
    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ error: `City not found: ${city}` });
    }

    const { latitude, longitude, name: foundCity, country } = geoData.results[0];
    const fullCityName = `${foundCity}, ${country}`;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast`;
    const weatherResponse = await axios.get(weatherUrl, {
      params: {
        latitude,
        longitude,
        current: 'temperature_2m,precipitation,wind_speed_10m,weather_code',
      },
    });

    const responseData = {
      city: fullCityName,
      weather: weatherResponse.data,
    };
    
    cache.set(cityKey, responseData);
    res.json(responseData);
    
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data.reason || 'Failed request' });
    }
    res.status(500).json({ error: 'Request failed' });
  }
});

module.exports = app;
