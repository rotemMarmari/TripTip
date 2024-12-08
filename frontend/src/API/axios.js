import axios from "axios";

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
