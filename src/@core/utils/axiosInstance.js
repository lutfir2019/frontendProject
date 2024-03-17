import axios from 'axios';
import Cookies from 'js-cookie';

let baseURL;

// Tentukan baseURL berdasarkan lingkungan
if (process.env.NODE_ENV === 'production') {
  // Pastikan untuk menggunakan VERCEL_URL saat dalam mode produksi
  baseURL = process.env.VERCEL_URL;
} else {
  // Pastikan untuk menggunakan BASE_URL saat dalam mode pengembangan
  baseURL = process.env.BASE_URL;
}

// Periksa apakah baseURL ada sebelum membuat instance axios
const axiosInstance = axios.create({
  baseURL: baseURL || 'http://localhost:5000', // Gunakan nilai default jika baseURL tidak ada
});

export default axiosInstance;
