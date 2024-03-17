'use client'
import { LoadingButton } from '@mui/lab'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useAlert from 'src/@core/hooks/stores/alert'
import useShop from 'src/@core/hooks/stores/shop/shop'

const { CardContent, Grid, TextField, Button } = require('@mui/material')

const AddEditShop = () => {
  const shopStore = useShop()
  const alertStore = useAlert()
  const router = useRouter()
  const { SPCD } = router.query
  const [values, setValue] = useState({
    spnm: '',
    almt: '',
    spcd: ''
  })

  useEffect(() => {
    if (SPCD == '-') return
    setValue(shopStore.data)
  }, [shopStore.data])

  const handleChange = props => e => {
    setValue({ ...values, [props]: e.target.value })
  }
  const onSubmit = async event => {
    event.preventDefault()

    let ress
    if (SPCD == '-') {
      ress = await shopStore.addData(values)
    } else {
      ress = await shopStore.updateData(values)
    }

    if (ress.status == 200) {
      alertStore.setAlert({
        type: 'success',
        message: ress.data?.message,
        is_Active: true
      })
    } else {
      alertStore.setAlert({
        type: 'error',
        message: ress.response?.data?.message,
        is_Active: true
      })
    }
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
              value={values.spnm}
              onChange={handleChange('spnm')}
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
            <LoadingButton
              variant='contained'
              sx={{ marginRight: 3.5 }}
              type='submit'
              loading={shopStore.is_SoftLoading}
            >
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
