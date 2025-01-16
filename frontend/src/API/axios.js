import axios from "axios";

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCoordinates = async (destination) => {
  try {
    const response = await api.get(`/api/coords?destination=${destination}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return null;
  }
}

export const fetchTripTips = async (destination, transportation) => {
  try {
    const response = await api.get(`/api/trip-tips`, {
      params: { destination, transportation }, 
    });
    return response.data.tripTips; 
  } catch (error) {
    console.error("Error fetching trip tips:", error.message);
    return null;
  }
};

export const fetchImage = async (destination) => {
  try {
    console.log("Fetching image for destination:", destination);
    const response = await api.get("/api/GetImage", {
      params: { destination }, 
    });
    return response.data.image; 
  } catch (error) {
    console.error("Error fetching image:", error.message);
    return null;
  }
};



export default api;
