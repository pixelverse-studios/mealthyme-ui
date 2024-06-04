'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
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
import { Fastfood, Menu as MenuIcon } from '@mui/icons-material'
import LoginButton from '../auth/LoginButton'
import LogoutButton from '../auth/LogoutButton'
import { ProfileProps } from '@/utils/types/user'
import {
  setIsMobile,
  setShowMobile,
  toggleDestroy
} from '@/lib/redux/slices/nav'
import { userLinks, NavItemType } from './utils'
import hooks from '@/hooks'

import styles from './Nav.module.scss'

const NavItems = ({
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
    <Box
      className={styles.navBody}
      sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Logo showText />
      <div className={styles.navItems}>
        {renderAvatar()}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={menuOpen}
          onClose={handleMenuClose}
          onClick={handleMenuClose}>
          <MenuItem>{loggedIn ? <LogoutButton /> : <LoginButton />}</MenuItem>
          {userLinks(profile?._id != '').map(
            ({ route, label }: NavItemType) => (
              <MenuItem key={label} onClick={() => onMenuItemClick(route)}>
                {label}
              </MenuItem>
            )
          )}
        </Menu>
      </div>
    </Box>
  )
}

const Logo = ({ showText }: { showText: boolean }) => {
  const router = useRouter()
  return (
    <div className={styles.logoBlock} onClick={() => router.push('/recipes')}>
      <Fastfood className={styles.logo} />
      {showText ? <span>MealThyme</span> : null}
    </div>
  )
}

function Navbar() {
  const dispatch = useDispatch()
  const { profile, loggedIn } = useSelector((state: any) => state.user)
  const { isMobile, showMobile } = useSelector((state: any) => state.nav)

  const { isMobileWidth } = hooks.useScreenSize()
  useEffect(() => {
    if (isMobileWidth && !isMobile) {
      dispatch(setIsMobile(true))
      dispatch(setShowMobile(false))
      toggleDestroy(dispatch)
    }

    if (!isMobileWidth && isMobile) {
      dispatch(setIsMobile(false))
    }

    if (!isMobile && !isMobileWidth && !showMobile) {
      dispatch(setShowMobile(true))
    }
  }, [dispatch, isMobile, isMobileWidth, showMobile])

  const onMenuClick = () => dispatch(setShowMobile(!showMobile))

  return (
    <AppBar position="fixed" className={styles.Nav}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
            <Logo showText={false} />
          </Box>
          <NavItems profile={profile} loggedIn={loggedIn} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
