import Drawer from '.'

export const NavDrawer = (props: any) => {
  if (props?.destroy) return null
  return <Drawer {...props} />
}
