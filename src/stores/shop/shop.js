import axiosInstance from 'src/@core/utils/axiosInstance'
import { create } from 'zustand'

const useShop = create(set => ({
  data: [],
  message: '',
  is_Error: false,
  is_Loading: false,
  is_SoftLoading: false,
  page: 1,
  page_size: 10,
  total_page: 1,
  count_item: 0,

  // Fungsi untuk mengambil data produk berdasarkan parameter
  getData: async params => {
    set({ is_Loading: true, is_SoftLoading: true })
    const { page, page_size } = useShop.getState()
    try {
      const response = await axiosInstance.post('/api/shops/get-shop', {
        page: page,
        page_size: page_size,
        ...params
      })
      set({
        data: response.data?.data?.data,
        is_Loading: false,
        is_SoftLoading: false,
        is_Error: false,
        message: response.data?.message,
        page: response.data?.data?.pagination?.currentPage,
        page_size: response.data?.data?.pagination?.perPage,
        total_page: response.data?.data?.pagination?.totalPages,
        count_item: response.data?.data?.pagination?.totalItems
      })
      return response
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      set({ is_Error: true, message: error.response?.data.message, is_Loading: false, is_SoftLoading: false })
      return error
    }
  },

  // Fungsi untuk menambahkan data ke state
  addData: async params => {
    set({ is_Loading: true, is_SoftLoading: true })
    try {
      const response = await axiosInstance.post(`/api/shops/post-shop`, params)
      set({
        is_Loading: false,
        is_SoftLoading: false,
        message: response.data?.message
      })
      return response
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      set({ is_Error: true, message: error.response?.data?.message, is_Loading: false, is_SoftLoading: false })
      return error
    }
  },

  getDetails: async params => {
    set({ is_Loading: true, is_SoftLoading: true })
    const { page, page_size } = useShop.getState()
    try {
      const response = await axiosInstance.post(`/api/shops/get-shop/${params?.spcd}`, {
        page: page,
        page_size: page_size
      })
      set({
        data: response.data?.data?.data,
        is_Loading: false,
        is_SoftLoading: false,
        message: response.data?.message,
        page: response.data?.data?.pagination?.currentPage,
        page_size: response.data?.data?.pagination?.perPage,
        total_page: response.data?.data?.pagination?.totalPages,
        count_item: response.data?.data?.pagination?.totalItems
      })
      return response
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      set({ is_Error: true, message: error.response?.data.message, is_Loading: false, is_SoftLoading: false })
      return error
    }
  },

  // Fungsi untuk memperbarui data dalam state
  updateData: async params => {
    set({ is_Loading: true, is_SoftLoading: true })
    try {
      const response = await axiosInstance.put(`/api/shops/put-shop`, params)
      set({
        is_Loading: false,
        is_SoftLoading: false,
        message: response.data?.message
      })
      return response
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      set({ is_Error: true, message: error.response?.data?.message, is_Loading: false, is_SoftLoading: false })
      return error
    }
  },

  // Fungsi untuk menghapus data dari state
  deleteData: async params => {
    set({ is_Loading: true, is_SoftLoading: true })
    try {
      const response = await axiosInstance.delete(`/api/shops/delete-shop/${params.spcd}`)
      set({
        is_Loading: false,
        is_SoftLoading: false,
        message: response.data?.message
      })
      return response
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      set({ is_Error: true, message: error.response?.data?.message, is_Loading: false, is_SoftLoading: false })
      return error
    }
  }
}))

export default useShop
