// DeleteComment.tsx
import { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'

interface DeleteCommentProps {
  commentId: number
  onDeleteSuccess: () => void // A callback function to inform parent component after successful deletion
}

const DeleteComment: React.FC<DeleteCommentProps> = ({
  commentId,
  onDeleteSuccess,
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const openDeleteDialog = () => {
    setOpenDialog(true)
  }

  const closeDeleteDialog = () => {
    setOpenDialog(false)
  }

  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosPrivate.delete(`/comments/${commentId}`)
      if (response.status === 200) {
        onDeleteSuccess()
        setOpenDialog(false) // Close the dialog
      }
    } catch (error) {
      console.error('Error deleting the comment:', error)
      // Handle the error appropriately - maybe show a message to the user
    }
  }

  return (
    <>
      <Button
        size='small'
        onClick={openDeleteDialog}
        variant='outlined'
        color='error'
      >
        <Delete /> Delete
      </Button>

      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color='primary'>
            No
          </Button>
          <Button onClick={handleDeleteConfirm} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export { DeleteComment }
