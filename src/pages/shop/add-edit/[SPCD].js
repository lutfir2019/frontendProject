'use client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useAuth from '@/stores/auth'
import useShop from '@/stores/shop/shop'
import AddEditShop from 'src/views/shop/AddEditShop'
import useAlert from '@/stores/alert'

const { Card, CardHeader, Divider } = require('@mui/material')

const Shop = () => {
  const shopStore = useShop()
  const router = useRouter()
  const { SPCD } = router.query
  const authStore = useAuth()
  const alertStore = useAlert()

  useEffect(async () => {
    alertStore.setLoading({ is_Loading: true })
    try {
      if (authStore.data[0]?.rlcd != 'ROLE-1') router.replace('/')
      if (SPCD == '-') return
      await shopStore.getDetails({ spcd: SPCD })
    } finally {
      alertStore.setLoading({ is_Loading: false })
    }
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
