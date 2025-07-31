require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL; // من متغير بيئي

app.use(express.json());

// Route: Home
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Route: أسعار الصرف
app.get('/api/rates', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
