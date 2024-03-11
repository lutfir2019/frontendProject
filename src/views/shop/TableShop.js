'use client'
// ** MUI Imports
import Link from 'next/link'
import { Button, CardActions } from '@mui/material'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import { Card, CardHeader, Grid } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Plus } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useCart from 'src/@core/hooks/stores/cart/useCart'
import useShop from 'src/@core/hooks/stores/shop/shop'
import useAuth from 'src/@core/hooks/stores/auth'

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

const TableShop = () => {
  const [rows, setRows] = useState([])
  const router = useRouter()
  const cartStore = useCart()
  const shopStore = useShop()
  const authStore = useAuth()

  useEffect(() => {
    setRows(shopStore.data)
  }, [shopStore])

  useEffect(() => {
    if (!router.query?.s) {
      shopStore.getData()
      return
    }
    const time = setTimeout(() => {
      shopStore.getData({ tknm: router.query?.s })
    }, 500)
    return () => clearTimeout(time)
  }, [router.query])

  return (
    <Card>
      <Grid item>
        <CardHeader title='List Toko' titleTypographyProps={{ variant: 'h6' }} sx={{ paddingBottom: 0 }} />
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between' // Tombol akan diatur di tengah secara horizontal
        }}
      >
        <CardActions
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'end', // Tombol akan diatur di tengah secara horizontal
            alignItems: 'center'
          }}
        >
          <Link href={'/shop/add-edit/-'}>
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
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ pr: 25 }}>Nama Toko</StyledTableCell>
              <StyledTableCell align='center'>Kode Toko</StyledTableCell>
              <StyledTableCell>Alamat</StyledTableCell>
              {authStore.data[0]?.rlcd == 'ROLE-1' && <StyledTableCell align='center'>#</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length ? (
              rows?.map(row => (
                <StyledTableRow key={row.tkcd}>
                  <Link href={`/shop/add-edit/${row.tkcd}`}>
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
                      <h4 style={{ margin: '0px' }}>{row.tknm}</h4>
                    </StyledTableCell>
                  </Link>
                  <StyledTableCell align='center'>{row.tkcd}</StyledTableCell>
                  <StyledTableCell>{row.almt}</StyledTableCell>
                  {authStore.data[0]?.rlcd === 'ROLE-1' && (
                    <StyledTableCell align='center'>
                      <Button
                        type='button'
                        onClick={() => cartStore.addData(row)}
                        sx={{ padding: 0 }}
                        variant='contained'
                        color='error'
                      >
                        <span style={{ color: 'whitesmoke', textTransform: 'none' }}>Hapus</span>
                      </Button>
                    </StyledTableCell>
                  )}
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

export default TableShop
