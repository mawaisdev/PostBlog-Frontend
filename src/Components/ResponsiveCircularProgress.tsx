import { CircularProgress, Box } from '@mui/material'

export const ResponsiveCircularProgress = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <CircularProgress disableShrink size={200} />
    </Box>
  )
}
