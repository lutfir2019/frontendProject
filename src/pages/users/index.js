// ** MUI Imports
import { Grid } from '@mui/material'
import { useEffect } from 'react'
import PaginationOutlined from 'src/views/pagination/paginationOutlined'
import TableUser from 'src/views/user/TableUser'
import checkUserRole from 'src/@core/utils/roleChecker'
import useUser from '@/stores/user/user'
import useAuth from '@/stores/auth'
import useShop from '@/stores/shop/shop'
import useAlert from '@/stores/alert'
import { useRouter } from 'next/router'

const User = () => {
  const userStore = useUser()
  const authStore = useAuth()
  const shopStore = useShop()
  const router = useRouter()
  const alertStore = useAlert()

  checkUserRole(authStore.data[0]?.rlcd)

  useEffect(async () => {
    await shopStore.getData({ page: 1, page_size: 999 })
  }, [])

  useEffect(async () => {
    alertStore.setLoading({ is_Loading: true })
    try {
      await userStore.getData({
        nam: router.query?.s,
        spcd: router.query?.spcd != '-' ? router.query?.spcd : '',
        page: 1
      })
    } catch (error) {
    } finally {
      alertStore.setLoading({ is_Loading: false })
    }
  }, [router.query])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableUser />
        <PaginationOutlined
          count={userStore?.total_page ?? 1}
          page={userStore?.page ?? 1}
          onChange={e => userStore.getData({ page: e })}
        />
      </Grid>
    </Grid>
  )
}

export default User
