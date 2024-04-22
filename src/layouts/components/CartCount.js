import React, { useEffect, useState } from 'react'
import { CartOutline } from 'mdi-material-ui'
import { ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import useCart from '@/stores/cart/useCart'

const CartButton = styled(ButtonBase)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  position: 'relative',
  margin: '0px 13px',
  transition: 'ease-in-out 0.2s',
  ':hover': {
    backgroundColor: theme.palette.action.hover
  }
}))

const CountCart = styled('div')(({ theme }) => ({
  width: '19px',
  height: '19px',
  backgroundColor: 'tomato',
  borderRadius: '50%',
  color: theme.palette.common.white,
  position: 'absolute',
  top: '18px',
  left: '18px',
  paddingTop: '1px'
}))

const CartCount = () => {
  const { data } = useCart()
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(data?.length)
  }, [data])

  return (
    <Link href='/product/cart-list/' passHref>
      <CartButton>
        <CartOutline fontSize='medium' sx={{ position: 'absolute' }} />
        {count > 0 && (
          <CountCart>
            <span style={{ fontSize: '12px' }}>{count}</span>
          </CountCart>
        )}
      </CartButton>
    </Link>
  )
}

export default CartCount
