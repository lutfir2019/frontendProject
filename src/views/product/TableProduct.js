'use client'
// ** MUI Imports
import Link from 'next/link'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import { Card, CardHeader, Grid } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { CartPlus, Plus } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, CardActions, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import useAuth from '@/stores/auth'
import useProduct from '@/stores/product/product'
import useCart from '@/stores/cart/useCart'
import { formatRupiah } from 'src/@core/utils/globalFunction'
import useShop from '@/stores/shop/shop'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const categori_list = [
  {
    catnm: 'All',
    catcd: '-'
  },
  {
    catnm: 'Pakaian',
    catcd: 'pkn'
  },
  {
    catnm: 'Sendal',
    catcd: 'sdl'
  },
  {
    catnm: 'Sepatu',
    catcd: 'spt'
  },
  {
    catnm: 'Topi',
    catcd: 'tpi'
  }
]

const TableProduct = () => {
  const [rows, setRows] = useState([])
  const cartStore = useCart()
  const router = useRouter()
  const productStore = useProduct()
  const authStore = useAuth()
  const shopStore = useShop()
  const [filter, setFilter] = useState({ spcd: '', catcd: '' })
  const [shop_list, setShipList] = useState([
    {
      spcd: '',
      spnm: ''
    }
  ])

  useEffect(() => {
    setRows(productStore?.data)
    setShipList([{ spcd: '-', spnm: 'All' }, ...shopStore?.data])
  }, [productStore?.data])

  const filterFunc = async values => {
    setFilter(values)
    router.push({ pathname: router.pathname, query: { ...router.query, ...values } })
  }
  return (
    <Card>
      <Grid item>
        <CardHeader title='List Produk' titleTypographyProps={{ variant: 'h6' }} />
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between' // Tombol akan diatur di tengah secara horizontal
        }}
      >
        {authStore.data[0]?.rlcd == 'ROLE-1' && (
          <FormControl variant='standard' sx={{ mx: 4, mb: 3, minWidth: 120 }}>
            <InputLabel>Toko</InputLabel>
            <Select label='Toko' name='spcd' value={filter?.spcd} onChange={e => filterFunc({ spcd: e.target.value })}>
              {shop_list?.map(row => (
                <MenuItem value={row?.spcd} key={row?.spcd}>
                  {row?.spnm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl variant='standard' sx={{ mx: 4, mb: 3, minWidth: 120 }}>
          <InputLabel>Kategori</InputLabel>
          <Select label='Kategori' value={filter?.catcd} onChange={e => filterFunc({ catcd: e.target.value })}>
            {categori_list.map((row, index) => (
              <MenuItem value={row?.catcd} key={row?.catcd + index}>
                {row.catnm}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {['ROLE-1', 'ROLE-2'].includes(authStore.data[0]?.rlcd) && (
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'end', // Tombol akan diatur di tengah secara horizontal
              alignItems: 'center'
            }}
          >
            <Link href={'/product/add-edit/-'} passHref>
              <Button
                size='medium'
                type='button'
                sx={{ borderRadius: 2, padding: 1 }}
                variant='contained'
                color='primary'
              >
                <Plus />
              </Button>
            </Link>
          </CardActions>
        )}
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='list-product'>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ pr: 25 }}>Nama Produk</StyledTableCell>
              <StyledTableCell align='center'>Jumlah Produk</StyledTableCell>
              <StyledTableCell align='center'>Harga (/pcs)</StyledTableCell>
              <StyledTableCell align='center'>Code Produk</StyledTableCell>
              <StyledTableCell align='center'>Kategori</StyledTableCell>
              <StyledTableCell align='center'>Tambah</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length ? (
              rows?.map((row, index) => (
                <StyledTableRow key={index}>
                  <Link href={`/product/add-edit/${row?.pcd}?spcd=${router.query?.spcd}`} passHref>
                    <StyledTableCell
                      component='th'
                      scope='row'
                      sx={{
                        ':hover': {
                          backgroundColor: '#C6A7FE',
                          cursor: 'pointer',
                          color: 'white'
                        },
                        transition: 'ease-in-out 0.1s'
                      }}
                    >
                      <h4 style={{ margin: '0px' }}>{row?.pnm}</h4>
                    </StyledTableCell>
                  </Link>
                  <StyledTableCell align='center'>{row?.qty}</StyledTableCell>
                  <StyledTableCell align='left'>{formatRupiah(row?.price)}</StyledTableCell>
                  <StyledTableCell align='center'>{row?.pcd}</StyledTableCell>
                  <StyledTableCell align='center'>{row?.catnm}</StyledTableCell>
                  <StyledTableCell align='center'>
                    <Button type='button' onClick={() => cartStore.addData(row)}>
                      <CartPlus />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell>
                  <h3>Not Found Data</h3>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default TableProduct
