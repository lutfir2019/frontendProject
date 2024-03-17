import { useRouter } from 'next/router'
import { useEffect } from 'react'

const checkUserRole = expectedRole => {
  const router = useRouter()

  useEffect(() => {
    // Jika peran pengguna tidak sesuai, arahkan ke halaman lain
    if (!['ROLE-1', 'ROLE-2']?.includes(expectedRole)) {
      router.push('/')
    }
  }, [])
}

export default checkUserRole
