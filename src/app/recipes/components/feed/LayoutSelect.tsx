import { useState, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, MenuItem, IconButton } from '@mui/material'
import { TableRows, ViewAgenda, Window } from '@mui/icons-material'
import {
  setLayout,
  COZY,
  COMPACT,
  GRID
} from '../../../../lib/redux/slices/recipes'

import styles from './Feed.module.scss'

const layoutMap = new Map()
layoutMap.set(COZY, { label: COZY, icon: <ViewAgenda /> })
layoutMap.set(COMPACT, { label: COMPACT, icon: <TableRows /> })
layoutMap.set(GRID, { label: GRID, icon: <Window /> })

const LayoutSelect = () => {
  const dispatch = useDispatch()
  const { layout } = useSelector((state: any) => state.recipes)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const onLayoutChange = (value: string) => {
    dispatch(setLayout(value))
    setAnchorEl(null)
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={styles.LayoutSelect}>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}>
        {layoutMap.get(layout).icon}
      </IconButton>
      <Menu
        open={open}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        anchorEl={anchorEl}
        aria-expanded={open ? 'true' : undefined}
        onClose={handleClose}>
        <MenuItem
          onClick={() => onLayoutChange(layoutMap.get(COZY).label)}
          value={layoutMap.get(COZY).label}>
          {layoutMap.get(COZY).icon}
        </MenuItem>
        <MenuItem
          onClick={() => onLayoutChange(layoutMap.get(COMPACT).label)}
          value={layoutMap.get(COMPACT).label}>
          {layoutMap.get(COMPACT).icon}
        </MenuItem>
        <MenuItem
          onClick={() => onLayoutChange(layoutMap.get(GRID).label)}
          value={layoutMap.get(GRID).label}>
          {layoutMap.get(GRID).icon}
        </MenuItem>
      </Menu>
    </div>
  )
}

export default LayoutSelect
