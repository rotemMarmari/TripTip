# TripTip

## Overview
TripTip is a MERN-based application designed to give future travelers a quick overview of attractions in their chosen destination. By entering a destination and selecting the trip style, users can explore a map with attraction markers and view attraction cards below the map, which include images, names, and brief descriptions of the attractions. 

### Target Audience
TripTip is for anyone planning to travel and curious about the attractions available at their desired destination.

## Features
- **Search Box**: Enter a destination name (e.g., a city).
- **Trip Style Combo Box**: Choose a trip type (Solo, Family, Couple, or Friends Group).
- **Destination Map**: View a map displaying markers for each attraction.
- **Attractions Cards**: See attraction details, including:
  - Image
  - Name
  - Short description
- **Destination Image**: A visually appealing image of the destination.

![image](https://github.com/user-attachments/assets/ccd0c291-522d-424d-a15b-d22f4be547c6)

## Technologies Used
- **Frontend**:
  - React
  - Tailwind CSS (with some plain CSS)
- **Backend**:
  - Node.js
  - Express
- **Database**:
  - MongoDB
- **SDKs and APIs**:
  - Leaflet SDK for interactive maps
  - OpenStreetMap API for destination coordinates
  - Cohere.ai SDK for generating attraction information and coordinates
  - Pexels SDK for fetching destination and attraction images

## Data Storage
The application uses MongoDB to store destination data and related attractions. Below are the schemas used:

```javascript
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
```

## Environment Variables
The application requires the following environment variables:
- `PEXELS_API_KEY` for accessing the Pexels SDK
- `COHERE_API_KEY` for accessing the Cohere.ai SDK
- `MONGO_USER` for MongoDB username
- `MONGO_PASSWORD` for MongoDB password

### Example `.env` File
```plaintext
PEXELS_API_KEY=your_pexels_api_key_here
COHERE_API_KEY=your_cohere_api_key_here
MONGO_USER=your_mongodb_username
MONGO_PASSWORD=your_mongodb_password
```

## Installation
To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/triptip.git
   ```
2. Navigate to the project directory:
   ```bash
   cd triptip
   ```
3. Install dependencies for both the backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
4. Add a `.env` file in the `backend` directory with the required keys.
5. Start the application:
   - Open two terminals:
     - **Backend**:
       ```bash
       cd backend
       npm start
       ```
     - **Frontend**:
       ```bash
       cd frontend
       npm start
       ```

## Deployment
Deployment is not yet complete. Future updates will include deployment details.

![image](https://github.com/user-attachments/assets/4650b4cb-4390-4cb5-8750-08f19127439e)


## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests. No specific guidelines are set at the moment, but be respectful of the project’s goals and structure.

## Known Issues
There are no known issues at the moment. Testing will be conducted to identify and address potential bugs.

---

Feel free to provide feedback or suggest changes to improve the README further. Once your app is tested and deployed, this README can be updated with screenshots, deployment instructions, and any additional instructions.

