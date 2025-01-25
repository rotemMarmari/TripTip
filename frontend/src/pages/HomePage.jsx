import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AttractionCard from "../components/AttractionCard";
import "../styles/HomePage.css";
import {
  fetchCoordinates,
  fetchAttractions,
  fetchImage,
  checkDestinationInDB,
  saveDestination,
} from "../API/axios";
import CircularProgress from "@mui/material/CircularProgress";

const HomePage = () => {
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("Solo");
  const [coords, setCoords] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const data = await checkDestinationInDB(destination, tripType);
    if (data.message === "Destination does not exist.") {
      try {
        const [result, attractionsResult, imageResult] = await Promise.all([
          fetchCoordinates(destination),
          fetchAttractions(destination, tripType),
          fetchImage(destination),
        ]);

        if (result) {
          setCoords(result);
        } else {
          alert("Location not found.");
        }
        let normalizedAttractions = [];
        if (attractionsResult) {
          try {
            const parsedAttractions = JSON.parse(
              attractionsResult[0]?.text ?? "{}"
            );
              normalizedAttractions = (
              parsedAttractions?.attractions || []
            ).map((attraction) => ({
              name: attraction.name,
              description: attraction.description,
              coordinates: [
                attraction.coordinates?.latitude,
                attraction.coordinates?.longitude,
              ],
            }));
            setAttractions(normalizedAttractions);
          } catch (parseError) {
            console.error("Error parsing attractions:", parseError);
            alert("Failed to parse attractions.");
          }
        } else {
          alert("Attractions not found.");
        }

        if (imageResult) {
          setSearched(true);
          setImage(imageResult);
        } else {
          console.log("Image not found.");
        }

        if (result && normalizedAttractions.length > 0) {
          saveDestination(destination, tripType, result, normalizedAttractions);
        }
      } catch (error) {
        console.error("Error during search:", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setCoords({ lat: data.data.latitude, lon: data.data.longitude });
        const normalizedAttractions = data.data.attractions.map(
          (attraction) => ({
            ...attraction,
            coordinates: attraction.coordinates,
          })
        );
        setAttractions(normalizedAttractions);

        setSearched(true);

        const imageResult = await fetchImage(destination);
        if (imageResult) {
          setImage(imageResult);
        }
      } catch (error) {
        console.error("Error during search:", error.message);
      } finally {
        setLoading(false);
      }
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
        <Map lat={coords?.lat} lon={coords?.lon} attractions={attractions} />
      </div>
      {/* Pass coordinates to Map */}
      <div className="tripTips">
        <h2>Trip Tips</h2>
        <div className="cards-container">
          {attractions.map((attraction, index) => (
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
