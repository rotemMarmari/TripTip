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
    if (!destination.trim()) {
      alert("Please enter a destination before searching.");
      return;
    }
    
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
            normalizedAttractions = (parsedAttractions?.attractions || []).map(
              (attraction) => ({
                name: attraction.name,
                description: attraction.description,
                coordinates: [
                  attraction.coordinates?.latitude,
                  attraction.coordinates?.longitude,
                ],
              })
            );
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
      <div className="intro-container bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center p-8 rounded-2xl shadow-lg my-6 mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to TripTip!</h1>
        <p className="text-lg mb-6">
          Planning your next adventure just got easier. <br />
          With TripTip, you can:
        </p>
        <ul className="text-left mx-auto text-base space-y-3 max-w-md">
          <li className="flex items-center">
            <span className="w-6 h-6 bg-white text-blue-500 rounded-full flex items-center justify-center mr-3 font-semibold">
              1
            </span>
            Search for your dream destination
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-white text-blue-500 rounded-full flex items-center justify-center mr-3 font-semibold">
              2
            </span>
            Choose your trip style (Solo, Family, Couple, Friends)
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-white text-blue-500 rounded-full flex items-center justify-center mr-3 font-semibold">
              3
            </span>
            Explore your custom map with top attractions tailored to your trip
            type
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 bg-white text-blue-500 rounded-full flex items-center justify-center mr-3 font-semibold">
              4
            </span>
            Get AI-powered insights and descriptions about each attraction
          </li>
        </ul>
        <p className="text-lg mt-6">Start planning your perfect journey now!</p>
      </div>

      <div className="searchBox-container bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto my-8">
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <select
          onChange={(e) => setTripType(e.target.value)}
          value={tripType}
          className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          <option value="Solo">Solo</option>
          <option value="Family">Family</option>
          <option value="Couple">Couple</option>
          <option value="Friends Group">Friends Group</option>
        </select>
        <button
          onClick={handleSearch}
          className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      <div className="loader">{loading ? <CircularProgress /> : ""}</div>
      <div className="map-container">
        <Map lat={coords?.lat} lon={coords?.lon} attractions={attractions} />
      </div>
      {/* Pass coordinates to Map */}
      <div className="attractions-container">
        {attractions.length > 0 && <h2>Attractions in {destination}</h2>}
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
