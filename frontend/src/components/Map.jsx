import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet"; // Import the full Leaflet library
import "../styles/MapStyle.css"; // Your custom CSS
import {MapContainer} from "react-leaflet"

const Map = () => {
  const mapRef = useRef(null); // Create a ref for the map container

  useEffect(() => {
    if (mapRef.current) {
      // Initialize the Leaflet map
      const map = L.map(mapRef.current, {
        center: [51.505, -0.09], // Coordinates for the map's initial center
        zoom: 13,               // Initial zoom level
      });

      // Add a tile layer to the map
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Cleanup the map instance on component unmount
      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div className="map">
      <div
        ref={mapRef}
        style={{
          height: "80vh",
          width: "200vh",
        }}
      />
    </div>
  );
};

export default Map;
