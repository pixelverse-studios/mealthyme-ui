'use client'
import { Drawer } from '@mantine/core'

import { useUserStore } from '../../lib/store'
import NavPanel from './navPanel'
import { recipeLinks, resources } from './utils'
import { useNavStore } from '../../lib/store'
import styles from './Nav.module.scss'

const RECIPE_PANEL = 'Recipes'
const RESOURCE_PANEL = 'Resources'

function Navigation() {
  const { setShowNav, isMobile, showNav } = useNavStore()
  const { loggedIn } = useUserStore()

  const onDrawerClose = () => {
    if (!isMobile) return
    setShowNav(false)
  }

  if (isMobile)
    return (
      <Drawer
        opened={showNav}
        onClose={onDrawerClose}
        className={styles.navDrawer}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0, blur: 0 }}>
        <nav className={styles.SideNav}>
          <ul>
            <NavPanel
              label={RECIPE_PANEL}
              items={recipeLinks(loggedIn)}
              initialDisplay
            />
            <NavPanel
              label={RESOURCE_PANEL}
              items={resources(loggedIn)}
              initialDisplay={false}
            />
            <footer>&copy; MealThyme {new Date().getFullYear()}</footer>
          </ul>
        </nav>
      </Drawer>
    )

  return (
    <nav className={styles.FullNav}>
      <ul>
        <NavPanel
          label={RECIPE_PANEL}
          items={recipeLinks(loggedIn)}
          initialDisplay
        />
        <NavPanel
          label={RESOURCE_PANEL}
          items={resources(loggedIn)}
          initialDisplay
        />
      </ul>
      <footer>&copy; MealThyme {new Date().getFullYear()}</footer>
    </nav>
  )
}

export default Navigation
