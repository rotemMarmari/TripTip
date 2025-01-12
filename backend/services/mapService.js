import fetch from "node-fetch";

export const getCoords = async (destination) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json`
    );

    const data = await response.json();

    if (data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon,
      };
    }
    return null; 
  } catch (error) {
    console.error("Error in getCoords:", error.message);
    throw error;
  }
};
