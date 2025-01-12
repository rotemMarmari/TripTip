import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/MapStyle.css";

const Map = ({ lat, lon }) => {
  const mapRef = useRef(null); 
  const leafletMap = useRef(null); 

  useEffect(() => {
    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current, {
        center: [32.08, 34.78], // Default center to Tel Aviv
        zoom: 14,
      });

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
