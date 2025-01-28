import axios from "axios";

const PORT = 3000;
const BASE_URL = "https://triptip-backend.onrender.com";

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

export const fetchAttractions = async (destination, tripType) => {
  try {
    const response = await api.get(`/api/attractions`, {
      params: { destination, tripType }, 
    });
    return response.data.attractions; 
  } catch (error) {
    console.error("Error fetching attractions:", error.message);
    return null;
  }
};

export const fetchImage = async (destination) => {
  try {
    const response = await api.get("/api/GetImage", {
      params: { destination }, 
    });
    return response.data.image; 
  } catch (error) {
    console.error("Error fetching image:", error.message);
    return null;
  }
};

export const checkDestinationInDB = async (destination, tripType) => {
  try {
    const response = await api.get(`/api/checkDestination`, {
      params: { destination, tripType }, 
    });
    return response.data; 
  } catch (error) {
    console.error("Error checking destination:", error.message);
    return null;
  }
}

export const saveDestination = async (destination, tripType, coords, attractions) => {
  try {
    const response = await api.post(`/api/saveDestination`, {
      destination,
      tripType,
      coords,
      attractions
    });
    return response.data; // Returns the saved data from the backend
  } catch (error) {
    console.error("Error saving destination:", error.message);
    return null;
  }
};


export default api;
