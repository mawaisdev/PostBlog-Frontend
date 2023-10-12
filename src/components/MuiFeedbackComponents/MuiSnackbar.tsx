import { Button, Snackbar, Alert, AlertProps } from '@mui/material'
import { forwardRef, useState } from 'react'

export const MuiSnackbar = () => {
  const [open, setOpen] = useState(false)

  const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
      return <Alert ref={ref} {...props} />
    }
  )

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }
  return (
    <>
      <Button onClick={() => setOpen(true)}>Click</Button>
      {/* <Snackbar
        message='Form submitted successfully'
        autoHideDuration={4000}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      /> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <SnackbarAlert onClose={handleClose} severity='success'>
          Form Submitted
        </SnackbarAlert>
      </Snackbar>
    </>
  )
}
