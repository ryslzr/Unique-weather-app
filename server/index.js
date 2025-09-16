const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 5000;
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(cors({
  origin: 'http://localhost:3000' // allow frontend to talk to backend
}));
app.use(bodyParser.json());

// Start server
app.listen(port, hostname, () => {
  console.log(`The server is running on ${hostname}:${port}`);
});

// Route to get weather
app.post('/', async (req, res) => {
  try {
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=52.481&lon=-1.900&units=metric&appid=${process.env.api_key}`
    );

     const celsius = weather.data.main.temp;
    const fahrenheit = (celsius * 9) / 5 + 32;

    // Clean response for frontend
    const formattedData = {
      city: weather.data.name,
      temperatureC: celsius.toFixed(1),   // Celsius
      temperatureF: fahrenheit.toFixed(1), // Fahrenheit
      description: weather.data.weather[0].description,
      icon: weather.data.weather[0].icon
    };

    
    res.json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});



