import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { useState } from 'react'

export const MuiDialog = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialogue</Button>
      <Dialog
        open={open}
        aria-labelledby='dialog-title'
        aria-aria-describedby='dialog-description'
        onClose={() => setOpen(false)}
      >
        <DialogTitle id='dialog-title'>Submit Test?</DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-description'>
            Are You Sure You want to Submit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button autoFocus>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
