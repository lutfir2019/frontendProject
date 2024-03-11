'use client'
// ** Custom Menu Components
import useAuth from 'src/stores/auth'
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useCart from 'src/stores/cart/useCart'

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
    authStore.getData()
  }, [])

  useEffect(() => {
    cartStore.getData()
  }, [router])

  const RenderMenuItems = verticalNavItems?.map((item, index) => {
    if (!authStore.data) router.push('/pages/login')
    if (item.acces?.includes(authStore.data[0]?.rlcd)) {
      const TagName = resolveNavItemComponent(item)

      return <TagName {...props} key={index} item={item} />
    }
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
