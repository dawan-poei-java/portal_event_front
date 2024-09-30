import axios from "axios";

export function setupAuthInterceptor() {
  axios.interceptors.request.use((config) => {
    if (isTokenExpired()) {
      sessionStorage.clear();
    } else {
      const token = sessionStorage.getItem("token");
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  });
}

export const isTokenExpired = () => {
  const expiration = sessionStorage.getItem("expiresAt");
  const token = sessionStorage.getItem("token");
  if (!expiration && token) {
    return true;
  } else {
    return new Date(expiration) < new Date();
  }
};
