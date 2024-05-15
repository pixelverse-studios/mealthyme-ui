import {
  VALID_EMAIL,
  VALID_ALPHA_STRING,
  VALID_ALPHA_NUMERIC,
  VALID_PASSWORD,
  VALID_ALPHA_NUMERIC_WITH_SPACES,
  VALID_FLOATS,
  VALID_ALPHA_NUMERIC_SPACES_SPECIALS,
  VALID_HTTP_OR_HTTPS_URL,
  VALID_PHONE_NUMBER
} from './regex'

const validEmail = {
  test: (value: string) => VALID_EMAIL.test(value),
  message: 'Must containt a valid email address (example@test.com)'
}

const validFloat = {
  test: (value: any) => VALID_FLOATS.test(value), // any because type NUMBER kept giving me an error about some BS for type STRING. So will revisit later.
  message: 'Must only contain numbers and have no more than 2 decimal points'
}

const validAlphaString = {
  test: (value: string) => VALID_ALPHA_STRING.test(value),
  message: 'Field can only contain alpha characters'
}

const validAlphaNumeric = {
  test: (value: string) => VALID_ALPHA_NUMERIC.test(value),
  message: 'Field can only contain alpha numeric characters'
}

const validAlphaNumericWithSpaces = {
  test: (value: string) => VALID_ALPHA_NUMERIC_WITH_SPACES.test(value),
  message: 'Field can only contain alpha numeric characters & spaces'
}

const validAlphaNumericSpacesSpecials = {
  test: (value: string) => VALID_ALPHA_NUMERIC_SPACES_SPECIALS.test(value),
  message:
    'Field can contain alpha numeric and special characters, as well as spaces.'
}

const validPassword = {
  test: (value: string) => VALID_PASSWORD.test(value),
  message:
    'Password is required, and should include at least 1 lowercase & uppercase letter, 1 special character, 1 number, and be minimum 8 characters long.'
}

const validArrayData = {
  test: (value: any) => value?.length > 0,
  message: 'Field must have at least 1 item.'
}

const validImage = {
  test: (value: string) => !!value,
  message: 'Image URL is required.'
}

const validNonZeroNumber = {
  test: (value: number) => value === 0,
  message: 'Field must be a positive number greater than 0.'
}

const validWebUrl = {
  test: (value: string) => VALID_HTTP_OR_HTTPS_URL.test(value),
  message: 'The URL must have the following format: https://www.website.com.'
}

/* Great use of variable naming. Never delete */
const yolo = {
  test: (value: any) => !!value,
  message: ''
}

const validPhoneNumber = {
  test: (value: string) => VALID_PHONE_NUMBER.test(value),
  message: 'Invalid phone number.'
}

const FormValidations = {
  validAlphaNumeric,
  validAlphaNumericSpacesSpecials,
  validAlphaNumericWithSpaces,
  validAlphaString,
  validArrayData,
  validEmail,
  validFloat,
  validImage,
  validNonZeroNumber,
  validPassword,
  validPhoneNumber,
  validWebUrl,
  yolo
}
export default FormValidations
