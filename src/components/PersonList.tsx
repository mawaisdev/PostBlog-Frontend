import { Box } from '@mui/material'
import { PersonListProps } from './PropTypes/PersonListProps'

export const PersonList = ({ names }: PersonListProps) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {names.map((name, index) => {
        return (
          <h1 key={index} style={{ margin: 1 }}>
            {name.name.first} {name.name.last} |
          </h1>
        )
      })}
    </Box>
  )
}
