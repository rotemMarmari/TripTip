import axios from "axios";

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const backendCheck = async () => {
  try {
    const response = await api.get("/api/test");
    console.log(response.data.message);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default api;
