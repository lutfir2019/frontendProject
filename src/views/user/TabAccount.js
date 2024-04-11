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
import useShop from 'src/@core/hooks/stores/shop/shop'
import PasswordField from '../password/password'

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
  const shopStore = useShop()
  const { UNM } = router.query
  const alertStore = useAlert()
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [values, setValue] = useState({
    unm: '',
    nam: '',
    rlcd: 'ROLE-3',
    rlnm: 'Karyawan',
    spcd: '',
    spnm: '',
    pass: '',
    confirmpass: ''
  })
  const [shop_list, setShop] = useState([
    {
      spcd: '',
      spnm: ''
    }
  ])
  const [checklenpass, setCheckLen] = useState(false)
  const [pathUnm, setPath] = useState(false)

  useEffect(() => {
    setPath(UNM == '-')
    setShop(shopStore?.data)
    setValue({ ...values, spcd: authStore.data[0]?.spcd, spnm: authStore.data[0]?.spnm })
    if (UNM == '-') return
    setValue({ ...userStore?.data })
  }, [userStore.data, UNM, shopStore.data])

  const handleChange = event => {
    const { name, value } = event.target
    const selectedRlnm = rows_role?.find(({ rlcd }) => rlcd == value)
    const selectedTknm = shop_list?.find(({ spcd }) => spcd == value)

    setValue({ ...values, [name]: value })

    if (selectedRlnm) {
      const { rlnm } = selectedRlnm
      setValue({ ...values, rlcd: value, rlnm: rlnm })
    } else if (selectedTknm) {
      const { spnm } = selectedTknm
      setValue({ ...values, spcd: value, spnm: spnm })
    }

    if (name === 'pass') setPasswordsMatch(value === values.confirmpass)
  }

  const handleMatchPassword = event => {
    const { name, value } = event.target
    setValue({ ...values, [name]: value })
    setPasswordsMatch(value === values.pass)
  }

  const onSubmit = async () => {
    if (pathUnm) {
      if (values.pass.length < 6) setCheckLen(true)
      if (!passwordsMatch || values.pass?.length < 6) return
    }

    let ress
    if (UNM == '-') {
      ress = await userStore.addData(values)
    } else {
      ress = await userStore.updateData(values)
    }
    
    if (ress.status == 200) {
      alertStore.setAlert({
        type: 'success',
        message: ress.data?.message,
        is_Active: true
      })
      router.push(`/users/add-edit/${values?.unm}/`)
    } else {
      alertStore.setAlert({
        type: 'error',
        message: ress.response?.data?.message,
        is_Active: true
      })
    }
  }

  return (
    <form>
      <CardContent>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Username'
              name='unm'
              placeholder='johnDoe'
              value={values?.unm}
              onChange={handleChange}
              required
              disabled={UNM != '-'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' name='nam' value={values?.nam} onChange={handleChange} required />
          </Grid>
          {pathUnm && (
            <Grid item xs={12} sm={6}>
              <PasswordField name='pass' onChange={handleMatchPassword} label='Password' />
              {checklenpass && (
                <Typography variant='caption' color='error'>
                  Password should be at least 6 characters long
                </Typography>
              )}
            </Grid>
          )}
          {pathUnm && (
            <Grid item xs={12} sm={6}>
              <PasswordField
                name='confirmpass'
                onChange={handleMatchPassword}
                label='Confirm Password'
                error={!passwordsMatch}
              />
              {!passwordsMatch && (
                <Typography variant='caption' color='error'>
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
                value={values?.rlcd}
                onChange={handleChange}
                disabled={authStore.data[0]?.rlcd !== 'ROLE-1'}
                required
              >
                {rows_role?.map(row => (
                  <MenuItem value={row?.rlcd} key={row?.rlcd}>
                    {row?.rlnm}
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
                name='spcd'
                value={values?.spcd}
                onChange={handleChange}
                disabled={authStore.data[0]?.rlcd !== 'ROLE-1'}
                required
              >
                {shop_list?.map(row => (
                  <MenuItem value={row?.spcd} key={row?.spcd}>
                    {row?.spnm}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              variant='contained'
              sx={{ marginRight: 3.5 }}
              type='button'
              onClick={() => onSubmit()}
              loading={userStore?.is_SoftLoading}
            >
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
