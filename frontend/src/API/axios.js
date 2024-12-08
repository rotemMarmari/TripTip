import axios from "axios";

PORT = 3000
const BASE_URL = `http://localhost:${PORT}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173/",
  },
});

export default axiosInstance;