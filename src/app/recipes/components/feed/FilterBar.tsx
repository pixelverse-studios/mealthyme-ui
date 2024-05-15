import { useRouter } from 'next/navigation'
import { TextField, InputAdornment, IconButton, Button } from '@mui/material'
import { Search, Tune } from '@mui/icons-material'
import LayoutSelect from './LayoutSelect'

import styles from './Feed.module.scss'

const FilterBar = () => {
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
        <Button variant="outlined" onClick={onNewRecipeClick}>
          Create
        </Button>
      </div>
    </div>
  )
}

export default FilterBar
