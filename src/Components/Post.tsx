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
  ListItem,
  Typography,
} from '@mui/material'

// Import your interfaces
import {
  PostByIdResponse,
  Comment,
} from '../Types/Responses/Post/PostByIdResponse'
import { formatDate } from '../Utils/DateFormat'

export const Post = () => {
  const { id } = useParams<{ id: string }>()
  const [postData, setPostData] = useState<PostByIdResponse | null>(null)

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
        }
      } catch (error: AxiosError | any) {
        console.log(error)
      }
    }

    getPost()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [id])

  // If data hasn't been fetched yet, show a loading message.
  if (!postData) {
    return <h2>Loading post...</h2>
  }

  return (
    <Card variant='outlined' style={{ marginTop: 20, marginBottom: 20 }}>
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
      <CardContent>
        <Typography variant='body1'>{postData.data?.body}</Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant='h6'>Comments</Typography>
        <List>
          {postData.data?.comments.map((comment: Comment) => (
            <ListItem key={comment.comment_id}>
              <Typography variant='body2'>{comment.comment_text}</Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
