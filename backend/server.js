const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Your React frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

app.get("/api/mapbox-key", (req, res) => {
  res.json({ apiKey: process.env.MAPBOX_API_KEY });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
