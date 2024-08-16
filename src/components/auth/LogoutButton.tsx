'use client'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../../lib/store'
import LoadingButton from '@mui/lab/LoadingButton'

import { useAuth } from '../../hooks'

const LogoutButton = () => {
  const router = useRouter()
  const { handleGoogleLogOut } = useAuth(router)
  const { loading } = useUserStore()

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
