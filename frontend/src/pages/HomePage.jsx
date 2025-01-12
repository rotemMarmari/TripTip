import React, { useState } from "react";
import Map from "../components/Map";
import "../styles/HomePageStyle.css";
import { fetchCoordinates } from "../API/axios";

const HomePage = () => {
  const [destination, setDestination] = useState("");
  const [transport, setTransport] = useState("Walk");
  const [coords, setCoords] = useState(null); // Store coordinates

  const handleSearch = async () => {
    try {
      const result = await fetchCoordinates(destination); // Call API function
      if (result) {
        setCoords(result); // Update coordinates
      } else {
        alert("Location not found.");
      }
    } catch (error) {
      console.error("Error during search:", error.message);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>TripTip</h1>
      </div>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <select>
          <option value="Walk">Walk</option>
          <option value="Bicycle">Bicycle</option>
          <option value="Car">Car</option>
          onChange={(e) => setTransport(e.target.value)}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <Map lat={coords?.lat} lon={coords?.lon} /> {/* Pass coordinates to Map */}
    </div>
  );
};

export default HomePage;
