import axios from "axios";
import { useAuthStore } from "./auth-store";

const instance = axios.create({
  baseURL: "http://localhost/",
});

instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token || localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
