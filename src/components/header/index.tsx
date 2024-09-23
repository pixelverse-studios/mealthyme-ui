'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, Burger, Menu } from '@mantine/core'
import LoginButton from '../auth/LoginButton'

import { useUserStore } from '../../lib/store'
import { ProfileProps } from '../../utils/types/user'
import { useNavStore } from '../../lib/store'
import AuthButton from '../auth/AuthButton'
import { userLinks, NavItemType } from '../nav/utils'
import { useScreenSize } from '../../hooks'
import StringUtils from '../../utils/validations/strings'
import Logo from '../nav/Logo'
import styles from './Header.module.css'

const HeaderMenu = ({
  profile,
  loggedIn
}: {
  profile: ProfileProps
  loggedIn: boolean
}) => {
  const router = useRouter()

  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const onMenuToggle = () => setMenuOpen(!menuOpen)
  const renderAvatar = () => {
    if (!loggedIn) return <LoginButton />

    const { avatar, firstName, lastName } = profile
    if (StringUtils.isEmpty(avatar))
      return (
        <Avatar className={styles.avatar}>
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </Avatar>
      )

    return (
      <Avatar className={styles.avatar} variant="filled" radius="xl">
        <img
          alt={`${firstName}_profileAvatar`}
          src={avatar}
          referrerPolicy={'no-referrer'}
        />
      </Avatar>
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
      <Menu opened={menuOpen} onChange={onMenuToggle}>
        <Menu.Target>{renderAvatar()}</Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <AuthButton loggedIn={loggedIn} />
          </Menu.Item>
          {userLinks(false).map(({ route, label }: NavItemType) => (
            <Menu.Item key={label} onClick={() => onMenuItemClick(route)}>
              {label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}

const Header = () => {
  const { profile, loggedIn } = useUserStore()
  const { showNav, isMobile, toggleMobile, setShowNav, toggleDestroyNav } =
    useNavStore()
  const { isMobileWidth } = useScreenSize()

  useEffect(() => {
    if (isMobileWidth && !isMobile) {
      toggleMobile(true)
      setShowNav(false)
      toggleDestroyNav()
    }

    if (!isMobileWidth && isMobile) {
      toggleMobile(false)
    }

    if (!isMobile && !isMobileWidth && !showNav) {
      setShowNav(true)
    }
  }, [
    isMobile,
    isMobileWidth,
    setShowNav,
    showNav,
    toggleDestroyNav,
    toggleMobile
  ])

  const onBurgerClick = () => setShowNav(!showNav)

  return (
    <header className={styles.AppHeader}>
      {isMobile ? <Burger opened={showNav} onClick={onBurgerClick} /> : null}
      <Logo loggedIn={loggedIn} />
      <HeaderMenu profile={profile} loggedIn={loggedIn} />
    </header>
  )
}

export default Header
