'use client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useAuth from '@/stores/auth'
import useShop from '@/stores/shop/shop'
import AddEditShop from 'src/views/shop/AddEditShop'

const { Card, CardHeader, Divider } = require('@mui/material')

const Shop = () => {
  const shopStore = useShop()
  const router = useRouter()
  const { SPCD } = router.query
  const authStore = useAuth()

  useEffect(() => {
    if (authStore.data[0]?.rlcd != 'ROLE-1') router.replace('/')
    if (SPCD == '-') return
    shopStore.getDetails({ spcd: SPCD })
  }, [])

  return (
    <Card>
      <CardHeader title='Detail Toko' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <AddEditShop />
    </Card>
  )
}

export default Shop
