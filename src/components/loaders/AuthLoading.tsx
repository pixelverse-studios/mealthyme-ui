import { ClockLoader } from 'react-spinners'
// TODO: Bring in a nice custom loader for our pal, the pantry
const AuthLoading = ({ loading }: { loading: boolean }) => {
  return <ClockLoader loading={loading} />
}

export default AuthLoading
