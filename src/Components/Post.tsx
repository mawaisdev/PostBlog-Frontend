import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  Divider,
  List,
  Typography,
  Stack,
  TextField,
  Grid,
  IconButton,
  Button,
} from '@mui/material'
import {
  GetChildCommentsResponse,
  PostByIdResponse,
} from '../Types/Responses/Post/PostByIdResponse'
import { formatDate } from '../Utils/DateFormat'
import { CommentComponent } from './CommentComponent'
import { useAuth } from '../Hooks/useAuth'
import { NotFound404 } from '../Pages/NotFound404Page'
import { ResponsiveCircularProgress } from './ResponsiveCircularProgress'
import { Send } from '@mui/icons-material'
import { useComments } from '../Contexts/CommentsContext'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import axios from '../Api/axios'

export const Post = () => {
  const { id } = useParams<{ id: string }>()
  const [postData, setPostData] = useState<PostByIdResponse | null>(null)
  const axiosPrivate = useAxiosPrivate()
  const { user } = useAuth()
  const { comments, setChildComments, addComment } = useComments() // Destructure comments from context
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getPost = async () => {
      try {
        const { data } = await axiosPrivate.get<PostByIdResponse>(
          `/posts/${id}`,
          {
            signal: controller.signal,
          }
        )
        if (isMounted) {
          setPostData(data)
          console.log(data)
          setChildComments(null, data.data?.comments || [])
        }
      } catch (error: AxiosError | any) {
        if (error.response?.status === 404) {
          setPostData({
            status: 404,
            response: error.response.data,
            data: error.response.data,
          })
        }
      }
    }

    getPost()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [id]) // Only id in the dependency array// Keep only id in the dependency array to avoid infinite requests

  // If data hasn't been fetched yet, show a loading message.
  if (!postData) {
    return <ResponsiveCircularProgress height='100vh' />
  }
  if (postData?.status === 404) {
    return <NotFound404 />
  }

  const handleAddComment = async () => {
    try {
      const { data } = await axiosPrivate.post(`/comments`, {
        text: newComment,
        postId: Number(id),
        parentId: null,
        userId: Number(user?.id),
      })

      console.log(data.data)

      addComment(null, data.data) // Assuming data.comment is the new comment returned from the server
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const handleShowMore = async (
    parentId: number | null = null,
    pageNumber: number,
    perPage: number
  ) => {
    const url = parentId
      ? `/allcomments/${id}/comments?parentId=${parentId}&page=${pageNumber}&perPage=${perPage}`
      : `/allcomments/${id}/comments?page=${pageNumber}&perPage=${perPage}`
    console.log(
      `Handle Show More With Parent Id: ${parentId} & PageNumber: ${pageNumber} & PerPage: ${perPage}`
    )
    try {
      const { data } = await axios.get<GetChildCommentsResponse>(url)
      if (data.status === 200) setChildComments(parentId, data.data)

      console.log('Fetched With Show More', data)
    } catch (error) {
      console.error('Error fetching child comments:', error)
    }
  }

  return (
    <Card variant='outlined' style={{ marginTop: 20, marginBottom: 20 }}>
      <Stack direction='row' justifyContent='space-between'>
        <CardHeader
          title={postData.data?.title}
          subheader={`Posted by ${postData.data?.user.userName} on ${
            postData.data && formatDate(postData.data?.createdAt)
          }`}
        />
        <Chip
          label={postData.data?.category.name}
          variant='outlined'
          style={{ margin: 15 }}
        />
      </Stack>
      <CardContent>
        <Typography variant='body1'>{postData.data?.body}</Typography>
      </CardContent>
      <Divider />
      {user ? (
        <Grid
          container
          spacing={2}
          m={2}
          // style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          <Grid item xs={9} md={10}>
            <TextField
              label='Add a comment'
              variant='outlined'
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <IconButton color='primary' onClick={handleAddComment}>
              <Send />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Typography
          m={2}
          variant='body2'
          color='textSecondary'
          style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          Please login to add comments.
        </Typography>
      )}

      <CardContent sx={{ m: 2 }}>
        <Typography variant='h6'>Comments</Typography>
        <List>
          {comments['null']?.map((comment) => (
            <CommentComponent
              key={comment.comment_id}
              comment={comment}
              isLoggedIn={user ? true : false}
              postId={postData.data?.id}
              createdBy={comment.userId}
              parentId={null}
              handleShowMore={() =>
                handleShowMore(
                  comment.comment_id,
                  postData.pageNumber!,
                  postData.pageSize!
                )
              }
            />
          ))}
        </List>
        {' Main Comments End Here'}
        {postData.remainingCommentsCount &&
        postData.remainingCommentsCount > 0 ? (
          <Button
            onClick={() =>
              handleShowMore(null, postData.pageNumber! + 1, postData.pageSize!)
            }
          >
            Show More Comments{' '}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}
