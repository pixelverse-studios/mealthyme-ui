import { differenceInDays } from 'date-fns'

import { ProfileProps } from '@/utils/types/user'
import { getLocalStorageItem } from '@/utils/localStorage'
import { USER_TOKEN } from '@/utils/constants'

export const getValidatedUser = (): {
  profile: ProfileProps | null
  expired: boolean
} => {
  const storedUser = getLocalStorageItem(USER_TOKEN)
  if (storedUser == null) return { profile: null, expired: false }

  const diff = differenceInDays(new Date(storedUser.expires), new Date())
  const isExpired = diff <= 0

  const profile = { ...storedUser }
  delete profile.expires
  if (isExpired) return { profile, expired: true }

  return { profile, expired: false }
}
