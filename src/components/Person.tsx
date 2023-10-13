import { Box } from '@mui/material'
import { PersonProps } from './PropTypes/GreetProps'

export const Person = ({ name }: PersonProps) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      `{name.first} {name.last}`
    </Box>
  )
}
