'use client'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../../lib/store'
import { Button } from '@mantine/core'

import { useAuth } from '../../hooks'

const LogoutButton = () => {
  const router = useRouter()
  const { handleGoogleLogOut } = useAuth(router)
  const { loading } = useUserStore()

  const onLogout = async () => handleGoogleLogOut()

  return (
    <Button
      loading={loading}
      variant="contained"
      color="secondary"
      onClick={onLogout}>
      LOGOUT
    </Button>
  )
}

export default LogoutButton
