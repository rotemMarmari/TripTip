import mongoose from "mongoose";

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.swo2yb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Attraction Schema
const attractionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  });
  
  // Destination Schema
  const destinationSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    tripType: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    attractions: { type: [attractionSchema], default: [] },
  });

// Destination Model
const Destination = mongoose.model("Destination", destinationSchema);

// Export the Model
export default Destination;