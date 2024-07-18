import { useMemo, useState } from 'react'
import { Tooltip, ClickAwayListener, Fade } from '@mui/material'

import { useScreenSize } from '../../hooks'

interface ToolTipProps {
  children: any
  info: string
}

const ToolTip = ({ children, info }: ToolTipProps) => {
  const { isMobileWidth } = useScreenSize()
  const [show, setShow] = useState<boolean>(false)

  const tooltipProps = useMemo(
    () =>
      isMobileWidth
        ? {
            PopperProps: { disablePortal: true },
            onClose: () => setShow(false),
            open: show,
            disableFocusListener: true,
            disableHoverListener: true,
            disableTouchListener: true
          }
        : {},
    [isMobileWidth, show]
  )

  return (
    <ClickAwayListener onClickAway={() => setShow(false)}>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
        title={info}
        arrow
        {...tooltipProps}>
        <div onClick={() => setShow(true)}>{children}</div>
      </Tooltip>
    </ClickAwayListener>
  )
}

export default ToolTip
