import { addDays } from 'date-fns'

export const setLocalStorageItem = (key: string, data: any) => {
  const expires = addDays(new Date(), 7)
  localStorage.setItem(key, JSON.stringify({ ...data, expires }))
}

export const getLocalStorageItem = (key: string) => {
  const stored = localStorage.getItem(key)
  if (stored) {
    return JSON.parse(stored)
  }

  return null
}

export const clearLocalStorageItem = (key: string) =>
  localStorage.removeItem(key)
