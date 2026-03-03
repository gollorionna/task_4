import { redirect, createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import { queryClient } from '../utils/queryClient'

const ProductCardList = lazy(() =>
  import('../pages/ProductCardList').then(m => ({
    default: m.ProductCardList,
  }))
)

export const Route = createFileRoute('/products')({
  beforeLoad: async () => {
    const token = await queryClient.ensureQueryData({
      queryKey: ['auth-token'],
    })

    if (!token) {
      throw redirect({ to: '/auth' })
    }
  },
  component: ProductCardList,
})