import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Replace with your actual backend URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
