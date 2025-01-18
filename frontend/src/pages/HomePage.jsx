import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AttractionCard from "../components/AttractionCard";
import "../styles/HomePage.css";
import { fetchCoordinates, fetchTripTips, fetchImage } from "../API/axios";
import CircularProgress from "@mui/material/CircularProgress";

const HomePage = () => {
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("Solo");
  const [coords, setCoords] = useState(null);
  const [tripTips, setTripTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const [result, tipResult, imageResult] = await Promise.all([
        fetchCoordinates(destination),
        fetchTripTips(destination, tripType),
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
        setSearched(true);
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
      <div className="searchBox-container">
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <select onChange={(e) => setTripType(e.target.value)} value={tripType}>
          <option value="Solo">Solo</option>
          <option value="Family">Family</option>
          <option value="Couple">Couple</option>
          <option value="Friends Group">Friends Group</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="loader">{loading ? <CircularProgress /> : ""}</div>
      <div className="map-container">
        <Map lat={coords?.lat} lon={coords?.lon} attractions={tripTips} />
      </div>
      {/* Pass coordinates to Map */}
      <div className="tripTips">
        <h2>Trip Tips</h2>
        <div className="cards-container">
          {tripTips.map((attraction, index) => (
            <AttractionCard
              key={index}
              attraction={attraction.name}
              description={attraction.description}
            />
          ))}
        </div>
      </div>
      <div className="image-container">
        {searched &&
          (image ? (
            <img src={image} alt="Destination" />
          ) : (
            <p>No image available for this destination.</p>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
