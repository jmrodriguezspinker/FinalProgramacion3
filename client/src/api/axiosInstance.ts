// src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// Agregás el token dinámicamente en cada request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // o sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    //console.log(token);
  }
  return config;
});

export default axiosInstance;
