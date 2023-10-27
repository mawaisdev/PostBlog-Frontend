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
import { ArrowDropDown, ArrowDropUp, Send } from '@mui/icons-material'

interface CommentProps {
  comment: CommentType
  isLoggedIn: boolean
}

export const CommentComponent = ({ comment, isLoggedIn }: CommentProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
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
      </ListItem>

      {/* Child comments would go here when isOpen is true */}
      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        {/* Render child comments here */}
      </Collapse>

      {isLoggedIn && (
        <Grid
          container
          spacing={2}
          style={{ marginTop: '10px', marginBottom: '10px' }}
        >
          <Grid item xs={9} md={10}>
            <TextField
              label='Reply to this comment'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <IconButton color='primary'>
              <Send />
            </IconButton>
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
