'use client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useAuth from 'src/@core/hooks/stores/auth'
import useShop from 'src/@core/hooks/stores/shop/shop'
import AddEditShop from 'src/views/shop/AddEditShop'

const { Card, CardHeader, Divider } = require('@mui/material')

const Shop = () => {
  const shopStore = useShop()
  const router = useRouter()
  const { TKCD } = router.query
  const authStore = useAuth()

  useEffect(() => {
    if(authStore.data[0]?.rlcd != 'ROLE-1') router.replace('/')
    shopStore.getData({ tkcd: TKCD })
  }, [])

  return (
    <Card>
      <CardHeader title='Multi Column with Form Separator' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <AddEditShop />
    </Card>
  )
}

export default Shop
