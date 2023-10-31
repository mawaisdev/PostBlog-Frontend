import {
  ListItem,
  Typography,
  IconButton,
  Collapse,
  TextField,
  Grid,
} from '@mui/material'
import { useState } from 'react'
import { Comment as CommentType } from '../Types/Responses/Post/PostByIdResponse'
import { useComments } from '../Contexts/CommentsContext'
import { ArrowDropDown, ArrowDropUp, Edit, Send } from '@mui/icons-material'
import axios from '../Api/axios'
import { useAuth } from '../Hooks/useAuth'
import { DeleteComment } from './DelteComment'
import { Roles } from '../Types/Responses/User'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'

interface CommentProps {
  comment: CommentType
  postId?: number
  parentId: number | null
  isLoggedIn: boolean
  createdBy: number
}

export const CommentComponent = ({
  comment,
  postId,
  isLoggedIn,
  parentId,
}: CommentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const [newComment, setNewComment] = useState('')
  const { comments, setChildComments, removeComment, addComment } =
    useComments()
  const { user } = useAuth()

  const handleToggle = async () => {
    if (!isOpen && comment.hasChild && !comments[comment.comment_id]) {
      try {
        const response = await axios.get(
          `/allcomments/${postId}/comments?parentId=${comment.comment_id}`
        )
        if (response.status === 200)
          setChildComments(comment.comment_id, response.data.data)
      } catch (error) {
        console.error('Error fetching child comments:', error)
      }
    }
    setIsOpen(!isOpen)
  }
  const handleEdit = () => {
    console.log('edit', { comment }, { postId })
  }
  const handleAddComment = async (parentId: number) => {
    try {
      const { data } = await axiosPrivate.post(`/comments`, {
        text: newComment,
        postId: Number(postId),
        parentId,
        userId: Number(user?.id),
      })

      addComment(parentId, data.data) // Assuming data.comment is the new comment returned from the server
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  return (
    <>
      <ListItem key={comment.comment_id}>
        <Typography variant='body2'>{comment.comment_text}</Typography>
        {comment.hasChild && (
          <IconButton size='small' onClick={handleToggle}>
            {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        )}
        {isLoggedIn &&
          user &&
          (user.id === comment.userId || user.roles.includes(Roles.Admin)) && (
            <>
              {user.id === comment.userId && (
                <IconButton size='small' onClick={handleEdit}>
                  <Edit />
                </IconButton>
              )}
              <DeleteComment
                commentId={comment.comment_id}
                onDeleteSuccess={() =>
                  removeComment(parentId!, comment.comment_id)
                }
              />
            </>
          )}
      </ListItem>

      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        {Array.isArray(comments[comment.comment_id]) &&
          comments[comment.comment_id].map((childComment) => (
            <div
              key={`${comment.comment_id}_${childComment.comment_id}`}
              style={{ marginLeft: '20px' }}
            >
              <CommentComponent
                comment={childComment}
                postId={postId}
                parentId={comment.comment_id}
                isLoggedIn={isLoggedIn}
                createdBy={comment.userId}
                key={childComment.comment_id} // Add this key prop
              />
            </div>
          ))}
      </Collapse>

      {isLoggedIn && (
        <Grid
          container
          spacing={2}
          style={{ marginTop: '10px', marginBottom: '10px' }}
        >
          <Grid
            container
            style={{ marginTop: '10px', marginBottom: '10px' }}
            ml={8}
          >
            <Grid item xs={9} md={10}>
              <TextField
                label='Reply to this comment'
                variant='outlined'
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <IconButton
                color='primary'
                onClick={() => handleAddComment(comment.comment_id)}
              >
                <Send />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )}
      {!isLoggedIn && (
        <Typography
          variant='body2'
          color='textSecondary'
          style={{ marginTop: '10px', marginBottom: '10px' }}
        >
          Please login to reply.
        </Typography>
      )}
    </>
  )
}
