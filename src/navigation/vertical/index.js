'use client'

// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
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
      path: `/product${router.query?.PRCD ? `/add-edit/${router.query?.PRCD}` : ''}`,
      acces: 'ROLE-1 ROLE-2 ROLE-3'
    },
    {
      sectionTitle: 'Admin',
      acces: 'ROLE-1 ROLE-2'
    },
    {
      title: 'Akun',
      icon: AccountCogOutline,
      path: `/users${router.query?.UID ? `/add-edit/${router.query?.UID}` : ''}`,
      acces: 'ROLE-1 ROLE-2'
    },
    {
      sectionTitle: 'Super Admin',
      acces: 'ROLE-1'
    },
    {
      title: 'Toko',
      icon: StoreCog,
      path: `/shop${router.query?.TKCD ? `/add-edit/${router.query?.TKCD}` : ''}`,
      acces: 'ROLE-1'
    },
  ]
}

export default navigation
