import axios from "axios";

const BASE_URL = "https://vecros-full-stack-1.onrender.com/"; // Replace with your actual backend URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
