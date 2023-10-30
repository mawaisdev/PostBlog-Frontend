import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../Api/axios'
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
} from '@mui/material'
import { PostByIdResponse } from '../Types/Responses/Post/PostByIdResponse'
import { formatDate } from '../Utils/DateFormat'
import { CommentComponent } from './CommentComponent'
import { useAuth } from '../Hooks/useAuth'
import { NotFound404 } from '../Pages/NotFound404Page'
import { ResponsiveCircularProgress } from './ResponsiveCircularProgress'
import { Send } from '@mui/icons-material'
import { useComments } from '../Contexts/CommentsContext'

export const Post = () => {
  const { id } = useParams<{ id: string }>()
  const [postData, setPostData] = useState<PostByIdResponse | null>(null)
  const { user } = useAuth()
  const { comments, setChildComments } = useComments() // Destructure comments from context

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getPost = async () => {
      try {
        const { data } = await axios.get<PostByIdResponse>(`/posts/${id}`, {
          signal: controller.signal,
        })
        if (isMounted) {
          setPostData(data)
          console.log('Post Data: ', { postData })
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
              // add onChange and other required props
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <IconButton color='primary'>
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
          {/* Render main comments directly from the context */}
          {comments['null']?.map((comment) => (
            <CommentComponent
              key={comment.comment_id}
              comment={comment}
              isLoggedIn={user ? true : false}
              postId={postData.data?.id}
              createdBy={comment.userId}
              parentId={null}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
