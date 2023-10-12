import { CircularProgress, Stack, LinearProgress } from '@mui/material'

export const MuiProgress = () => {
  return (
    <Stack spacing={2}>
      <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems='center'>
        <CircularProgress color='success' />
        <CircularProgress color='inherit' />
        <CircularProgress variant='determinate' value={60} color='inherit' />
      </Stack>

      <Stack spacing={3}>
        <LinearProgress color='success' />
        <LinearProgress color='inherit' />
        <LinearProgress variant='determinate' value={60} color='inherit' />
      </Stack>
    </Stack>
  )
}
