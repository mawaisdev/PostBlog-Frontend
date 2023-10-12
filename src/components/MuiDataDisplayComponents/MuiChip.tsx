import { Face } from '@mui/icons-material'
import { Avatar, Chip, Stack } from '@mui/material'

export const MuiChip = () => {
  return (
    <Stack direction={'row'} spacing={1}>
      <Chip
        label='Chip Outlined'
        color='success'
        size='small'
        variant='outlined'
        icon={<Face />}
      />
      <Chip label='Chip filled' color='primary' size='small' variant='filled' />
      <Chip
        label='Chip filled'
        color='secondary'
        size='small'
        variant='outlined'
        avatar={<Avatar>V</Avatar>}
      />

      <Chip label='Click' color='success' onClick={() => alert('Clicked')} />
    </Stack>
  )
}
