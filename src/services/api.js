import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

//export const login = (email, password) => api.post('/login', { email, password });
//export const register = (userData) => api.post('/register', userData);
// Ajoutez d'autres méthodes API ici

export default api;
