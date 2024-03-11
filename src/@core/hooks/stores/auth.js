import Cookies from 'js-cookie'
import axiosInstance from 'src/@core/utils/axiosInstance'
import { create } from 'zustand'

const useAuth = create(set => ({
  data: [],
  message: '',
  is_Error: false,
  is_Loading: false,
  is_SoftLoading: false,

  // Fungsi untuk mengambil data produk berdasarkan parameter
  getData: async params => {
    set({ is_Loading: true, is_SoftLoading: true })
    // Menggunakan cookie untuk menyimpan data
    const base64 = Cookies.get('user')
    let stringify = ''
    let user = []
    if (base64) {
      stringify = atob(base64)
      user = JSON.parse(stringify)
    }
    set(state => ({ data: [user], is_Loading: false, is_SoftLoading: false }))
  },

  // Fungsi untuk melakukan login
  login: async credentials => {
    const data = [
      {
        uid: 'sebastian-stringg',
        nam: 'Sebastian',
        unam: 'sebastia123',
        rlcd: 'ROLE-2',
        rlnm: 'Admin',
        tkcd: 'LWG001',
        tknm: 'Toko Lawang',
        almt: 'jl. asdasd asdasd klasd9',
        nhp: '081234567891',
        gdr: 'laki-laki'
      }
    ]
    set({ is_Loading: true, is_SoftLoading: true })
    try {
      const response = { data: { token: 'mjckjsdkjh-lkvuytuydsadfadt' }, status: 200 }
      // const response = await axiosInstance.post('/', credentials)

      if (response.status === 200) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

        // Tambahkan data pengguna ke cookie
        const stringify = JSON.stringify(data[0])
        const base64 = btoa(stringify)
        Cookies.set('user', base64, { path: '/' }) // Cookie berlaku selama 7 hari
        Cookies.set('token', response.data.token, { path: '/' }) // Cookie berlaku selama 7 hari

        set({ data: data, is_Loading: false, is_SoftLoading: false })
      } else {
        set({ is_Error: true, message: response.data.message, is_Loading: false, is_SoftLoading: false })
      }
    } catch (error) {
      set({ is_Error: true, message: error.message, is_Loading: false, is_SoftLoading: false })
    }
  },

  // Fungsi untuk melakukan logout
  logout: async () => {
    set({ is_Loading: true, is_SoftLoading: true })
    try {
      // Lakukan proses logout di sini, seperti menghapus token atau membersihkan sesi
      // Misalnya:
      delete axiosInstance.defaults.headers.common['Authorization']
      // Hapus cookie pengguna
      Cookies.remove('user')
      Cookies.remove('token')
      // Reset state data
      set({ data: [], message: '', is_Error: false, is_Loading: false, is_SoftLoading: false })
    } catch (error) {
      set({ is_Error: true, message: error.message, is_Loading: false, is_SoftLoading: false })
    }
  }
}))

export default useAuth
