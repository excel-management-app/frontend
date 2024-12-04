import axios from "axios";
import qs from "qs";
import { API_URL } from "../utils/consts";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    if (config.method === "POST" || config.method === "PUT") {
      config.data = qs.stringify(config.data);
      config.params = qs.stringify(config.params);
    }
    const token = JSON.parse(
      window.localStorage.getItem("token") as string,
    ) as unknown as string;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
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
