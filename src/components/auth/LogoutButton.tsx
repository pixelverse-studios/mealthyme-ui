'use client'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import LoadingButton from '@mui/lab/LoadingButton'

import hooks from '@/hooks'

const LogoutButton = () => {
  const router = useRouter()
  const { handleGoogleLogOut } = hooks.useAuth(router)
  const { loading } = useSelector((state: any) => state.user)
  const onLogout = async () => handleGoogleLogOut()

  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      color="secondary"
      onClick={onLogout}>
      LOGOUT
    </LoadingButton>
  )
}

export default LogoutButton
