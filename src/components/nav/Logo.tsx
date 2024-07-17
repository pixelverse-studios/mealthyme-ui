import { useRouter } from 'next/navigation'

import { RECIPE_ROUTES } from './utils'
import MtLogo from '../../assets/logo.png'
import styles from './Nav.module.scss'

const Logo = ({ loggedIn }: { loggedIn: boolean }) => {
  const router = useRouter()

  return (
    <div
      className={styles.logoBlock}
      onClick={() =>
        router.push(loggedIn ? RECIPE_ROUTES.mine : RECIPE_ROUTES.all)
      }>
      <img src={MtLogo.src} alt="mealthyme_logo" />
    </div>
  )
}

export default Logo
