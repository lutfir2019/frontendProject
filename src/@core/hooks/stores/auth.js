import Cookies from 'js-cookie'
import { FormatLetterCaseLower } from 'mdi-material-ui'
import axiosInstance from 'src/@core/utils/axiosInstance'
import { create } from 'zustand'

const useAuth = create(set => ({
  data: [],
  message: '',
  is_Error: false,
  is_Loading: false,
  is_SoftLoading: false,
  token: Cookies.get('__sid'),

  getData: async params => {
    try {
      const { token } = useAuth.getState()
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      set({ is_Loading: true, is_SoftLoading: true })
      // Menggunakan cookie untuk menyimpan data
      const base64 = Cookies.get('__u')
      let user = []
      if (base64) {
        const stringify = atob(base64)
        user = JSON.parse(stringify)
      }
      set({ data: [user], is_Loading: false, is_SoftLoading: false })
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      set({ is_Error: true, message: error.message, is_Loading: false, is_SoftLoading: false })
      return error // Melemparkan kembali kesalahan untuk ditangani di luar fungsi
    }
  },

  login: async credentials => {
    set({ is_Loading: true, is_SoftLoading: true })
    try {
      const response = await axiosInstance.post('/api/auth/login', credentials)
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data?.token}`

      // Tambahkan data pengguna ke cookie
      const stringify = JSON.stringify(response.data.data)
      const base64 = btoa(stringify)
      Cookies.set('__u', base64, { path: '/', expires: 1 }) // Cookie berlaku selama 7 hari
      Cookies.set('__sid', response.data?.token, { path: '/', expires: 1 }) // Cookie berlaku selama 7 hari

      set({
        data: [response.data.data],
        message: response.data.message,
        token: response.data.token,
        is_Error: false
      })
      return response // Mengembalikan respons dari panggilan API
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      set({ is_Error: true, is_Loading: false, is_SoftLoading: false, message: error.response?.data.message || 'Login Filed' })
      return error // Melemparkan kembali kesalahan untuk ditangani di luar fungsi
    }
  },

  // Fungsi untuk melakukan logout
  logout: async () => {
    set({ is_Loading: true, is_SoftLoading: true })
    try {
      const { token } = useAuth.getState()
      const response = await axiosInstance.post('/api/auth/logout', {
        sessionid: token // Menggunakan state.token langsung tanpa menggunakan set
      })
      delete axiosInstance.defaults.headers.common['Authorization']
      Cookies.remove('__u')
      Cookies.remove('__sid')
      set({
        data: [],
        message: '',
        is_Error: false,
        is_Loading: false,
        is_SoftLoading: false,
        token: ''
      })
      return response
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      set({ is_Error: true, message: error.response?.data.message, is_Loading: false, is_SoftLoading: false })
      return error // Melemparkan kembali kesalahan untuk ditangani di luar fungsi
    }
  }
}))

export default useAuth
