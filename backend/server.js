import express from "express";
import cors from "cors";
import { getCoords } from "./services/mapService.js";
import { getAttractions, getPexelsImage } from "./services/ai.js";
import Destination from "./services/dbService.js";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.onrender.com"],
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

//check if data already exists in db
app.get("/api/checkDestination", async (req, res) => {
  try {
    console.log("Checking data base...");
    const { destination, tripType } = req.query;
    if (!destination || !tripType) {
      return res
        .status(400)
        .json({ error: "Missing destination or trip type query parameter." });
    }

    const existingRecord = await Destination.findOne({
      destination,
      tripType,
    });

    if (existingRecord) {
      return res.status(200).json({ message: "Destination already exists.", data: existingRecord });
    } else {
      return res.status(201).json({ message: "Destination does not exist." });
    }
  } catch (error) {
    console.error("Error checking destination:", error.message);
    res.status(500).send("An error occurred while checking destination.");
  }
    });

app.post("/api/saveDestination", async (req, res) => {
  try {
    const { destination, tripType, coords, attractions } = req.body;
    if (!destination || !tripType || !coords || !attractions) {
      return res
        .status(400)
        .json({ error: "Missing required parameters." });
    }

    // Check if destination and trip type already exist
    const existingRecord = await Destination.findOne({
      destination,
      tripType,
    });

    if (existingRecord) {
      return res.status(200).json({ message: "Destination already exists.", data: existingRecord });
    }

    // Save data in the database
    const newDestination = new Destination({
      destination,
      tripType,
      latitude: coords.lat,
      longitude: coords.lon,
      attractions: attractions.map((attr) => ({
        name: attr.name,
        description: attr.description,
        coordinates: attr.coordinates,
      })),
    });

    await newDestination.save();
    res.status(201).json({ message: "Destination saved successfully.", data: newDestination });
  } catch (error) {
    console.error("Error saving destination:", error.message);
    res.status(500).send("An error occurred while saving the destination.");
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
