import { enqueueSnackbar } from 'notistack'

const SUCCESS = 'success' as const
const ERROR = 'error' as const
// const INFO = 'info' as 'info'
const WARNING = 'warning' as const

const REACH_OUT_FOR_HELP =
  'Please try again or reach out to info@pixelversestudios.io'
const LOG_IN_ERROR = `There was an unexpected issue logging you in. ${REACH_OUT_FOR_HELP}`
const LOG_OUT_ERROR = `There was an unexpected issue logging you out. ${REACH_OUT_FOR_HELP}`
const TECHNICAL_DIFFICULTIES = `We are experiencing technical difficulties. ${REACH_OUT_FOR_HELP}`

const Success = (msg: string) =>
  enqueueSnackbar(msg, {
    variant: SUCCESS
  })

const LoggedIn = () =>
  enqueueSnackbar('Logged in successfully', {
    variant: SUCCESS
  })
const LoggedOut = () =>
  enqueueSnackbar('Logged out successfully', {
    variant: SUCCESS
  })

const Error = (msg: string) =>
  enqueueSnackbar(msg, {
    variant: ERROR
  })
const LoggingInError = () =>
  enqueueSnackbar(LOG_IN_ERROR, {
    variant: ERROR
  })
const LoggedOutError = () =>
  enqueueSnackbar(LOG_OUT_ERROR, {
    variant: ERROR
  })
const TechDiff = () =>
  enqueueSnackbar(TECHNICAL_DIFFICULTIES, {
    variant: ERROR
  })

const Warning = (msg: string) =>
  enqueueSnackbar(msg, {
    variant: WARNING
  })

const Banner = {
  Error,
  LoggedIn,
  LoggedOut,
  LoggingInError,
  LoggedOutError,
  Success,
  TechDiff,
  Warning
}
export default Banner
