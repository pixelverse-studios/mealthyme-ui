export const setLocalStorageItem = (key: string, data: any) =>
  localStorage.setItem(key, JSON.stringify(data))

export const getLocalStorageItem = (key: string) => {
  const stored = localStorage.getItem(key)
  if (stored) {
    return JSON.parse(stored)
  }

  return null
}

export const clearLocalStorageItem = (key: string) =>
  localStorage.removeItem(key)
