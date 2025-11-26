import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    // timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔹 Request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 🔹 Response interceptor
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("API Error:", error?.response || error);
        return Promise.reject(error?.response?.data || error);
    }
);

export default api;
