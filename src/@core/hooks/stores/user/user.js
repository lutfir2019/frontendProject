import { create } from 'zustand'

const useUser = create(set => ({
  data: [],
  message: '',
  is_Error: false,
  is_Loading: false,
  is_SoftLoading: false,

  // Fungsi untuk mengambil data produk berdasarkan parameter
  getData: async params => {
    set({
      is_Loading: true,
      is_SoftLoading: true
    })

    // Simulasi pengambilan data
    let rows_user = [
      createData(
        'lutfir-rahman',
        'Lutfir Rahman',
        'lutfirrahman',
        'LWG001',
        'Toko Lawang',
        'ROLE-1',
        'Super Admin',
        'Jl. Manunggal',
        '081391197324',
        'laki-laki'
      ),
      createData(
        'rahman-rahman',
        'Rahman',
        'rahman123',
        'LWG002',
        'Lawang Indah',
        'ROLE-2',
        'Admin',
        'jl. asdasd',
        '081234567890',
        'laki-laki'
      ),
      createData(
        'lutfir-lutfir',
        'Lutfir',
        'lutfir123',
        'DCI001',
        'Distro Satu',
        'ROLE-2',
        'Admin',
        'jl. asdasd asdasdasd asd',
        '081234567890',
        'laki-laki'
      ),
      createData(
        'sopian-sopian',
        'Sopian',
        'sopian123',
        'DCI001',
        'Distro Satu',
        'ROLE-3',
        'Karyawan',
        'jl. asdasd asdasd',
        '081234567890',
        'laki-laki'
      ),
      createData(
        'iqbal-iqbal',
        'Iqbal',
        'iqbal123',
        'LWG001',
        'Toko Lawang',
        'ROLE-3',
        'Karyawan',
        'jl. asdasd asdasd asdasd',
        '081234567890',
        'laki-laki'
      ),
      createData(
        'sebastian-stringg',
        'sebastian',
        'sebastia123',
        'LWG001',
        'Toko Lawang',
        'ROLE-3',
        'Karyawan',
        'jl. asdasd asdasd klasd9',
        '081234567891',
        'laki-laki'
      )
    ]

    // Lakukan filter hanya ketika terdapat params
    if (params?.tkcd) {
      rows_user = rows_user.filter(({ tkcd }) => tkcd === params.tkcd)
    } else if (params?.nam) {
      rows_user = rows_user.filter(({ nam }) => nam === params.nam)
    } else if (params?.uid) {
      rows_user = rows_user.filter(({ uid }) => uid === params.uid)
    }

    // Mengatur state data dengan data yang diperoleh
    set({ data: rows_user, is_Loading: false, is_SoftLoading: false })
  },

  // Fungsi untuk menambahkan data ke state
  addData: params => {
    set({ is_Loading: true, is_SoftLoading: true })
    console.log(params)
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
      // Menghapus data dari state berdasarkan tkcd dan index
      const filter_data = state.data.filter((item, index) => !(item?.tkcd === params?.tkcd && index === params?.index))
      return { data: filter_data, is_Loading: false, is_SoftLoading: false }
    })
  }
}))

// Fungsi pembuat data produk
const createData = (uid, nam, unam, tkcd, tknm, rlcd, rlnm, almt, nhp, gdr) => {
  return { uid, nam, unam, tkcd, tknm, rlcd, rlnm, almt, nhp, gdr }
}

export default useUser
