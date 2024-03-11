'use client'
import { forwardRef, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DatePicker from 'react-datepicker'
import { ButtonBase, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material'
import Link from 'next/link'
import { Plus, TrashCanOutline } from 'mdi-material-ui'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { styled } from '@mui/material/styles'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import useProduct from 'src/stores/product/product'
import useAuth from 'src/stores/auth'
import { LoadingButton } from '@mui/lab'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Pembelian' autoComplete='off' />
})

const DeleteButton = styled(ButtonBase)(({ theme }) => ({
  borderRadius: '50%',
  padding: '10px',
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  '&:hover': {
    backgroundColor: theme.palette.error.dark
  },
  transition: 'ease-in-out 0.2s'
}))

const listCatnm = [
  {
    catcd: 'pkn',
    catnm: 'Pakaian'
  },
  {
    catcd: 'sdl',
    catnm: 'Sendal'
  },
  {
    catcd: 'spt',
    catnm: 'Sepatu'
  },
  {
    catcd: 'tpi',
    catnm: 'Topi'
  }
]

const AddEditProduct = () => {
  const router = useRouter()
  const date = new Date()
  const { PRCD } = router.query
  const productStore = useProduct()
  const authStore = useAuth()
  const [isDisableField, setDisableField] = useState(true)
  const [productList, setProductList] = useState([
    {
      catcd: 'pkn',
      catnm: '',
      prnm: '',
      prcd: '',
      price: 0,
      crby: date,
      qty: 0
    }
  ])

  useEffect(() => {
    if (!['ROLE-1', 'ROLE-2']?.includes(authStore.data[0]?.rlcd)) {
      setDisableField(true)
    } else {
      setDisableField(false)
    }
  }, [authStore.data[0]?.rlcd])

  useEffect(() => {
    if (PRCD == '-') return
    setProductList([...productStore?.data])
  }, [productStore])

  const handleChange = (event, index) => {
    const { name, value } = event.target
    const updatedProductList = [...productList]
    const selectedCatnm = listCatnm?.find(({ catcd }) => catcd == value)
    updatedProductList[index][name] = value

    if (selectedCatnm) {
      const { catnm } = selectedCatnm
      updatedProductList[index] = {
        ...updatedProductList[index],
        catnm: catnm
      }
    }
    setProductList(updatedProductList)
  }

  const handleAddProduct = () => {
    setProductList([
      ...productList,
      {
        catcd: 'pkn',
        catnm: '',
        prnm: '',
        prcd: '',
        price: 0,
        crby: date,
        qty: 0
      }
    ])
  }

  const handleDeleteProduct = index => {
    const updatedProductList = [...productList]
    updatedProductList.splice(index, 1)
    setProductList(updatedProductList)
  }

  const onSubmit = event => {
    event.preventDefault()
    console.log('productList', productList)
  }

  return (
    <form onSubmit={onSubmit}>
      {productList.map((product, index) => (
        <CardContent key={index}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} display={'flex'} gap={5}>
              <Tooltip title='Kode max. 4 karakter' placement='top-start'>
                <TextField
                  fullWidth
                  name='prcd'
                  label='Kode Produk'
                  placeholder='contoh: KSK01'
                  value={product?.prcd}
                  onChange={e => handleChange(e, index)}
                  required
                  disabled={isDisableField}
                />
              </Tooltip>
              <TextField
                fullWidth
                name='qty'
                type='number'
                label='Jumlah Produk'
                placeholder='contoh: 2'
                value={product.qty}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={e => handleChange(e, index)}
                required
                disabled={isDisableField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title='Input tanpa tanda titik(.) atau koma(,). Harga /pcs' placement='top-start'>
                <TextField
                  fullWidth
                  name='price'
                  label='Harga Satuan'
                  type='number'
                  placeholder='100000'
                  inputProps={{ min: 0 }}
                  value={product.price}
                  onChange={e => handleChange(e, index)}
                  required
                  disabled={isDisableField}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Nama Produk'
                name='prnm'
                placeholder='contoh: Kaos Kerah'
                value={product.prnm}
                onChange={e => handleChange(e, index)}
                required
                disabled={isDisableField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerWrapper>
                <DatePicker
                  selected={product.crby}
                  name='crby'
                  showYearDropdown
                  showMonthDropdown
                  id='form-add-product'
                  placeholderText='Tanggal/Bulan/Tahun'
                  customInput={<CustomInput />}
                  onChange={val => handleChange({ target: { name: 'crby', value: val } }, index)}
                  maxDate={date}
                  dateFormat={'dd/MM/yyyy'}
                  required
                  disabled={isDisableField}
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Kategori Produk</InputLabel>
                <Select
                  label='Category'
                  name='catcd'
                  value={product.catcd}
                  onChange={e => handleChange(e, index)}
                  required
                  disabled={isDisableField}
                >
                  {listCatnm.map(item => (
                    <MenuItem value={item.catcd} key={item.catcd}>
                      {item.catnm}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {productList?.length > 1 && !isDisableField && (
            <Grid container padding={3}>
              <DeleteButton size='small' type='button' onClick={() => handleDeleteProduct(index)}>
                <TrashCanOutline />
              </DeleteButton>
            </Grid>
          )}
          <Divider sx={{ marginTop: 3 }} />
        </CardContent>
      ))}
      {PRCD == '-' && (
        <CardActions
          sx={{
            marginTop: 5,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            size='medium'
            type='button'
            sx={{ borderRadius: 2 }}
            variant='outlined'
            color='inherit'
            onClick={handleAddProduct}
          >
            <Plus />
          </Button>
        </CardActions>
      )}
      <Divider sx={{ margin: 0 }} />
      <CardActions>
        {!isDisableField && (
          <LoadingButton variant='contained' sx={{ marginRight: 3.5 }} type='submit' loading={productStore.is_Loading}>
            Submit
          </LoadingButton>
        )}
        <Link href={'/product/'}>
          <Button type='button' size='large' color='secondary' variant='outlined'>
            {isDisableField ? 'Kembali' : 'Cancel'}
          </Button>
        </Link>
      </CardActions>
    </form>
  )
}

export default AddEditProduct
