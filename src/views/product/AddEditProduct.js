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
import { LoadingButton } from '@mui/lab'
import useProduct from '@/stores/product/product'
import useAuth from '@/stores/auth'
import useAlert from '@/stores/alert'
import useShop from '@/stores/shop/shop'
import ConfirmDeleteTrash from '../dialogs/ConfirmDeleteTrash'
import { deleteSpace } from 'src/@core/utils/globalFunction'

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
  const { PCD } = router.query

  const productStore = useProduct()
  const authStore = useAuth()
  const alertStore = useAlert()
  const shopStore = useShop()

  const [isDisableField, setIsDisableField] = useState(true)
  const [productList, setProductList] = useState([
    {
      catcd: 'pkn',
      catnm: 'Pakaian',
      pnm: '',
      pcd: '',
      price: 0,
      crby: date,
      qty: 1,
      spcd: authStore?.data[0]?.spcd,
      spnm: authStore?.data[0]?.spnm
    }
  ])
  const [shop_list, setShop_list] = useState([
    {
      spcd: '',
      spnm: ''
    }
  ])

  useEffect(() => {
    if (!['ROLE-1', 'ROLE-2']?.includes(authStore.data[0]?.rlcd)) {
      setIsDisableField(true)
    } else {
      setIsDisableField(false)
    }
  }, [authStore.data[0]?.rlcd])

  useEffect(() => {
    setShop_list(shopStore?.data)
    if (PCD == '-') return
    setProductList([{ ...productStore?.data, crby: Date.parse(productStore?.data?.crby) }])
  }, [productStore?.data, shopStore?.data])

  const handleChange = (event, index) => {
    const { name, value } = event.target
    const updatedProductList = [...productList]
    const selectedCatnm = listCatnm?.find(({ catcd }) => catcd == value)
    const selectedShop = shop_list?.find(({ spcd }) => spcd == value)

    if (updatedProductList[index][name] == updatedProductList[index]['pcd']) {
      updatedProductList[index]['pcd'] = deleteSpace(value?.toUpperCase())
    } else {
      updatedProductList[index][name] = value
    }

    if (selectedCatnm) {
      const { catnm } = selectedCatnm
      updatedProductList[index] = {
        ...updatedProductList[index],
        catnm: catnm
      }
    } else if (selectedShop) {
      const { spnm } = selectedShop
      updatedProductList[index] = {
        ...updatedProductList[index],
        spnm: spnm
      }
    }
    setProductList(updatedProductList)
  }

  const handleNumber = (event, index) => {
    const { name, value } = event.target
    const updatedProductList = [...productList]
    updatedProductList[index][name] = parseInt(value)
    setProductList(updatedProductList)
  }

  const handleAddProduct = () => {
    setProductList([
      ...productList,
      {
        catcd: 'pkn',
        catnm: 'Pakaian',
        pnm: '',
        pcd: '',
        price: 0,
        crby: date,
        qty: 1,
        spcd: authStore?.data[0]?.spcd,
        spnm: authStore?.data[0]?.spnm
      }
    ])
  }

  const handleDeleteProduct = async index => {
    const updatedProductList = [...productList]
    updatedProductList.splice(index, 1)
    setProductList(updatedProductList)
  }

  const handleDeleteDataProduct = index => async consfirm => {
    const deleteProduct = productList[index]
    if (!consfirm) return

    const ress = await productStore.deleteData({ ...deleteProduct, crby: '' })
    if (ress.status == 200) {
      alertStore.setAlert({
        type: 'success',
        message: ress.data?.message,
        is_Active: true
      })
      router.push('/product')
    } else {
      alertStore.setAlert({
        type: 'error',
        message: ress?.response?.data?.message,
        is_Active: true
      })
    }
  }

  const onSubmit = async event => {
    event.preventDefault()
    let ress
    if (PCD == '-') {
      ress = await productStore.addData({ data: [...productList] })
    } else {
      ress = await productStore.updateData({ ...productList[0], crby: new Date(productList[0]?.crby) })
    }

    if (ress.status == 200) {
      alertStore.setAlert({
        type: 'success',
        message: ress.data?.message,
        is_Active: true
      })
      router.push('/product')
    } else {
      alertStore.setAlert({
        type: 'error',
        message: ress.response?.data?.message,
        is_Active: true
      })
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {productList?.map((product, index) => (
        <CardContent key={product?.pcd}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} display={'flex'} gap={5}>
              <TextField
                fullWidth
                name='pcd'
                label='Kode Produk'
                placeholder='contoh: CODE01'
                value={product?.pcd?.toUpperCase()}
                onChange={e => handleChange(e, index)}
                required
                disabled={isDisableField || PCD != '-'}
              />
              <TextField
                fullWidth
                name='qty'
                type='number'
                label='Jumlah Produk'
                placeholder='contoh: 2'
                value={product?.qty}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={e => handleNumber(e, index)}
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
                  value={product?.price}
                  onChange={e => handleNumber(e, index)}
                  required
                  disabled={isDisableField}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Nama Produk'
                name='pnm'
                placeholder='contoh: Kaos Kerah'
                value={product?.pnm}
                onChange={e => handleChange(e, index)}
                required
                disabled={isDisableField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerWrapper>
                <DatePicker
                  selected={product?.crby}
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
                  value={product?.catcd}
                  onChange={e => handleChange(e, index)}
                  required
                  disabled={isDisableField}
                >
                  {listCatnm.map(item => (
                    <MenuItem value={item?.catcd} key={item?.catcd}>
                      {item?.catnm}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Nama Toko</InputLabel>
                <Select
                  label='Toko'
                  name='spcd'
                  value={product?.spcd}
                  onChange={e => handleChange(e, index)}
                  required
                  disabled={authStore.data[0]?.rlcd != 'ROLE-1'}
                >
                  {shop_list?.map(item => (
                    <MenuItem value={item?.spcd} key={item?.spcd}>
                      {item?.spnm}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {!isDisableField && (
            <Grid container padding={3}>
              {PCD == '-' ? (
                <DeleteButton size='small' type='button' onClick={() => handleDeleteProduct(index)}>
                  <TrashCanOutline />
                </DeleteButton>
              ) : (
                <ConfirmDeleteTrash handleValue={handleDeleteDataProduct(index)} />
              )}
            </Grid>
          )}
          <Divider sx={{ marginTop: 3 }} />
        </CardContent>
      ))}
      {PCD == '-' && (
        <CardActions
          sx={{
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
        <Link href={'/product/'} passHref>
          <Button type='button' size='large' color='secondary' variant='outlined'>
            {isDisableField ? 'Kembali' : 'Cancel'}
          </Button>
        </Link>
      </CardActions>
    </form>
  )
}

export default AddEditProduct
