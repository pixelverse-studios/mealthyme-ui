'use client'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import LoadingButton from '@mui/lab/LoadingButton'

import { useAuth } from '../../hooks'

const LoginButton = () => {
  const router = useRouter()
  const { handleGoogleSignIn } = useAuth(router as any)
  const { loading } = useSelector((state: any) => state.user)
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
