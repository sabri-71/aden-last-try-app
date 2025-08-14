// Simple Express backend server
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Add your API endpoints here

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
