import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import useAuth from '../hooks/stores/auth'

const Auth = ({ children }) => {
  const router = useRouter()
  const authStore = useAuth()
  const token = Cookies.get('__sid') || authStore.token
  const isTrue = router.pathname != '/pages/login' && !token

  useEffect(() => {
    authStore.getData()
    // Check if the user is not logged in, redirect to login page
    if (router.pathname != '/pages/login' && !token) router.replace('/pages/login')
    if (router.pathname == '/pages/login' && token) router.replace('/')
  }, [token, router])

  return <>{isTrue ? <></> : children}</>
}

export default Auth
