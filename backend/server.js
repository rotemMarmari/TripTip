import express from "express";
import cors from "cors";
import { getCoords } from "./services/mapService.js";
import { getAttractions, getPexelsImage } from "./services/ai.js";
import Destination from "./services/dbService.js";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/api/coords", async (req, res) => {
  try {
    const destination = req.query.destination;
    if (!destination) {
      return res
        .status(400)
        .json({ error: "Destination query parameter is required." });
    }

    const coords = await getCoords(destination);
    if (!coords) {
      return res.status(404).json({ error: "Location not found." });
    }

    const { lat, lon } = coords;
    res.status(200).json({ lat, lon });
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    res.status(500).send("An error occurred while fetching coordinates.");
  }
});

app.get("/api/attractions", async (req, res) => {
  try {
    const { destination, tripType } = req.query;

    if (!destination || !tripType) {
      return res
        .status(400)
        .json({ error: "Missing destination or trip type query parameter." });
    }

    const attractions = await getAttractions(destination, tripType);
    if (!attractions) {
      return res.status(404).json({ error: "No attractions found." });
    }

    res.status(200).json({ attractions: attractions });
  } catch (error) {
    console.error("Error fetching attractions:", error.message);
    res.status(500).send("An error occurred while fetching attractions.");
  }
});

app.get("/api/GetImage", async (req, res) => {
  try {
    const { destination } = req.query;
    if (!destination) {
      return res
        .status(400)
        .json({ error: "destination parameter is required." });
    }

    const query = destination;
    const image = await getPexelsImage(query);
    if (!image) {
      return res.status(404).json({ error: "Image not found." });
    }
    res.status(200).json({ image });
  } catch (error) {
    console.error("Error fetching image:", error.message);
    res.status(500).send("An error occurred while fetching image.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
