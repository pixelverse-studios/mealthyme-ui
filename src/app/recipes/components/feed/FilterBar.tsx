import { useRouter } from 'next/navigation'
import { useUserStore } from '../../../../lib/store'
import { FaMagnifyingGlass, FaFilter, FaCirclePlus } from 'react-icons/fa6'
import { TextInput, ActionIcon } from '@mantine/core'

import LayoutSelect from './LayoutSelect'
import { RECIPE_ROUTES } from '../../../../components/nav/utils'

import styles from './Feed.module.scss'

const FilterBar = () => {
  const { loggedIn } = useUserStore()
  const router = useRouter()

  const onNewRecipeClick = () => router.push(RECIPE_ROUTES.create)

  return (
    <div className={styles.FilterBar}>
      <div className={styles.buttonBlock}>
        <LayoutSelect />
        <ActionIcon variant="subtle" radius="md" size="lg">
          <FaFilter />
        </ActionIcon>
      </div>
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={<FaMagnifyingGlass />}
        label=""
        placeholder="Search..."
      />
      {/* <TextField
        className={styles.search}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      /> */}
      <div className={styles.buttonBlock}>
        <ActionIcon
          variant="subtle"
          radius="md"
          size="lg"
          disabled={!loggedIn}
          onClick={onNewRecipeClick}>
          <FaCirclePlus />
        </ActionIcon>
      </div>
    </div>
  )
}

export default FilterBar
