'use client'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../../lib/store'
import { Button } from '@mantine/core'

import { useAuth } from '../../hooks'

const LoginButton = () => {
  const router = useRouter()
  const { handleGoogleSignIn } = useAuth(router as any)
  const { loading } = useUserStore()

  const onLogin = async () => handleGoogleSignIn()

  return (
    <Button
      loading={loading}
      variant="contained"
      color="success"
      onClick={onLogin}>
      LOGIN
    </Button>
  )
}

export default LoginButton
