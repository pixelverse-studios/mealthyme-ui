import { differenceInDays } from 'date-fns'

import { ProfileProps } from '@/utils/types/user'
import { getLocalStorageItem } from '@/utils/localStorage'
import { USER_TOKEN } from '@/utils/constants'

export const getValidatedUser = (
  email: string
): { profile: ProfileProps | null; expired: boolean } => {
  const storedUser = getLocalStorageItem(USER_TOKEN)
  const emailsMatch = storedUser?.email === email
  if (storedUser == null || !emailsMatch)
    return { profile: null, expired: false }

  const isExpired = differenceInDays(storedUser.expires, new Date()) >= 0
  const profile = { ...storedUser }
  delete profile.expires
  if (isExpired) return { profile, expired: true }

  return { profile, expired: false }
}
