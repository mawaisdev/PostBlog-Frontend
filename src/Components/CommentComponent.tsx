import {
  ListItem,
  Typography,
  IconButton,
  Collapse,
  TextField,
  Grid,
  Button,
} from '@mui/material'
import { useState } from 'react'
import {
  Comment as CommentType,
  GetChildCommentsResponse,
  PaginatedComments,
} from '../Types/Responses/Post/PostByIdResponse'
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
  handleShowMore: (
    parentId: number | null,
    pageNumber: number,
    perPage: number
  ) => void
}

export const CommentComponent = ({
  comment,
  postId,
  isLoggedIn,
  parentId,
  handleShowMore,
}: CommentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const [newComment, setNewComment] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const { comments, setChildComments, removeComment, addComment, showLess } =
    useComments()
  const { user } = useAuth()
  const [showMoreClicked, setShowMoreClicked] = useState(false)

  const handleShow = async (
    parentId: number | null,
    pageNumber: number,
    pageSize: number
  ) => {
    console.log(
      `Child Comments Requesting More Comments With Page Number: ${pageNumber}, Page Size: ${pageSize} and ParentId: ${parentId}`
    )
    const handleShowMore = async (
      parentId: number | null = null,
      pageNumber: number,
      perPage: number
    ) => {
      const url = parentId
        ? `/allcomments/${postId}/comments?parentId=${parentId}&page=${pageNumber}&perPage=${5}`
        : `/allcomments/${postId}/comments?page=${pageNumber}&perPage=${perPage}`
      console.log(
        `Handle Show More With Parent Id: ${parentId} & PageNumber: ${pageNumber} & PerPage: ${5}`
      )
      try {
        const { data } = await axios.get<GetChildCommentsResponse>(url)
        const commentsData: PaginatedComments = data
        if (data.status === 200) setChildComments(parentId, commentsData)

        console.log('Fetched With Show More', data)
      } catch (error) {
        console.error('Error fetching child comments:', error)
      }
    }

    await handleShowMore(parentId, pageNumber, pageSize)
  }
  const handleShowLess = (parentId: number | null) => {
    showLess(String(parentId))
    setShowMoreClicked(false)
  }
  const handleToggle = async () => {
    if (!isOpen && comment.hasChild) {
      // Check if comments for the specific parent comment are already in the context
      if (comments[comment.comment_id]) {
        // Comments are already in the context, use them
        setIsOpen(!isOpen)
        return
      }
    }
    if (!isOpen && comment.hasChild) {
      try {
        const { data } = await axios.get<GetChildCommentsResponse>(
          `/allcomments/${postId}/comments?parentId=${
            comment.comment_id
          }&page=${pageNumber}&perPage=${5}`
        )
        if (data.status === 200) {
          const commentData: PaginatedComments = {
            data: data.data,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            remainingCommentsCount: data.remainingCommentsCount,
            totalCommentsCount: data.totalCommentsCount,
          }

          // Assuming you have a setChildComments function in your context
          setChildComments(comment.comment_id, commentData) // Update context with child comments
          setPageNumber(pageNumber + 1) // Increment the page number
          setIsOpen(!isOpen)
        }
        console.log('child comments', data)
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
        {comments[comment.comment_id]?.data?.map((childComment) => (
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
              handleShowMore={handleShowMore}
            />
          </div>
        ))}
        {comments[comment.comment_id] ? (
          comments[comment.comment_id].totalCommentsCount ===
          comments[comment.comment_id].data.length ? null : (
            <Button
              onClick={() =>
                handleShow(
                  comment.comment_id,
                  comments[comment.comment_id].pageNumber + 1,
                  comments[comment.comment_id].pageSize
                )
              }
            >
              Show More Comments{' '}
            </Button>
          )
        ) : null}
        {showMoreClicked ? (
          <Button onClick={() => handleShowLess(comment.comment_id)}>
            Show Less
          </Button>
        ) : null}
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
