import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.swo2yb6.mongodb.net/TripTip?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log(`MongoDB connected!`))
  .catch((err) => console.error("MongoDB connection error:", err));


  const attractionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    coordinates: {
      type: [Number], // Array of numbers [latitude, longitude]
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 2; // Ensure the array has exactly two elements
        },
        message: "Coordinates must contain exactly two elements: [latitude, longitude]",
      },
    },
  });

const destinationSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  tripType: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  attractions: [attractionSchema], // Embedded sub-document for attractions
});

// Destination Model
const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;