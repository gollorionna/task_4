import { redirect, createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import { queryClient } from '../utils/queryClient'
import { getAuthToken } from '@/utils/authQuery'

const ProductCardList = lazy(() =>
  import('../pages/ProductCardList').then(m => ({
    default: m.ProductCardList,
  }))
)

export const Route = createFileRoute('/products')({
  beforeLoad: async () => {
    const token = await queryClient.ensureQueryData({
      queryKey: ['auth-token'],
      queryFn: getAuthToken
    })

    if (!token) {
      throw redirect({ to: '/auth' })
    }
  },
  component: ProductCardList,
})