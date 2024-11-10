import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333",
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
