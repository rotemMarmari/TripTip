import React, { useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  // Initial viewport settings
  const [viewport, setViewport] = useState({
    latitude: 37.7749, // San Francisco coordinates
    longitude: -122.4194,
    zoom: 10,
    bearing: 0,
    pitch: 0
  });

  // Optional: Add some markers
  const [markers, setMarkers] = useState([
    {
      latitude: 37.7749,
      longitude: -122.4194,
      title: 'San Francisco'
    }
  ]);

  // Optional: Handle map click to add new markers
  const handleMapClick = (event) => {
    const { lngLat } = event;
    setMarkers([
      ...markers, 
      {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
        title: 'New Marker'
      }
    ]);
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={viewport}
        style={{width: '100%', height: '100%'}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={evt => setViewport(evt.viewState)}
        onClick={handleMapClick}
      >
        <NavigationControl position="top-right" />
        
        {markers.map((marker, index) => (
          <Marker 
            key={index}
            latitude={marker.latitude} 
            longitude={marker.longitude}
            color="red"
          />
        ))}
      </Map>
    </div>
  );
};

export default Map;