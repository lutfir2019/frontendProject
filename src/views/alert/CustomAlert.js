import { Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import useAlert from '@/stores/alert'

const Container = styled('div')(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  padding: 2,
  top: 90,
  right: 20
}))

const CustomAlert = () => {
  const alertStore = useAlert()

  useEffect(() => {
    const timer = setTimeout(() => {
      alertStore.setAlert({ type: '', variant: 'standard', message: '', is_Active: false })
    }, 5000) // 5 detik
    return () => clearTimeout(timer)
  }, [alertStore])

  return (
    <div>
      {alertStore.is_Active && (
        <Container>
          <Alert variant={alertStore.variant} severity={alertStore.severity}>
            {alertStore.message}
          </Alert>
        </Container>
      )}
    </div>
  )
}

export default CustomAlert
