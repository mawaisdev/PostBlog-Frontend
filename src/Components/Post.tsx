import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, UseFormReturn } from 'react-hook-form'
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
  CardMedia,
  Box,
} from '@mui/material'
import {
  GetChildCommentsResponse,
  PaginatedComments,
  PostByIdResponse,
} from '../Types/Responses/Post/PostByIdResponse'
import { formatDate } from '../Utils/DateFormat'
import { CommentComponent } from './CommentComponent'
import { useAuth } from '../Hooks/useAuth'
import { NotFound404 } from '../Pages/NotFound404Page'
import { ResponsiveCircularProgress } from './ResponsiveCircularProgress'
import { Send } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useComments } from '../Contexts/CommentsContext'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import axios from '../Api/axios'
export type CommentReply = {
  reply: string
}

export const Post = () => {
  const { register, handleSubmit, reset }: UseFormReturn<CommentReply> =
    useForm<CommentReply>()
  const { id } = useParams<{ id: string }>()
  const [postData, setPostData] = useState<PostByIdResponse | null>(null)
  const [showMoreClicked, setShowMoreClicked] = useState(false)
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const { user } = useAuth()
  const { comments, setChildComments, addComment, showLess } = useComments() // Destructure comments from context

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
          const commentsData: PaginatedComments = {
            data: data.data?.comments || [],
            pageNumber: data.pageNumber ? data.pageNumber : 1,
            pageSize: data.pageSize ? data.pageSize : 5,
            totalCommentsCount: data.totalCommentsCount
              ? data.totalCommentsCount
              : 1,
            remainingCommentsCount: data.remainingCommentsCount
              ? data.remainingCommentsCount
              : 0,
          }

          setChildComments(null, commentsData)
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

  const handleAddComment = async ({ reply }: CommentReply): Promise<void> => {
    try {
      const { data } = await axiosPrivate.post(`/comments`, {
        text: reply,
        postId: Number(id),
        parentId: null,
        userId: Number(user?.id),
      })

      console.log(data.data)

      addComment(null, data.data) // Assuming data.comment is the new comment returned from the server
      reset()
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
      ? `/allcomments/${id}/comments?parentId=${parentId}&page=${pageNumber}&perPage=${5}`
      : `/allcomments/${id}/comments?page=${pageNumber}&perPage=${perPage}`
    console.log(
      `Handle Show More With Parent Id: ${parentId} & PageNumber: ${pageNumber} & PerPage: ${5}`
    )
    try {
      const { data } = await axios.get<GetChildCommentsResponse>(url)
      const commentsData: PaginatedComments = data
      if (data.status === 200) {
        setChildComments(parentId, commentsData)
        setShowMoreClicked(true)
      }

      console.log('Fetched With Show More', data)
    } catch (error) {
      console.error('Error fetching child comments:', error)
    }
  }

  const handleShowLess = (parentId: number | null) => {
    showLess(String(parentId))
    setShowMoreClicked(false)
  }

  const handleUpdateClick = () => {
    const post = postData.data
    navigate(`/posts/update/${id}`, { state: { post } })
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
      {postData.data?.user.id === user?.id && (
        <Box display={'flex'} justifyContent={'center'}>
          <Button
            variant='outlined'
            sx={{ mt: 2, mb: 2 }}
            onClick={handleUpdateClick}
          >
            Edit
          </Button>
        </Box>
      )}
      {postData.data?.imageUrl && (
        <CardMedia
          component='img'
          height={340}
          image={postData.data?.imageUrl}
        />
      )}
      <CardContent>
        <Typography variant='body1'>{postData.data?.body}</Typography>
      </CardContent>
      <Divider />
      {user ? (
        <form onSubmit={handleSubmit(handleAddComment)}>
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
          {comments['null']?.data.map((comment, index) => (
            <CommentComponent
              key={`${index}_${comment.comment_id}`}
              comment={comment}
              isLoggedIn={user ? true : false}
              postId={postData.data?.id}
              createdBy={comment.userId}
              parentId={null}
            />
          ))}
        </List>
        <Stack spacing={2} direction='row' display='flex'>
          {comments['null'].totalCommentsCount > 5 &&
          comments['null'].data.length != 0 &&
          comments['null'].data.length !=
            comments['null'].totalCommentsCount ? (
            <Button
              sx={{ alignSelf: 'flex-start' }}
              onClick={() =>
                handleShowMore(
                  null,
                  comments['null'].pageNumber + 1,
                  comments['null'].pageSize
                )
              }
            >
              Show More Comments{' '}
            </Button>
          ) : null}
          {showMoreClicked ? (
            <Button
              sx={{ alignSelf: 'flex-end' }}
              onClick={() => handleShowLess(null)}
            >
              Show Less
            </Button>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  )
}
