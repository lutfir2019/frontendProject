import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL
})

export const setAuthHeader = (token) =>{
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axiosInstance;