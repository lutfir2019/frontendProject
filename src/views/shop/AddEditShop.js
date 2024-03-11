'use client'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useShop from 'src/stores/shop/shop'

const { CardContent, Grid, TextField, Button } = require('@mui/material')

const AddEditShop = () => {
  const shopStore = useShop()
  const router = useRouter()
  const { TKCD } = router.query
  const [values, setValue] = useState({
    tknm: '',
    almt: ''
  })

  useEffect(() => {
    if (TKCD == '-') return
    setValue({ ...shopStore.data[0] })
  }, [shopStore])

  const handleChange = props => e => {
    setValue({ ...values, [props]: e.target.value })
  }
  const onSubmit = event => {
    event.preventDefault()
    console.log(values)
  }
  return (
    <CardContent>
      <form onSubmit={onSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Nama Toko'
              placeholder='Toko Lawang'
              value={values.tknm}
              onChange={handleChange('tknm')}
              required
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Alamat'
              minRows={2}
              placeholder='Alamat'
              value={values.almt}
              onChange={handleChange('almt')}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton variant='contained' sx={{ marginRight: 3.5 }} type='submit' loading={shopStore.is_Loading}>
              Save Changes
            </LoadingButton>
            <Link href='/shop'>
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

export default AddEditShop
