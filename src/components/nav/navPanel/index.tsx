'use client'
import { useState } from 'react'
import { Collapse } from '@mantine/core'
import { usePathname, useRouter } from 'next/navigation'
import { FaChevronUp } from 'react-icons/fa6'

import { NavItemType } from '../utils'
import styles from './NavPanel.module.css'

type NavPanelProps = {
  label: string
  items: NavItemType[]
  initialDisplay: boolean
}

const NavPanel = ({ label, items, initialDisplay }: NavPanelProps) => {
  const [open, setOpen] = useState<boolean>(initialDisplay)

  const pathname = usePathname()
  const router = useRouter()

  const onTogglePanel = () => setOpen(!open)
  const onItemClick = (route: string) => router.push(route)

  return (
    <li className={styles.navPanel}>
      <button className={styles.panelToggle} onClick={onTogglePanel}>
        <span>{label}</span>
        <FaChevronUp className={open ? styles.open : styles.closed} />
      </button>
      <Collapse
        in={open}
        transitionDuration={150}
        transitionTimingFunction="linear">
        <ul className={styles.listBlock}>
          {items.map(({ label, route }: NavItemType) => (
            <li
              className={
                route === pathname
                  ? `${styles.selected} ${styles.panelLink}`
                  : styles.panelLink
              }
              onClick={() => onItemClick(route)}
              key={label}>
              {label}
            </li>
          ))}
        </ul>
      </Collapse>
    </li>
  )
}

export default NavPanel
