import {
  Autocomplete,
  TextField as MuiTextField,
  createFilterOptions
} from '@mui/material'
import { isMatchingString } from '@/utils/validations/strings'

interface OptionProps {
  _id: string
  label: string
}
interface AutoCompleteProps {
  options: OptionProps[] | []
  id: string
  value: OptionProps
  label: string
  onChange: (data: any, name: string) => void
}

const filter = createFilterOptions<OptionProps>()

const AutoComplete = ({
  options,
  id,
  value,
  onChange,
  label
}: AutoCompleteProps) => {
  return (
    <Autocomplete
      options={options}
      size="small"
      onChange={(event, newValue) => onChange(newValue, id)}
      filterOptions={(options, params) => {
        const filtered = filter(options, params) as any
        const { inputValue } = params
        const isExisting = options.some(option =>
          isMatchingString(inputValue, option.label)
        )
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            _id: '',
            label: inputValue + ''
          })
        }

        return filtered
      }}
      id={id}
      value={value}
      renderInput={params => (
        <MuiTextField {...params} variant="standard" label={label} />
      )}
    />
  )
}

export default AutoComplete
