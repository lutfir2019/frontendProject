import { create } from 'zustand'

const useProduct = create(set => ({
  data: [],
  message: '',
  is_Error: false,
  is_Loading: false,
  is_SoftLoading: false,

  // Fungsi untuk mengambil data produk berdasarkan parameter
  getData: async params => {
    set({ is_Loading: true, is_SoftLoading: true })
    // Simulasi pengambilan data
    const date = new Date()
    let rows_produk = [
      createData('Kaos Oblong', 159, 100000, 'KSO01', 'Pakaian', 'pkn', date, 'LWG001'),
      createData('Celana Jeans', 237, 200000, 'CNJ01', 'Pakaian', 'pkn', date, 'LWG001'),
      createData('Eiger Tali', 262, 180000, 'EIG01', 'Sendal', 'sdl', date, 'LWG001'),
      createData('Ortuseight', 305, 300000, 'ORE01', 'Sepatu', 'spt', date, 'LWG001'),
      createData('Topi All Star', 356, 100000, 'TPA01', 'Topi', 'tpi', date, 'LWG001')
    ]

    // Lakukan filter hanya ketika terdapat params
    if (params?.prcd) {
      rows_produk = rows_produk.filter(({ prcd }) => prcd === params.prcd)
    } else if (params?.catcd) {
      rows_produk = rows_produk.filter(({ catcd }) => catcd === params.catcd)
    }

    // Mengatur state data dengan data yang diperoleh
    set({ data: rows_produk, is_Loading: false, is_SoftLoading: false })
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
const createData = (prnm, qty, price, prcd, catnm, catcd, crby, tkcd) => {
  // crby = tanggal pembelian / tanggal kapan barang tersebut di belanjakan dari grosir
  return { prnm, qty, price, prcd, catnm, catcd, crby, tkcd }
}

export default useProduct
