import { SnackbarContent, Typography } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'

type SnackbarProps = {
  isSubmitting: boolean
  message: string
}

function LoadingSnackbarComponent({ isSubmitting, message }: SnackbarProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={isSubmitting}
    >
      <SnackbarContent
        sx={{ justifyContent: 'center', alignItems: 'center' }}
        message={<Typography align='center'>{message}</Typography>}
      />
    </Snackbar>
  )
}

export default LoadingSnackbarComponent
