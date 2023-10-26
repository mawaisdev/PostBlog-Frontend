import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from '../Api/axios'
import { GetAllPostsResponse } from '../Types/Responses/Post/GetAllPostsResponse'
import { PostCard } from '../Components/PostCard'
import { AxiosError } from 'axios'

export const PostsPage = () => {
  const [allPosts, setAllPosts] = useState<GetAllPostsResponse>()

  useEffect(() => {
    let isMounted = true
    const conntroller = new AbortController()
    const getAllPosts = async () => {
      try {
        const { data } = await axios.get('/posts', {
          signal: conntroller.signal,
        })
        isMounted && setAllPosts(data)
      } catch (error: AxiosError | any) {
        console.log('error', error)
      }
    }
    getAllPosts()

    return () => {
      isMounted = false
      conntroller.abort()
    }
  }, [])
  return (
    <Grid container spacing={1} m={2}>
      {allPosts?.data?.map((post) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          xl={2}
          key={post.id}
          style={{ flex: '1 0 auto' }}
        >
          <PostCard {...post} />
        </Grid>
      ))}
    </Grid>
  )
}
