import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/Map.css";

const Map = ({ lat, lon, attractions }) => {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersLayer = useRef(L.layerGroup());

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
      
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
        if (coordinates && coordinates.length === 2) {
          const [lat, lon] = coordinates;
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
