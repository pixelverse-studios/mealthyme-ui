export const isMatchingString = (
  value: string,
  comparing: string | undefined
) => {
  if (comparing === undefined) return false
  return value.toString().toLowerCase() === comparing.toString().toLowerCase()
}

export const capitalizeFirstLetters = (value: string) =>
  value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ')
