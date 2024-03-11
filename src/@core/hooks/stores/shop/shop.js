import { create } from 'zustand'

const useShop = create(set => ({
  data: [],
  message: '',
  is_Error: false,
  is_Loading: false,
  is_SoftLoading: false,

  // Fungsi untuk mengambil data produk berdasarkan parameter
  getData: async params => {
    set({ is_Loading: true, is_SoftLoading: true })
    // Simulasi pengambilan data
    let rows_toko = [
      createData('LWG001', 'Toko Lawang', 'Jalan Kenangan adasdad'),
      createData('LWG002', 'Lawang Indah', 'Jl. MEgawati'),
      createData('DCI001', 'Distro Satu', 'Jl. DI Panjaitan')
    ]

    // Lakukan filter hanya ketika terdapat params
    if (params?.tkcd) {
      rows_toko = rows_toko.filter(({ tkcd }) => tkcd === params.tkcd)
    } else if (params?.tknm) {
      rows_toko = rows_toko.filter(({ tknm }) => tknm === params.tknm)
    }

    // Mengatur state data dengan data yang diperoleh
    set({ data: rows_toko, is_Loading: false, is_SoftLoading: false })
  },

  // Fungsi untuk menambahkan data ke state
  addData: params => {
    set({ is_Loading: true, is_SoftLoading: true })
    set(state => ({
      data: [...state.data, params],
      is_Loading: false,
      is_SoftLoading: false
    }))
  },

  // Fungsi untuk memperbarui data dalam state
  updateData: params => {
    set({ is_Loading: true, is_SoftLoading: true })
    // Anda perlu menambahkan logika untuk memperbarui data di sini
    console.log('Update data:', params)
    set(state => ({ is_Loading: false, is_SoftLoading: false }))
  },

  // Fungsi untuk menghapus data dari state
  deleteData: params => {
    set({ is_Loading: true, is_SoftLoading: true })
    set(state => {
      // Menghapus data dari state berdasarkan prcd dan index
      const filter_data = state.data.filter((item, index) => !(item?.prcd === params?.prcd && index === params?.index))
      return { data: filter_data, is_Loading: false, is_SoftLoading: false }
    })
  }
}))

// Fungsi pembuat data produk
const createData = (tkcd, tknm, almt) => {
  return { tkcd, tknm, almt }
}

export default useShop
