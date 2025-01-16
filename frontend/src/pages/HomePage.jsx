import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/HomePageStyle.css";
import { fetchCoordinates, fetchTripTips, fetchImage } from "../API/axios";

const HomePage = () => {
  const [destination, setDestination] = useState("");
  const [transport, setTransport] = useState("Walk");
  const [coords, setCoords] = useState(null);
  const [tripTips, setTripTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const [result, tipResult, imageResult] = await Promise.all([
        fetchCoordinates(destination),
        fetchTripTips(destination, transport),
        fetchImage(destination),
      ]);

      // Handle coordinates
      if (result) {
        setCoords(result);
      } else {
        alert("Location not found.");
      }

      // Handle trip tips
      if (tipResult) {
        try {
          const parsedTips = JSON.parse(tipResult[0]?.text ?? "{}");
          setTripTips(parsedTips?.attractions || []);
        } catch (parseError) {
          console.error("Error parsing trip tips:", parseError);
          alert("Failed to parse trip tips.");
        }
      } else {
        alert("Trip tips not found.");
      }

      // Handle image
      if (imageResult) {
        setImage(imageResult);
      } else {
        console.log("Image not found.");
      }
    } catch (error) {
      console.error("Error during search:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="searchBox">
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <select
          onChange={(e) => setTransport(e.target.value)}
          value={transport}
        >
          <option value="Walk">Walk</option>
          <option value="Bicycle">Bicycle</option>
          <option value="Car">Car</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="loading">{loading ? "Loading..." : ""}</div>
      <div className="map-container">
        <Map lat={coords?.lat} lon={coords?.lon} attractions={tripTips} />
      </div>
      {/* Pass coordinates to Map */}
      <div className="tripTips">
        <h2>Trip Tips</h2>
        <ul>
          {tripTips.map((attraction, index) => (
            <li key={index}>
              <b>{attraction.name}:</b> {attraction.description}
            </li>
          ))}
        </ul>
        <div className="image-container">
          {image ? (
            <img src={image} alt="Destination" />
          ) : (
            <p>No image available for this destination.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
