'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import LoginButton from '../auth/LoginButton'
import { ProfileProps } from '../../utils/types/user'
import { useNavStore } from '../../lib/store'
import AuthButton from '../auth/AuthButton'
import { userLinks, NavItemType } from './utils'
import { useScreenSize } from '../../hooks'
import Logo from './Logo'
import styles from './Nav.module.scss'

const NavUserMenu = ({
  profile,
  loggedIn
}: {
  profile: ProfileProps
  loggedIn: boolean
}) => {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const onMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const renderAvatar = () => {
    if (!loggedIn) return <LoginButton />

    const { avatar, firstName, lastName } = profile

    if (avatar === '')
      return (
        <IconButton onClick={onMenuClick}>
          <Avatar>
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </Avatar>
        </IconButton>
      )

    return (
      <IconButton onClick={onMenuClick}>
        <Avatar alt={`${firstName}_profileAvatar`} src={avatar} />
      </IconButton>
    )
  }

  const onMenuItemClick = (item: string) => {
    if (item === 'Premium') {
      // TODO Premium should route to settings as well, and trigger some sort of focus on upgrading. Or route to settings/upgrade or something
    } else {
      return router.push(item)
    }
  }

  return (
    <div className={styles.userMenu}>
      {renderAvatar()}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}>
        <MenuItem>
          <AuthButton loggedIn={loggedIn} />
        </MenuItem>
        {userLinks(false).map(({ route, label }: NavItemType) => (
          <MenuItem key={label} onClick={() => onMenuItemClick(route)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

function Navbar() {
  // const dispatch = useDispatch()
  const { profile, loggedIn } = useSelector((state: any) => state.user)
  const {
    showMobile,
    isMobile,
    toggleMobile,
    setShowMobile,
    toggleDestroyNav
  } = useNavStore()

  const { isMobileWidth } = useScreenSize()

  useEffect(() => {
    if (isMobileWidth && !isMobile) {
      setShowMobile(true)
      toggleMobile(false)
      toggleDestroyNav()
    }

    if (!isMobileWidth && isMobile) {
      toggleMobile(false)
    }

    if (!isMobile && !isMobileWidth && !showMobile) {
      setShowMobile(true)
    }
  }, [
    isMobile,
    isMobileWidth,
    setShowMobile,
    showMobile,
    toggleDestroyNav,
    toggleMobile
  ])

  const onMenuClick = () => setShowMobile(!showMobile)

  return (
    <AppBar position="fixed" className={styles.Nav}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.navBody}>
          <Box
            className={styles.mobileNav}
            sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onMenuClick}
              color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
          <Logo loggedIn={loggedIn} />
          <NavUserMenu profile={profile} loggedIn={loggedIn} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
