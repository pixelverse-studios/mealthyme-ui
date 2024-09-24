import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../../../../lib/store'
import { FaMagnifyingGlass, FaCirclePlus } from 'react-icons/fa6'
import { TextInput, Button } from '@mantine/core'

import RegisterModal from '../../../../components/auth/RegisterModal'
import LayoutSelect from './LayoutSelect'
import { RECIPE_ROUTES } from '../../../../components/nav/utils'

import styles from './Feed.module.scss'

const FilterBar = () => {
  const { loggedIn } = useUserStore()
  const router = useRouter()

  const [showSignupModal, setShowSignupModal] = useState<boolean>(false)

  const onNewRecipeClick = () => router.push(RECIPE_ROUTES.create)

  const onCreateClick = () =>
    loggedIn ? onNewRecipeClick() : setShowSignupModal(true)

  const onModalClose = () => setShowSignupModal(false)

  return (
    <div className={styles.FilterBar}>
      <div className={styles.buttonBlock}>
        <LayoutSelect />
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
      /> */}
      <div className={styles.buttonBlock}>
        <Button
          variant="subtle"
          leftSection={<FaCirclePlus />}
          onClick={onCreateClick}>
          Create
        </Button>
        <RegisterModal show={showSignupModal} onClose={onModalClose} />
      </div>
    </div>
  )
}

export default FilterBar
