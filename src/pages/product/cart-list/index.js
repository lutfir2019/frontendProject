import { styled } from '@mui/material/styles'
import {
  Button,
  ButtonBase,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { Minus, Plus } from 'mdi-material-ui'
import { formatRupiah } from 'src/@core/utils/globalFunction'
import CartListSection from 'src/layouts/components/cart/nameSection'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import useAlert from '@/stores/alert'
import useCart from '@/stores/cart/useCart'

const ButtonClick = styled(ButtonBase)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.selected
  },
  transition: 'ease-in-out 0.2s',
  borderRadius: '50%',
  padding: 5,
  backgroundColor: theme.palette.background.default
}))

const CellTabelButton = styled(TableCell)(({ theme }) => ({
  border: 'none',
  display: 'flex',
  flexDirection: 'row',
  gap: 40,
  fontSize: 15,
  justifyContent: 'center',
  paddingX: 0,
  alignContent: 'center',
  position: 'relative'
}))

const CartList = () => {
  const { data, addData, deleteData, updateData, getData, is_Loading } = useCart()
  const router = useRouter()
  const alertStore = useAlert()
  const cart_list = []
  const count_product = {}
  let total_price = 0

  useEffect(() => {
    getData()
  }, [])

  data.forEach((item, _i) => {
    const existingCategoryIndex = cart_list?.findIndex(cartItem => cartItem?.catnm === item?.catnm)
    
    // Mengecek apakah prcd sudah ada sebelum menambahkan data
   
    const prcdExists = cart_list?.some(
      cartItem => cartItem?.catnm === item?.catnm && cartItem?.items?.some(i => i?.pcd === item?.pcd)
    )

    if (existingCategoryIndex === -1) {
    
      // Jika kategori belum ada, tambahkan kategori baru ke dalam cart_list
      cart_list.push({
        catnm: item?.catnm,
        items: [{ ...item, index: _i }]
      })
    } else if (!prcdExists) {
    
      // Jika kategori sudah ada tetapi prcd belum ada, tambahkan item ke dalam array items di kategori yang sesuai
      cart_list[existingCategoryIndex]?.items.push({ ...item, index: _i })
    }

    // Menghitung jumlah kemunculan setiap nilai 'prcd'
    if (!count_product[item?.pcd]) {
      count_product[item?.pcd] = 1
    } else {
      count_product[item?.pcd]++
    }
    total_price += item?.price
  })

  const onSubmit = event => {
    event.preventDefault()

    if (cart_list?.length < 1) {
      alertStore.setAlert({
        type: 'error',
        message: 'Tidak ada produk yang di pilih',
        variant: 'standard',
        is_Active: true
      })
      
      return
    }

    // Mengumpulkan semua item dari cart_list ke dalam satu array
    // qtby = quantity buy (jumlah produk yang di beli)
    // newQt = quantity (jumlah baru dari quantity stok dan beli)
    // count_product = total produk quentity produk yang di beli dengan code yang sama
    const updatedItems = cart_list.flatMap(cart => {
      return cart.items.map(item => {
        const newQt = { qty: item.qty - count_product[item.pcd], qtby: count_product[item.pcd] }
        
        return { ...item, ...newQt }
      })
    })

    // Menambahkan total harga ke dalam array hasil
    // ttp = total harga yang harus di bayarkan
    updatedItems.push({ ttp: total_price })

    // Memperbarui data dengan semua item yang telah diperbarui
    updateData(updatedItems)
    router.push('/product/cart-list/receipt/ABC')
  }

  return (
    <TableContainer component={Paper}>
      <form onSubmit={onSubmit}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={5}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Deskripsi</TableCell>
              <TableCell align='center'>Kode</TableCell>
              <TableCell align='center'>Tersedia (pcs)</TableCell>
              <TableCell align='center'>Harga (/pcs)</TableCell>
              <TableCell align='center'>Jumlah (pcs)</TableCell>
            </TableRow>
          </TableHead>
          {cart_list?.length ? (
            cart_list.map(row => (
              <TableBody key={row.catnm}>
                <TableRow>
                  <TableCell colSpan={5} sx={{ border: 'none' }}>
                    <CartListSection>{row.catnm}</CartListSection>
                  </TableCell>
                </TableRow>
                {row.items?.length
                  ? row.items.map(item => (
                      <TableRow key={item?.pcd}>
                        <TableCell sx={{ border: 'none' }}>{item?.pnm}</TableCell>
                        <TableCell sx={{ border: 'none', textAlign: 'center' }}>{item?.pcd}</TableCell>
                        <TableCell sx={{ border: 'none', textAlign: 'center' }}>
                          {item?.qty - count_product[item?.pcd]}
                        </TableCell>
                        <TableCell sx={{ border: 'none', textAlign: 'center' }}>{formatRupiah(item?.price)}</TableCell>
                        <CellTabelButton>
                          <ButtonClick onClick={() => deleteData({ ...item, index: item?.index })}>
                            <Minus fontSize='small' />
                          </ButtonClick>
                          <span style={{ position: 'absolute' }}>{count_product[item?.pcd]}</span>
                          <ButtonClick
                            disabled={item?.qty - count_product[item?.pcd] < 1}
                            onClick={() => addData(item)}
                          >
                            <Plus fontSize='small' />
                          </ButtonClick>
                        </CellTabelButton>
                      </TableRow>
                    ))
                  : ''}
              </TableBody>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell>
                  <h3>Not Found Data</h3>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        {total_price > 0 ? (
          <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
            <TableBody>
              <TableRow>
                <TableCell align='right' sx={{ borderBottom: 1 }}>
                  <h4>Total</h4>
                </TableCell>
                <TableCell align='center' sx={{ borderBottom: 1 }}>
                  {formatRupiah(total_price)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          ''
        )}

        <Grid container display='flex' gap={2} justifyContent={'space-between'} alignContent={'center'} padding={5}>
          <Grid item display={'flex'}>
            <Typography variant='body2' color={'red'}>
              *Cek kembali sebelum melakukan pembayaran
            </Typography>
          </Grid>
          <Grid item>
          <LoadingButton variant='contained' sx={{ marginRight: 3.5 }} type='submit' loading={is_Loading}>
            Bayar
          </LoadingButton>
          <Link href={'/product/'} passHref>
            <Button type='button' variant='outlined'>
              Kembali
            </Button>
          </Link>
          </Grid>
        </Grid>
      </form>
    </TableContainer>
  )
}

export default CartList
