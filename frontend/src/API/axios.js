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
    return response.data; // Return coordinates
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return null;
  }
}

export default api;
