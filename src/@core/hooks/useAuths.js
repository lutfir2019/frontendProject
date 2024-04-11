import { useContext } from 'react'
import { AuthContext } from 'src/@core/context/authContext'

export const useAuths = () => useContext(AuthContext)
