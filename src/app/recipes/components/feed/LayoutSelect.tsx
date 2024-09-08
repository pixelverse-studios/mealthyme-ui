import { Combobox, InputBase, useCombobox } from '@mantine/core'
// import { FaRectangleList } from 'react-icons/fa6'
import { BsGridFill, BsGrid3X3GapFill } from 'react-icons/bs'

import { useRecipeStore } from '../../../../lib/store/index'

import styles from './Feed.module.scss'

export const COZY = 'Cozy'
// export const COMPACT = 'Compact'
export const GRID = 'Grid'
export const layoutMap = new Map()
layoutMap.set(COZY, { value: COZY, label: <BsGridFill /> })
// layoutMap.set(COMPACT, { value: COMPACT, label: <BsGridFill /> })
layoutMap.set(GRID, { value: GRID, label: <BsGrid3X3GapFill /> })

const LayoutSelect = () => {
  const { setLayout, layout } = useRecipeStore()

  const combobox = useCombobox()

  const onClick = (data: any) => {
    setLayout(layoutMap.get(data))
    combobox.closeDropdown()
  }

  return (
    <div className={styles.LayoutSelect}>
      <Combobox store={combobox} onOptionSubmit={onClick}>
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            onClick={() => combobox.toggleDropdown()}>
            {layout.label}
          </InputBase>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <Combobox.Option value={layoutMap.get(COZY).value}>
              {layoutMap.get(COZY).label}
            </Combobox.Option>
            <Combobox.Option value={layoutMap.get(GRID).value}>
              {layoutMap.get(GRID).label}
            </Combobox.Option>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  )
}

export default LayoutSelect
