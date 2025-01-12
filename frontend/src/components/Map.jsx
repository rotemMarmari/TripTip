import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/MapStyle.css";

const Map = ({ lat, lon }) => {
  const mapRef = useRef(null); // Map container ref
  const leafletMap = useRef(null); // Leaflet map instance ref

  useEffect(() => {
    if (!leafletMap.current) {
      // Initialize map
      leafletMap.current = L.map(mapRef.current, {
        center: [32.08, 34.78], // Default center
        zoom: 14,
      });

      // Add a tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap.current);
    }

    // Update map center when lat/lon changes
    if (lat && lon) {
      leafletMap.current.setView([lat, lon], 14);
    }
  }, [lat, lon]);

  return <div ref={mapRef} style={{ height: "80vh", width: "200vh" }} />;
};

export default Map;
