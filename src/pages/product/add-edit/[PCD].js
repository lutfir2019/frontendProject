'use client'
import { useEffect } from 'react'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import { useRouter } from 'next/router'
import AddEditProduct from 'src/views/product/AddEditProduct'
import useProduct from '@/stores/product/product'
import useShop from '@/stores/shop/shop'
import useAlert from '@/stores/alert'

const ProductDetails = () => {
  const router = useRouter()
  const { PCD } = router.query
  const productStore = useProduct()
  const shopStore = useShop()
  const alertStore = useAlert()

  useEffect(async () => {
    await shopStore.getData({ page: 1, page_size: 999 })
    if (PCD == '-') return
    console.log(router.query?.spcd)
    const ress = await productStore.getDetails({ pcd: PCD, spcd: router.query?.spcd })
    if (ress.status != 200) {
      alertStore.setAlert({
        type: 'error',
        message: ress.response?.data?.message,
        is_Active: true
      })
    }
  }, [])

  return (
    <Card>
      <CardHeader title='Tambah Produk' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <AddEditProduct />
    </Card>
  )
}

export default ProductDetails
