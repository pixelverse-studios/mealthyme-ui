import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Search, Tune } from '@mui/icons-material'
import LayoutSelect from './LayoutSelect'

import styles from './Feed.module.scss'

const FilterBar = () => {
  return (
    <div className={styles.FilterBar}>
      <LayoutSelect />
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
      <IconButton>
        <Tune />
      </IconButton>
    </div>
  )
}

export default FilterBar
