'use client'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Box, Toolbar, IconButton, Container } from '@mui/material'
import LoginButton from '../auth/LoginButton'
import LogoutButton from '../auth/LogoutButton'
import { Drawer } from '@mui/material'
import { Fastfood, Menu } from '@mui/icons-material'
import styles from './Nav.module.scss'

// const pages = ['FAQs', 'Login/Signup']
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const Logo = ({ showText }: { showText: boolean }) => (
  <div className={styles.logoBlock}>
    <Fastfood className={styles.logo} />
    {showText ? <span>MealThyme</span> : null}
  </div>
)

function Navbar() {
  const { profile } = useSelector((state: any) => state.user)

  const [showMobileDrawer, setShowMobileDrawer] = useState<boolean>(false)

  return (
    <AppBar position="static">
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
              onClick={() => setShowMobileDrawer(!showMobileDrawer)}
              color="inherit">
              <Menu />
            </IconButton>
            <Logo showText={false} />
            <Drawer
              open={showMobileDrawer}
              onClose={() => setShowMobileDrawer(false)}>
              display mobile nav list
            </Drawer>
          </Box>
          <Box
            className={styles.nav}
            sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Logo showText />
            <div>
              {profile?._id !== '' ? <LogoutButton /> : <LoginButton />}
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
