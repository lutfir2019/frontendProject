import axios from 'axios'

const getBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.VERCEL_URL
  } else {
    return process.env.NEXT_PUBLIC_BASE_URL
  }
}

const axiosInstance = axios.create({
  baseURL: getBaseURL()
})

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
