import axios from "axios";

const apiUrl = "http://localhost:8080";

export const API_BASE_URL = apiUrl;

const paramsSerializer = (params) => {
  const searchParams = new URLSearchParams();

  const appendParam = (key, value) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else if (value !== null && value !== undefined) {
      searchParams.append(key, value);
    }
  };

  Object.keys(params).forEach((key) => {
    appendParam(key, params[key]);
  });

  return searchParams.toString();
};

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer,
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
