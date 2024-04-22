'use client'
// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useAuth from '@/stores/auth'
import useCart from '@/stores/cart/useCart'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle

  return VerticalNavLink
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props
  const authStore = useAuth()
  const router = useRouter()
  const cartStore = useCart()

  useEffect(() => {
    cartStore.getData()
  }, [router])

  const RenderMenuItems = verticalNavItems?.map((item, index) => {
    if (item.acces?.includes(authStore.data[0]?.rlcd)) {
      const TagName = resolveNavItemComponent(item)

      return <TagName {...props} key={index} item={item} />
    }
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
