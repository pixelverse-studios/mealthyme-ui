'use client'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../../lib/store'
import LoadingButton from '@mui/lab/LoadingButton'

import { useAuth } from '../../hooks'

const LoginButton = () => {
  const router = useRouter()
  const { handleGoogleSignIn } = useAuth(router as any)
  const { loading } = useUserStore()

  const onLogin = async () => handleGoogleSignIn()

  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      color="success"
      onClick={onLogin}>
      LOGIN
    </LoadingButton>
  )
}

export default LoginButton
