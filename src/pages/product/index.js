// ** MUI Imports
import { Grid } from '@mui/material'
import PaginationOutlined from 'src/views/pagination/paginationOutlined'
import { useEffect } from 'react'
import TableProduct from 'src/views/product/TableProduct'
import useProduct from '@/stores/product/product'
import useAlert from '@/stores/alert'
import { useRouter } from 'next/router'
import useShop from '@/stores/shop/shop'
import useAuth from '@/stores/auth'

const Product = () => {
  const productStore = useProduct()
  const router = useRouter()
  const alertStore = useAlert()
  const shopStore = useShop()
  const authStore = useAuth()

  useEffect(async () => {
    await shopStore.getData({ page: 1, page_size: 999 })
    router.push({ pathname: router.pathname, query: { ...router.query, spcd: authStore.data[0]?.spcd } })
  }, [])
  
  useEffect(async () => {
    alertStore.setLoading({ is_Loading: true })
    try {
      await productStore.getData({
        pnm: router.query?.s,
        catcd: router.query?.catcd != '-' ? router.query?.catcd : '',
        spcd: router.query?.spcd != '-' ? router.query?.spcd : '',
        page: 1
      })
      // await productStore.getData(router.query)
    } catch (error) {
    } finally {
      alertStore.setLoading({ is_Loading: false })
    }
  }, [router.query])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableProduct />
        <PaginationOutlined
          count={productStore?.total_page}
          page={productStore?.page}
          onChange={e => productStore.getData({ page: e })}
        />
      </Grid>
    </Grid>
  )
}

export default Product
