import { createFileRoute, redirect } from '@tanstack/react-router'
import { lazy } from 'react'
import { queryClient } from '../utils/queryClient'
import { getAuthToken } from '@/utils/authQuery'

const Chat = lazy(() => import('../pages/Chat'))

export const Route = createFileRoute('/chat')({
  beforeLoad: async () => {
    const token = await queryClient.ensureQueryData({
      queryKey: ['auth-token'],
      queryFn: getAuthToken
    })

    if (!token) {
      throw redirect({ to: '/auth' })
    }
  },
  component: Chat,
})