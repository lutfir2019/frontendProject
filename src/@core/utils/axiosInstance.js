import axios from "axios";

let baseURL;

// Tentukan baseURL berdasarkan lingkungan
if (process.env.NODE_ENV === "production") {
    baseURL = process.env.VERCEL_URL;
} else {
    baseURL = process.env.BASE_URL_DEV;
}

const axiosInstance = axios.create({
    baseURL: baseURL
});

export const setAuthHeader = (token) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default axiosInstance;
