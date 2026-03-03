import { createFileRoute, redirect } from '@tanstack/react-router'
import { lazy } from 'react'
import { queryClient } from '../utils/queryClient'

const Chat = lazy(() => import('../pages/Chat'))

export const Route = createFileRoute('/chat')({
  beforeLoad: async () => {
    const token = await queryClient.ensureQueryData({
      queryKey: ['auth-token'],
    })

    if (!token) {
      throw redirect({ to: '/auth' })
    }
  },
  component: Chat,
})