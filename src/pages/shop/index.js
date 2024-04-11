// ** MUI Imports
import { Grid } from '@mui/material'
import { useEffect } from 'react'
import PaginationOutlined from 'src/views/pagination/paginationOutlined'
import TableShop from 'src/views/shop/TableShop'
import { useRouter } from 'next/router'
import useAuth from 'src/@core/hooks/stores/auth'
import useShop from 'src/@core/hooks/stores/shop/shop'
import useAlert from 'src/@core/hooks/stores/alert'

const User = () => {
  const authStore = useAuth()
  const router = useRouter()
  const shopStore = useShop()
  const alertStore = useAlert()

  useEffect(async () => {
    alertStore.setLoading({ is_Loading: true })
    if (authStore.data[0]?.rlcd != 'ROLE-1') router.replace('/')
    try {
      await shopStore.getData({ spnm: router.query?.s, page: 1, page_size: 10 })
    } catch (error) {
    } finally {
      alertStore.setLoading({ is_Loading: false })
    }
  }, [router.query])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableShop />
        <PaginationOutlined
          count={shopStore.total_page}
          page={shopStore.page}
          onChange={e => shopStore.getData({ page: e })}
        />
      </Grid>
    </Grid>
  )
}

export default User
