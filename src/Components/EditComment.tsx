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
import { Comment } from '../Types/Responses/Post/PostByIdResponse'
import { useForm } from 'react-hook-form'

interface EditCommentProps {
  comment: Comment
  postId?: number
  initialText: string
  onEditSuccess: (editedText: string) => void
}

const EditComment: React.FC<EditCommentProps> = ({
  comment,
  initialText,
  postId,
  onEditSuccess,
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const { register, handleSubmit, setValue, formState } = useForm<{
    editedText: string
  }>()

  const openEditDialog = () => {
    setValue('editedText', initialText)
    setOpenDialog(true)
  }

  const closeEditDialog = () => {
    setOpenDialog(false)
  }

  const handleEditConfirm = async (data: { editedText: string }) => {
    try {
      const response = await axiosPrivate.patch(
        `/comments/${comment.comment_id}`,
        {
          text: data.editedText,
          postId: postId,
          userId: comment.userId,
        }
      )

      if (response.status === 200) {
        onEditSuccess(data.editedText)
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

      <Dialog
        open={openDialog}
        onClose={closeEditDialog}
        sx={{ minWidth: '500px' }}
      >
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleEditConfirm)}>
            <TextField
              label='Edit Comment'
              variant='outlined'
              margin='normal'
              fullWidth
              {...register('editedText', {
                required: 'This field is required',
              })}
              error={!!formState.errors.editedText}
              helperText={formState.errors.editedText?.message}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color='primary'>
            Cancel
          </Button>
          <Button
            type='submit'
            onClick={handleSubmit(handleEditConfirm)}
            color='primary'
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export { EditComment }
