'use client'
// ** MUI Imports
import Link from 'next/link'
import { Button, CardActions, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
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
import useUser from 'src/@core/hooks/stores/user/user'
import useAuth from 'src/@core/hooks/stores/auth'
import useAlert from 'src/@core/hooks/stores/alert'
import ConfirmDelete from '../dialogs/ConfirmDelete'
import useShop from 'src/@core/hooks/stores/shop/shop'

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

const TableUser = () => {
  const [filter, setFilter] = useState('')
  const [rows, setRows] = useState([])
  const [shop_list, setShipList] = useState([
    {
      spcd: '',
      spnm: ''
    }
  ])

  const router = useRouter()
  const userStore = useUser()
  const alertStore = useAlert()
  const authStore = useAuth()
  const shopStore = useShop()

  useEffect(() => {
    setRows(userStore?.data)
    setShipList(shopStore?.data)
  }, [userStore?.data, shopStore?.data])

  useEffect(() => {
    if (!router.query?.s) {
      setFilter('-')
      userStore.getData()
      return
    }

    userStore.getData({ nam: router.query?.s, page: 1 })
  }, [router.query])

  const filterFunc = values => {
    const { spcd } = values
    setFilter(spcd)

    if (spcd == '-') {
      userStore.getData()
      return
    }
    userStore.getData({ spcd: spcd, page: 1 })
  }

  const handleDeleteUser = value => async consfirm => {
    if (!consfirm || authStore?.data[0]?.unm == value?.unm) return

    const ress = await userStore.deleteData(value)
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
        <CardHeader title='List Akun' titleTypographyProps={{ variant: 'h6' }} sx={{ paddingBottom: 0 }} />
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: `${authStore.data[0]?.rlcd == 'ROLE-1' ? 'space-between' : 'end'}` // Tombol akan diatur di tengah secara horizontal
        }}
      >
        {authStore.data[0]?.rlcd == 'ROLE-1' && (
          <FormControl variant='standard' sx={{ mx: 4, mb: 3, minWidth: 120 }}>
            <InputLabel>Toko</InputLabel>
            <Select label='Toko' name='spcd' value={filter} onChange={e => filterFunc({ spcd: e.target.value })}>
              <MenuItem value='-'>All</MenuItem>
              {shop_list?.map(row => (
                <MenuItem value={row.spcd} key={row.spcd}>
                  {row.spnm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'end', // Tombol akan diatur di tengah secara horizontal
            alignItems: 'center'
          }}
        >
          <Link href={'/users/add-edit/-'}>
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
              <StyledTableCell sx={{ pr: 25 }}>Nama</StyledTableCell>
              <StyledTableCell align='center'>Toko</StyledTableCell>
              <StyledTableCell align='center'>Role</StyledTableCell>
              {authStore.data[0]?.rlcd == 'ROLE-1' && <StyledTableCell align='center'>#</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length ? (
              rows.map(row => (
                <StyledTableRow key={row.unm}>
                  <Link href={`/users/add-edit/${row.unm}`}>
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
                      <h4 style={{ margin: '0px' }}>{row.nam}</h4>
                    </StyledTableCell>
                  </Link>
                  <StyledTableCell align='center'>{row.spnm}</StyledTableCell>
                  <StyledTableCell align='center'>
                    <Chip
                      label={row.rlnm}
                      color='default'
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </StyledTableCell>
                  {authStore.data[0]?.rlcd === 'ROLE-1' && (
                    <StyledTableCell align='center'>
                      <ConfirmDelete handleValue={handleDeleteUser(row)} />
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

export default TableUser
