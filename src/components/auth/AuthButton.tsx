import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

const AuthButton = ({ loggedIn }: { loggedIn: boolean }) =>
  loggedIn ? <LogoutButton /> : <LoginButton />

export default AuthButton
