'use client'
// ** MUI Imports
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import PaginationOutlined from 'src/views/pagination/paginationOutlined'
import useUser from 'src/stores/user/user'
import TableShop from 'src/views/shop/TableShop'
import useAuth from 'src/stores/auth'
import { useRouter } from 'next/router'

const User = () => {
  const [count, setCount] = useState(1)
  const userStore = useUser()
  const authStore = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(authStore.data[0]?.rlcd != 'ROLE-1') router.replace('/')
    userStore.getData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableShop />
        <PaginationOutlined count={10} page={count} onChange={e => setCount(e)} />
      </Grid>
    </Grid>
  )
}

export default User
