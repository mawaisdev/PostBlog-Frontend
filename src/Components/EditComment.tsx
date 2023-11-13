import { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'

interface EditCommentProps {
  commentId: number
  initialText: string
  onEditSuccess: (editedText: string) => void // A callback function to inform the parent component after successful edit
  // Use State Set Method
  setText: React.Dispatch<React.SetStateAction<string>>
}

const EditComment: React.FC<EditCommentProps> = ({
  commentId,
  initialText,
  onEditSuccess,
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [editedText, setEditedText] = useState(initialText)
  const axiosPrivate = useAxiosPrivate()

  const openEditDialog = () => {
    setOpenDialog(true)
  }

  const closeEditDialog = () => {
    setOpenDialog(false)
  }

  const handleEditConfirm = async () => {
    try {
      const response = await axiosPrivate.put(`/comments/${commentId}`, {
        text: editedText,
      })

      if (response.status === 200) {
        onEditSuccess(editedText)
        setOpenDialog(false) // Close the dialog
      }
    } catch (error) {
      console.error('Error editing the comment:', error)
      // Handle the error appropriately - maybe show a message to the user
    }
  }

  return (
    <>
      <Button size='small' onClick={openEditDialog} variant='outlined'>
        <Edit /> Edit
      </Button>

      <Dialog open={openDialog} onClose={closeEditDialog}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            label='Edit Comment'
            variant='outlined'
            margin='normal'
            fullWidth
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleEditConfirm} color='primary' autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export { EditComment }
