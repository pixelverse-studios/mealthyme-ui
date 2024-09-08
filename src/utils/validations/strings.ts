const isString = (val: string) => typeof val === 'string' && val != ''
const isEmpty = (str: string) => str == null || str.length === 0
const isMatching = (value: string, comparing: string) =>
  value.toString().toLowerCase() === comparing.toString().toLowerCase()
const capitalizeFirstLetters = (value: string) =>
  value
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ')

const isValid = (val: string | undefined) =>
  isString(val ?? '') && !isEmpty(val ?? '')
const StringUtils = {
  capitalizeFirstLetters,
  isEmpty,
  isMatching,
  isString,
  isValid
}
export default StringUtils
