import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/Map.css";

const Map = ({ lat, lon, attractions }) => {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersLayer = useRef(L.layerGroup());

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
      markersLayer.current.addTo(leafletMap.current); // Add marker layer to map
    }
  
    if (lat && lon) {
      leafletMap.current.setView([lat, lon], 14);
    }
  
    markersLayer.current.clearLayers();
    if (attractions && attractions.length > 0) {
      attractions.forEach(({ name, coordinates }) => {
        if (coordinates?.latitude && coordinates?.longitude) {
          const lat = parseFloat(coordinates.latitude.toFixed(4));
          const lon = parseFloat(coordinates.longitude.toFixed(4));
          L.marker([lat, lon], { alt: name })
            .addTo(markersLayer.current)
            .bindPopup(`<b>${name}</b>`);
        }
      });
    }
  }, [lat, lon, attractions]);
  
  return <div ref={mapRef} style={{ height: "80vh", width: "200vh" }} />;
};

export default Map;
