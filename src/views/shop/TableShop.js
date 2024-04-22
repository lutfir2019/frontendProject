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
import useCart from '@/stores/cart/useCart'
import useShop from '@/stores/shop/shop'
import useAuth from '@/stores/auth'
import ConfirmDelete from '../dialogs/ConfirmDelete'
import useAlert from '@/stores/alert'

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
  const shopStore = useShop()
  const authStore = useAuth()
  const alertStore = useAlert()

  useEffect(() => {
    setRows(shopStore.data)
  }, [shopStore.data])

  const handleDeleteShop = value => async event => {
    if (!event) return

    const ress = await shopStore.deleteData(value)
    if (ress.status == 200) {
      alertStore.setAlert({
        type: 'success',
        message: ress.data?.message,
        is_Active: true
      })
      userStore.getData()
    } else {
      alertStore.setAlert({
        type: 'error',
        message: ress?.response?.data?.message,
        is_Active: true
      })
    }
  }

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
          <Link href={'/shop/add-edit/-'} passHref>
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
                <StyledTableRow key={row?.spcd}>
                  <Link href={`/shop/add-edit/${row?.spcd}`} passHref>
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
                      <h4 style={{ margin: '0px' }}>{row?.spnm}</h4>
                    </StyledTableCell>
                  </Link>
                  <StyledTableCell align='center'>{row?.spcd}</StyledTableCell>
                  <StyledTableCell>{row?.almt}</StyledTableCell>
                  {authStore.data[0]?.rlcd === 'ROLE-1' && (
                    <StyledTableCell align='center'>
                      <ConfirmDelete handleValue={handleDeleteShop(row)} />
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow aria-rowspan={3}>
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
