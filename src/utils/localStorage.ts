import { addDays } from 'date-fns'

export const setLocalStorageItem = (key: string, data: any) => {
  const expires = addDays(new Date(), 7)
  typeof window !== 'undefined'
    ? window.localStorage.setItem(key, JSON.stringify({ ...data, expires }))
    : {}
}

export const getLocalStorageItem = (key: string) => {
  const stored =
    typeof window !== 'undefined' ? window.localStorage.getItem(key) : undefined
  if (stored) {
    return JSON.parse(stored)
  }

  return null
}

export const clearLocalStorageItem = (key: string) =>
  typeof window !== 'undefined' ? window.localStorage.removeItem(key) : null
