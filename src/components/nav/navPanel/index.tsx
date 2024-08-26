'use client'
import { useState } from 'react'
import { Collapse } from '@mantine/core'
import { usePathname, useRouter } from 'next/navigation'

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
    <section>
      <button onClick={onTogglePanel}>{label}</button>
      <Collapse in={open}>
        {items.map(({ label, route }: NavItemType) => (
          <div
            className={route === pathname ? styles.selected : ''}
            onClick={() => onItemClick(route)}
            key={label}>
            {label}
          </div>
        ))}
      </Collapse>
    </section>
  )
}

export default NavPanel
