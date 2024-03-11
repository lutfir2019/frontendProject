'use client'
// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports

// ** Styled Components
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAlert from 'src/@core/hooks/stores/alert'
import useUser from 'src/@core/hooks/stores/user/user'

const TabInfo = () => {
  // ** State
  const router = useRouter()
  const { UID } = router.query
  const alertStore = useAlert()
  const userStore = useUser()
  const [values, setValue] = useState({
    almt: '',
    nhp: '',
    gdr: ''
  })

  useEffect(() => {
    if (UID === '-') return
    setValue({ ...userStore.data[0] })
  }, [userStore])

  const handleChange = props => event => {
    setValue({ ...values, [props]: event.target.value })
  }

  const onSubmit = event => {
    event.preventDefault()
    console.log(values)
    alertStore.setAlert({
      type: 'success',
      message: 'Success add data',
      is_Active: true
    })
  }

  return (
    <CardContent>
      <form onSubmit={onSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Alamat'
              minRows={2}
              placeholder='Alamat'
              value={values.almt}
              onChange={handleChange('almt')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Phone'
              placeholder='081234567890'
              value={values.nhp}
              onChange={handleChange('nhp')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup
                row
                value={values.gdr}
                aria-label='gender'
                name='user-settings-info-radio'
                onChange={handleChange('gdr')}
              >
                <FormControlLabel value='laki-laki' label='Laki-Laki' control={<Radio />} />
                <FormControlLabel value='perempuan' label='Perempuan' control={<Radio />} />
              </RadioGroup>
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
      </form>
    </CardContent>
  )
}

export default TabInfo
