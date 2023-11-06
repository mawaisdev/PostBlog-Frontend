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
import { useForm, UseFormReturn } from 'react-hook-form'

import {
  Comment as CommentType,
  GetChildCommentsResponse,
  PaginatedComments,
} from '../Types/Responses/Post/PostByIdResponse'
import { useComments } from '../Contexts/CommentsContext'
import { ArrowDropDown, ArrowDropUp, Edit, Send } from '@mui/icons-material'
import axios from '../Api/axios'
import { useAuth } from '../Hooks/useAuth'
import { DeleteComment } from './Delete'
import { Roles } from '../Types/Responses/User'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import { CommentReply } from './Post'

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
  const { register, handleSubmit, reset }: UseFormReturn<CommentReply> =
    useForm<CommentReply>()
  const axiosPrivate = useAxiosPrivate()
  const [singleComment, setSingleComment] = useState<CommentType>(comment)

  const [pageNumber, setPageNumber] = useState(1)
  const { comments, setChildComments, removeComment, addComment, showLess } =
    useComments()
  const { user } = useAuth()

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
  const handleShowLess = (parentId: number | null) => {
    showLess(String(parentId))
    // setShowMoreClicked(false)
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
  const handleAddComment = async (
    parentId: number,
    { reply }: CommentReply
  ) => {
    try {
      const { data } = await axiosPrivate.post(`/comments`, {
        text: reply,
        postId: Number(postId),
        parentId: parentId ? parentId : null,
        userId: Number(user?.id),
      })

      addComment(parentId, data.data) // Assuming data.comment is the new comment returned from the server
      setSingleComment({
        ...singleComment,
        hasChild: true,
        childCount: singleComment.childCount + 1,
      })
      setIsOpen(true)
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }
  const onSubmit = async ({ reply }: CommentReply): Promise<void> => {
    console.log(reply)
    handleAddComment(comment.comment_id, { reply })
    reset()
  }
  return (
    <>
      <ListItem key={singleComment.comment_id}>
        <Typography variant='body2'>{singleComment.comment_text}</Typography>
        {singleComment.hasChild && (
          <IconButton size='small' onClick={handleToggle}>
            {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        )}
        {isLoggedIn &&
          user &&
          (user.id === singleComment.userId ||
            user.roles.includes(Roles.Admin)) && (
            <>
              {user.id === singleComment.userId && (
                <IconButton size='small' onClick={handleEdit}>
                  <Edit />
                </IconButton>
              )}
              <DeleteComment
                commentId={singleComment.comment_id}
                onDeleteSuccess={() =>
                  removeComment(parentId, singleComment.comment_id)
                }
              />
            </>
          )}
      </ListItem>

      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        {comments[singleComment.comment_id]?.data?.map((childComment) => (
          <div
            key={`${comment.comment_id}_${childComment.comment_id}`}
            style={{ marginLeft: '20px' }}
          >
            <CommentComponent
              comment={childComment}
              postId={postId}
              parentId={singleComment.comment_id}
              isLoggedIn={isLoggedIn}
              createdBy={singleComment.userId}
              key={childComment.comment_id} // Add this key prop
            />
          </div>
        ))}
        {comments[singleComment.comment_id] ? (
          comments[singleComment.comment_id].totalCommentsCount ===
          comments[singleComment.comment_id].data.length ? null : (
            <Button
              onClick={() =>
                handleShowMore(
                  singleComment.comment_id,
                  comments[singleComment.comment_id].pageNumber + 1,
                  comments[singleComment.comment_id].pageSize
                )
              }
            >
              Show More Comments{' '}
            </Button>
          )
        ) : null}
        {comments[singleComment.comment_id] ? (
          comments[singleComment.comment_id].data.length > 5 ? (
            <Button onClick={() => handleShowLess(singleComment.comment_id)}>
              Show Less
            </Button>
          ) : null
        ) : null}
      </Collapse>

      {isLoggedIn && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container alignItems='center' spacing={2} m={2}>
            <Grid item xs={12} sm={9} md={10}>
              <TextField
                label='Add Comment'
                variant='outlined'
                margin='normal'
                fullWidth
                id='reply'
                {...register('reply')}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} sm={3} md={2}>
              <IconButton color='primary' type='submit'>
                <Send />
              </IconButton>
            </Grid>
          </Grid>
        </form>
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
