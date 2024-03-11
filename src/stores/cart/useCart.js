import { create } from 'zustand'

const useCart = create(set => ({
  data: [],
  message: '',
  isError: false,
  is_Loading: false,
  is_SoftLoading: false,
  getData: () => {
    set({ is_Loading: true, is_SoftLoading: true })
    const storage = localStorage.getItem('cartData')
    let cartData = []
    if (storage) {
      cartData = JSON.parse(storage)
    }
    set(state => ({
      data: cartData,
      is_Loading: false,
      is_SoftLoading: false
    }))
  },
  addData: params => {
    set({ is_Loading: true, is_SoftLoading: true })
    // Menambahkan params ke dalam array data
    set(state => {
      const newData = [...state.data, params]
      localStorage.setItem('cartData', JSON.stringify(newData))
      // Menyimpan data ke dalam cookie setelah mengonversinya menjadi string JSON
      // Cookies.set('cartData', JSON.stringify(newData), { path: '/product/cart-list/' })
      return {
        data: newData,
        is_Loading: false,
        is_SoftLoading: false
      }
    })
  },
  updateData: params => {
    set({ is_Loading: true, is_SoftLoading: true })
    localStorage.removeItem('cartData')
    // set(state => {})
  },
  deleteData: params =>
    set(state => {
      const filter_data = state.data.filter((item, index) => !(item?.prcd === params?.prcd && index === params?.index))
      localStorage.setItem('cartData', JSON.stringify(filter_data))
      return { data: filter_data, is_Loading: false, is_SoftLoading: false }
    })
}))

export default useCart
