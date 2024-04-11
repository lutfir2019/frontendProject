import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

// ** Create Context
export const AuthContext = createContext({
  saveAuth: () => null,
  initialAuth: null
})

export const AuthProvider = ({ children }) => {
  // ** State
  const [auth, setAuth] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('__sid')
    console.log(router.asPath)
    if (!token) {
      router.push('/pages/login/')
    } else {
      setAuth({ token })
    }
  }, [router])

  return <AuthContext.Provider >{children}</AuthContext.Provider>
}