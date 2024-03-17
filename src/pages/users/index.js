// ** MUI Imports
import { Grid } from '@mui/material'
import { useEffect } from 'react'
import PaginationOutlined from 'src/views/pagination/paginationOutlined'
import TableUser from 'src/views/user/TableUser'
import checkUserRole from 'src/@core/utils/roleChecker'
import useUser from 'src/@core/hooks/stores/user/user'
import useAuth from 'src/@core/hooks/stores/auth'
import useShop from 'src/@core/hooks/stores/shop/shop'
import useAlert from 'src/@core/hooks/stores/alert'

const User = () => {
  const userStore = useUser()
  const authStore = useAuth()
  const shopStore = useShop()
  const alertStore = useAlert()

  checkUserRole(authStore.data[0]?.rlcd)
  useEffect(async () => {
    alertStore.setLoading({is_Loading: true})
    try {
      await userStore.getData()
      await shopStore.getData({ page: 1, page_size: 999 })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      alertStore.setLoading({ is_Loading: false })
    }
  }, [])

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
