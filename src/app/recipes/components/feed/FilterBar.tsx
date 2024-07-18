import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Search, Tune, AddCircle } from '@mui/icons-material'
import LayoutSelect from './LayoutSelect'

import styles from './Feed.module.scss'

const FilterBar = () => {
  const { loggedIn } = useSelector((state: any) => state.user)
  const router = useRouter()

  const onNewRecipeClick = () => router.push('/recipes/new')

  return (
    <div className={styles.FilterBar}>
      <div className={styles.buttonBlock}>
        <LayoutSelect />
        <IconButton>
          <Tune />
        </IconButton>
      </div>
      <TextField
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
      />
      <div className={styles.buttonBlock}>
        <IconButton disabled={!loggedIn} onClick={onNewRecipeClick}>
          <AddCircle />
        </IconButton>
      </div>
    </div>
  )
}

export default FilterBar
