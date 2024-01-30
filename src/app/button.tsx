'use client'
// import { authProvider } from '@/lib/auth'
// import { signInWithPopup, getAuth } from 'firebase/auth'
import useAuth from '@/hooks/useAuth'

const Button = () => {
  const { handleSignIn } = useAuth()
  const onLogin = () => handleSignIn()

  return <button onClick={onLogin}>LOGIN</button>
}

export default Button
