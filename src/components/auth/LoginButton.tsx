'use client'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import useAuth from '@/hooks/useAuth'
import AuthLoading from '../loaders/AuthLoading'

// TODO: Build out this button more, this is for testing purposes at this point
const LoginButton = () => {
  const { handleGoogleSignIn } = useAuth()
  const router = useRouter()
  const { loading } = useSelector((state: any) => state.user)

  const onLogin = async () => {
    await handleGoogleSignIn()
    router.push('/dashboard')
  }

  if (loading) {
    return <AuthLoading loading={loading} />
  }
  return <button onClick={onLogin}>LOGIN</button>
}

export default LoginButton
