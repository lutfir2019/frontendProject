'use client'
// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Icons Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import { Typography } from '@mui/material'
import useAlert from 'src/@core/hooks/stores/alert'
import useAuth from 'src/@core/hooks/stores/auth'
import useUser from 'src/@core/hooks/stores/user/user'

const createData = (tkcd, tknm) => {
  return { tkcd, tknm }
}

const tkcd = 'LWG001'

const rows_toko = [
  createData('LWG001', 'Toko Lawang'),
  createData('LWG002', 'Lawang Indah'),
  createData('DCI001', 'Distro Satu')
]

const rows_role = [
  {
    rlcd: 'ROLE-3',
    rlnm: 'Karyawan'
  },
  {
    rlcd: 'ROLE-2',
    rlnm: 'Admin'
  },
  {
    rlcd: 'ROLE-1',
    rlnm: 'Super Admin'
  }
]

const TabAccount = () => {
  // ** State
  const userStore = useUser()
  const router = useRouter()
  const authStore = useAuth()
  const { UID } = router.query
  const alertStore = useAlert()
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [values, setValue] = useState({
    unam: '',
    nam: '',
    rlcd: 'ROLE-3',
    rlnm: '',
    tkcd: tkcd,
    tknm: '',
    pass: '',
    confirmpass: ''
  })

  useEffect(() => {
    if (UID == '-') return
    setValue({ ...userStore.data[0] })
  }, [userStore, UID])

  const handleChange = event => {
    const { name, value } = event.target
    const selectedRlnm = rows_role?.find(({ rlcd }) => rlcd == value)
    const selectedTknm = rows_toko?.find(({ tkcd }) => tkcd == value)

    setValue({ ...values, [name]: value })

    if (selectedRlnm) {
      const { rlnm } = selectedRlnm
      setValue({ ...values, rlcd: value, rlnm: rlnm })
    } else if (selectedTknm) {
      const { tknm } = selectedTknm
      setValue({ ...values, tkcd: value, tknm: tknm })
    }

    if (name === 'pass') setPasswordsMatch(value === values.confirmpass)
  }

  const handleMatchPassword = event => {
    const { name, value } = event.target
    setValue({ ...values, [name]: value })
    setPasswordsMatch(value === values.pass)
  }

  const onSubmit = event => {
    event.preventDefault()
    if (!passwordsMatch) return
    // router.push('/users')
    // if(!values.unam){
    console.log(values)
    // }
    alertStore.setAlert({
      type: 'success',
      message: 'Success add data',
      is_Active: true
    })
    router.push('/users/add-edit/samuel-yunandar/')
  }

  return (
    <form onSubmit={onSubmit}>
      <CardContent>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Username'
              name='unam'
              placeholder='johnDoe'
              value={values.unam}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' name='nam' value={values.nam} onChange={handleChange} required />
          </Grid>
          {UID == '-' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Password'
                name='pass'
                value={values.pass}
                onChange={handleChange}
                required
              />
            </Grid>
          )}
          {UID == '-' && (
            <Grid item xs={12} sm={6}>
              <TextField
                error={!passwordsMatch}
                fullWidth
                label='Confirm Password'
                name='confirmpass'
                value={values.confirmpass}
                onChange={handleMatchPassword}
                required
              />
              {!passwordsMatch && (
                <Typography variant='body2' color='error'>
                  Passwords do not match.
                </Typography>
              )}
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label='Role'
                name='rlcd'
                value={values.rlcd}
                onChange={handleChange}
                disabled={authStore.data[0]?.rlcd !== 'ROLE-1'}
                required
              >
                {rows_role?.map(row => (
                  <MenuItem value={row?.rlcd} key={row?.rlcd}>
                    {row.rlnm}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Toko</InputLabel>
              <Select
                label='Toko'
                name='tkcd'
                value={values.tkcd}
                onChange={handleChange}
                disabled={authStore.data[0]?.rlcd !== 'ROLE-1'}
                required
              >
                {rows_toko?.map(row => (
                  <MenuItem value={row.tkcd} key={row.tkcd}>
                    {row.tknm}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
              Save Changes
            </LoadingButton>
            <Link href='/users'>
              <Button type='button' variant='outlined' color='secondary'>
                Cancel
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </form>
  )
}

export default TabAccount
