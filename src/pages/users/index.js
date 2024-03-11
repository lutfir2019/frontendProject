// ** MUI Imports
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import PaginationOutlined from 'src/views/pagination/paginationOutlined'
import TableUser from 'src/views/user/TableUser'
import checkUserRole from 'src/@core/utils/roleChecker'
import useUser from 'src/@core/hooks/stores/user/user'
import useAuth from 'src/@core/hooks/stores/auth'

const User = () => {
  const [count, setCount] = useState(1)
  const userStore = useUser()
  const authStore = useAuth()

  checkUserRole(authStore.data[0]?.rlcd)
  useEffect(() => {
    userStore.getData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableUser />
        <PaginationOutlined count={10} page={count} onChange={e => setCount(e)} />
      </Grid>
    </Grid>
  )
}

export default User
