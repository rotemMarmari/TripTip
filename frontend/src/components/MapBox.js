import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = () => {
  const mapContainer = useRef(null);
  const [mapboxApiKey, setMapboxApiKey] = useState("");

  useEffect(() => {
    // Fetch the API key from the backend
    axios
      .get("/api/mapbox-key")
      .then((response) => {
        setMapboxApiKey(response.data.apiKey);
      })
      .catch((error) => {
        console.error("Error fetching the Mapbox API key:", error);
      });
  }, []);

  useEffect(() => {
    if (!mapboxApiKey) return;

    mapboxgl.accessToken = mapboxApiKey;
    const map = new mapboxgl.Map({
      container: mapContainer.current, // Reference to the map container
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [-74.006, 40.7128], // Initial map center [lng, lat]
      zoom: 12, // Initial zoom level
    });

    // Cleanup on component unmount
    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
};

export default MapBox;
