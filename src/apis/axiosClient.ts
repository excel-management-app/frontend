import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
axiosClient.defaults.withCredentials = true;

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    if (config.method === "POST" || config.method === "PUT") {
      config.data = qs.stringify(config.data);
      config.params = qs.stringify(config.params);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosClient;
