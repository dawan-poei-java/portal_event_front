import axios from "axios";

export function setupAuthInterceptor() {
  axios.interceptors.request.use((config) => {
    if (!sessionStorage.getItem("token")) {
      sessionStorage.clear();
    } else {
      const token = sessionStorage.getItem("token");
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  });
}
