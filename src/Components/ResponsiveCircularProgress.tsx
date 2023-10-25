import { CircularProgress, Box } from '@mui/material'

export interface ResponsiveCircularProgressProps {
  height?: string
}

export const ResponsiveCircularProgress = ({
  height = '35vh',
}: ResponsiveCircularProgressProps) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height={height}
    >
      <CircularProgress disableShrink size={200} />
    </Box>
  )
}
