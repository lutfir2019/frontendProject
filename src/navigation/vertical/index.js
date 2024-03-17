'use client'

// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import StoreCog from 'mdi-material-ui/StoreCog'
import ShoppingOutline from 'mdi-material-ui/ShoppingOutline'
import { useRouter } from 'next/router'

const navigation = () => {
  const router = useRouter()
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/',
      acces: 'ROLE-1 ROLE-2 ROLE-3'
    },
    {
      title: 'Produk',
      icon: ShoppingOutline,
      // path: `/product${router.query?.PRCD ? `/add-edit/${router.query?.PRCD}` : ''}`,
      path: '/product',
      acces: 'ROLE-1 ROLE-2 ROLE-3'
    },
    {
      sectionTitle: 'Admin',
      acces: 'ROLE-1 ROLE-2'
    },
    {
      title: 'Akun',
      icon: AccountCogOutline,
      // path: `/users${router.query?.UID ? `/add-edit/${router.query?.UID}` : ''}`,
      path: '/users',
      acces: 'ROLE-1 ROLE-2'
    },
    {
      sectionTitle: 'Super Admin',
      acces: 'ROLE-1'
    },
    {
      title: 'Toko',
      icon: StoreCog,
      // path: `/shop${router.query?.TKCD ? `/add-edit/${router.query?.TKCD}` : ''}`,
      path: '/shop',
      acces: 'ROLE-1'
    },
  ]
}

export default navigation
