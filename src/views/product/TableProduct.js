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
import useCart from 'src/stores/cart/useCart'
import useProduct from 'src/stores/product/product'
import { Button, CardActions, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import useAuth from 'src/stores/auth'

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

const createData = (prnm, qty, price, prcd, catnm, catcd) => {
  return { prnm, qty, price, prcd, catnm, catcd }
}

const rows_produk = [
  createData('Kaos Oblong', 159, 100000, 'KSO01', 'Pakaian', 'pkn'),
  createData('Celana Jeans', 237, 200000, 'CNJ01', 'Pakaian', 'pkn'),
  createData('Eiger Tali', 262, 180000, 'EIG01', 'Sendal', 'sdl'),
  createData('Ortuseight', 305, 300000, 'ORE01', 'Sepatu', 'spt'),
  createData('Topi All Star', 356, 100000, 'TPA01', 'Topi', 'tpi')
]

const TableProduct = () => {
  const [filter, setFilter] = useState('')
  const [rows, setRows] = useState([])
  const cartStore = useCart()
  const router = useRouter()
  const productStore = useProduct()
  const authStore = useAuth()

  useEffect(() => {
    productStore.getData()
  }, [])

  useEffect(() => {
    setRows(productStore.data)
  }, [productStore])

  useEffect(() => {
    if (!router.query?.s) {
      setFilter('-')
      productStore.getData()
      return
    }

    const time = setTimeout(() => {
      productStore.getData({ prcd: router.query?.s })
    }, 500)
    return () => clearTimeout(time)
  }, [router.query])

  const filterFunc = values => {
    const { catcd } = values
    setFilter(catcd)

    const time = setTimeout(() => {
      if (catcd == '-') {
        productStore.getData()
        return
      }
      productStore.getData({ catcd: catcd })
    }, 500)
    return () => clearTimeout(time)
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
        <FormControl variant='standard' sx={{ mx: 4, mb: 3, minWidth: 120 }}>
          <InputLabel>Kategori</InputLabel>
          <Select label='Kategori' name='catcd' value={filter} onChange={e => filterFunc({ catcd: e.target.value })}>
            <MenuItem value='-'>All</MenuItem>
            {rows_produk.map((row, index) => (
              <MenuItem value={row.catcd} key={row.catcd + index}>
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
            <Link href={'/product/add-edit/-'}>
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
              rows?.map(row => (
                <StyledTableRow key={row.prnm}>
                  <Link href={`/product/add-edit/${row.prcd}`}>
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
                      <h4 style={{ margin: '0px' }}>{row.prnm}</h4>
                    </StyledTableCell>
                  </Link>
                  <StyledTableCell align='center'>{row.qty}</StyledTableCell>
                  <StyledTableCell align='center'>{row.price}</StyledTableCell>
                  <StyledTableCell align='center'>{row.prcd}</StyledTableCell>
                  <StyledTableCell align='center'>{row.catnm}</StyledTableCell>
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
