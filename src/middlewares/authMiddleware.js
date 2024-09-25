import axios from "axios";

export function setupAuthInterceptor() {
  axios.interceptors.request.use((config) => {
    if (isTokenExpired()) {
      localStorage.clear();
    } else {
      const token = localStorage.getItem("token");
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  });
}

export const isTokenExpired = () => {
  const expiration = localStorage.getItem("expiresAt");
  const token = localStorage.getItem("token");
  if (!expiration && token) {
    return true;
  } else {
    return new Date(expiration) < new Date();
  }
};
