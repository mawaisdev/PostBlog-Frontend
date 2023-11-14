import {
  ListItem,
  Typography,
  IconButton,
  Collapse,
  TextField,
  Button,
  Stack,
  Box,
} from '@mui/material'
import { useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

import {
  Comment as CommentType,
  GetChildCommentsResponse,
  PaginatedComments,
} from '../Types/Responses/Post/PostByIdResponse'
import { useComments } from '../Contexts/CommentsContext'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import axios from '../Api/axios'
import { useAuth } from '../Hooks/useAuth'
import { DeleteComment } from './DeleteComment'
import { Roles } from '../Types/Responses/User'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import { CommentReply } from './Post'
import { EditComment } from './EditComment'

interface CommentProps {
  comment: CommentType
  postId?: number
  parentId: number | null
  isLoggedIn: boolean
  createdBy: number
  depth: number // Added depth prop to track the level of nesting
}

export const CommentComponent = ({
  comment,
  postId,
  isLoggedIn,
  parentId,
  depth = 0,
}: CommentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, reset }: UseFormReturn<CommentReply> =
    useForm<CommentReply>()
  const axiosPrivate = useAxiosPrivate()
  const [replyMode, setReplyMode] = useState(false)
  const [singleComment, setSingleComment] = useState<CommentType>(comment)

  const [pageNumber, setPageNumber] = useState(1)
  const {
    comments,
    setChildComments,
    removeComment,
    addComment,
    showLess,
    editComment,
  } = useComments()
  const { user } = useAuth()

  const handleShowMore = async (
    parentId: number | null = null,
    pageNumber: number,
    perPage: number
  ) => {
    const url = parentId
      ? `/allcomments/${postId}/comments?parentId=${parentId}&page=${pageNumber}&perPage=${5}`
      : `/allcomments/${postId}/comments?page=${pageNumber}&perPage=${perPage}`

    try {
      const { data } = await axios.get<GetChildCommentsResponse>(url)
      const commentsData: PaginatedComments = data
      if (data.status === 200) setChildComments(parentId, commentsData)
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
      } catch (error) {
        console.error('Error fetching child comments:', error)
      }
    }
    setIsOpen(!isOpen)
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
      setReplyMode(false)
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }
  const onEditSuccess = (editedText: string) => {
    editComment(parentId, comment.comment_id, editedText)
    setSingleComment({
      ...singleComment,
      comment_text: editedText,
    })
  }
  const onSubmit = async ({ reply }: CommentReply): Promise<void> => {
    handleAddComment(comment.comment_id, { reply })
    reset()
  }
  return (
    <Box sx={{ marginLeft: `${depth * 4}px` }}>
      <ListItem key={singleComment.comment_id}>
        <Typography
          variant='body2'
          width='40%'
          height='auto'
          display='flex'
          justifyContent='center'
        >
          {singleComment.comment_text}
        </Typography>

        {singleComment.hasChild && (
          <IconButton size='small' onClick={handleToggle}>
            {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        )}
        {isLoggedIn &&
          !replyMode &&
          user &&
          (user.id === singleComment.userId ||
            user.roles.includes(Roles.Admin)) && (
            <Stack
              direction='row'
              display='flex'
              justifyContent='space-around'
              width='40%'
            >
              {user.id === singleComment.userId && (
                <EditComment
                  postId={postId}
                  comment={comment}
                  initialText={comment.comment_text}
                  onEditSuccess={onEditSuccess}
                />
              )}
              <DeleteComment
                commentId={singleComment.comment_id}
                onDeleteSuccess={() =>
                  removeComment(parentId, singleComment.comment_id)
                }
              />
              {isLoggedIn && !replyMode && (
                <Button variant='outlined' onClick={() => setReplyMode(true)}>
                  Reply
                </Button>
              )}
            </Stack>
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
              depth={depth + 1} // Increment the depth for nested comments
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

      {isLoggedIn && replyMode && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction='column'>
            <TextField
              label='Add Comment'
              variant='outlined'
              margin='normal'
              fullWidth
              id='reply'
              {...register('reply')}
              autoComplete='off'
            />
            <Stack
              direction='row'
              spacing={2}
              display='flex'
              justifyContent='space-around'
            >
              <Button color='primary' type='submit' variant='outlined'>
                Send
              </Button>
              <Button
                color='primary'
                variant='outlined'
                onClick={() => setReplyMode(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
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
    </Box>
  )
}
