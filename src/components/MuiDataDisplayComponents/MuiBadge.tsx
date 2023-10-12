import { Mail } from '@mui/icons-material'
import { Badge, Stack } from '@mui/material'

export const MuiBadge = () => {
  return (
    <Stack spacing={2} direction='row'>
      <Badge badgeContent={5} color='primary'>
        <Mail />
      </Badge>

      <Badge badgeContent={0} color='secondary' showZero>
        <Mail />
      </Badge>

      <Badge badgeContent={10} color='secondary' showZero max={9}>
        <Mail />
      </Badge>

      <Badge color='secondary' variant='dot'>
        <Mail />
      </Badge>
    </Stack>
  )
}
