import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'

interface SelectFieldProps {
  value: string
  label: string
  onChange: (option: any) => void
  options: string[]
  disabled?: boolean
}

const SelectField = ({
  value,
  label,
  onChange,
  options,
  disabled
}: SelectFieldProps) => {
  const onSelect = (event: SelectChangeEvent<string>) =>
    onChange(event.target.value)
  return (
    <FormControl disabled={disabled}>
      <InputLabel size="small" variant="standard">
        {label}
      </InputLabel>
      <Select onChange={onSelect} variant="standard" size="small" value={value}>
        {options.map((option, index) => (
          <MenuItem value={option} key={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectField
