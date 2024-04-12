import axios from 'axios'

// Tentukan baseURL berdasarkan lingkungan
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    // Pastikan untuk menggunakan VERCEL_URL saat dalam mode produksi
    return process.env.VERCEL_URL
  } else {
    // Pastikan untuk menggunakan BASE_URL saat dalam mode pengembangan
    return process.env.NEXT_PUBLIC_BASE_URL
  }
}

const axiosInstance = axios.create({
  baseURL: getBaseURL() // Gunakan nilai default jika baseURL tidak ada
})

// Tambahkan interceptor respons untuk menangani kesalahan jaringan
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error.response) alert('Network Error')
    return Promise.reject(error)
  }
)

export default axiosInstance
