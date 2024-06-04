import { Close } from '@mui/icons-material'

import styles from './Drawer.module.scss'

const Drawer = ({
  open,
  onClose,
  overlayContent,
  children
}: {
  open: boolean
  onClose: () => void
  overlayContent: boolean
  children: any
}) => {
  const classes = `${styles.Drawer} ${overlayContent ? styles.overlay : ''} ${open ? styles.open : styles.closed}`
  return (
    <div className={classes}>
      {overlayContent ? <Close onClick={onClose} /> : null}
      <div className={styles.drawerContent}>{children}</div>
    </div>
  )
}

export default Drawer
