import axios from "axios";

// Get API base URL from environment or use default
const apiUrl =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

export const API_BASE_URL = apiUrl;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        `HTTP ${error.response.status}: ${error.response.statusText}`;
      error.message = errorMessage;
    } else if (error.request) {
      error.message =
        "Network error: No response from server. Please check your connection.";
    } else {
      error.message = error.message || "An error occurred";
    }
    return Promise.reject(error);
  }
);

export const api = {
  get: (endpoint, config = {}) =>
    axiosInstance.get(endpoint, config).then((res) => res.data),
  post: (endpoint, data, config = {}) =>
    axiosInstance.post(endpoint, data, config).then((res) => res.data),
  put: (endpoint, data, config = {}) =>
    axiosInstance.put(endpoint, data, config).then((res) => res.data),
  patch: (endpoint, data, config = {}) =>
    axiosInstance.patch(endpoint, data, config).then((res) => res.data),
  delete: (endpoint, config = {}) =>
    axiosInstance.delete(endpoint, config).then((res) => res.data),
};
