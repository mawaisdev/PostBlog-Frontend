import { TextField } from '@mui/material'
import { InputProps } from './PropTypes/InputProps'

export const Input = ({ value, handleChange }: InputProps) => {
  return (
    <TextField
      label='Input'
      type='text'
      value={value}
      onChange={handleChange}
    />
  )
}
