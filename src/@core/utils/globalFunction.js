export const formatRupiah = angka => {
  let number_string = angka?.toString(),
    sisa = number_string?.length % 3,
    rupiah = number_string?.substr(0, sisa),
    ribuan = number_string?.substr(sisa)?.match(/\d{3}/g)
  let separator

  if (ribuan) {
    separator = sisa ? '.' : ''
    rupiah += separator + ribuan.join('.')
  }

  return 'Rp ' + rupiah
}

export const deleteSpace = text => {
  const trimmedText = text?.trim()
  const newText = trimmedText?.replace(/\s/g, '')
  return newText
}

export const notSpecialCharacter = text => {
  const regex = /^[a-zA-Z0-9_]+$/
  if (!regex?.test(text)) {
    return false
  }
  return true
}
