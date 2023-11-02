import { Box, Grid, Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from '../Api/axios'
import { GetAllPostsResponse } from '../Types/Responses/Post/GetAllPostsResponse'
import { PostCard } from '../Components/PostCard'
import { AxiosError } from 'axios'
import { useComments } from '../Contexts/CommentsContext'

export const PostsPage = () => {
  const [allPosts, setAllPosts] = useState<GetAllPostsResponse>()
  const [page, setPage] = useState(1)
  const pageSize = 10
  const { setComments } = useComments()

  useEffect(() => {
    let isMounted = true
    const conntroller = new AbortController()
    const skipValue = (page - 1) * pageSize
    const takeValue = pageSize

    const getAllPosts = async () => {
      try {
        const { data } = await axios.get('/posts', {
          params: {
            skip: skipValue,
            take: takeValue,
          },
          signal: conntroller.signal,
        })
        if (isMounted) {
          setAllPosts(data)
          setComments({})
        }
      } catch (error: AxiosError | any) {
        console.log('error', error)
      }
    }
    getAllPosts()

    return () => {
      isMounted = false
      conntroller.abort()
    }
  }, [page, pageSize])
  return (
    <>
      <Grid container spacing={1} mt={2}>
        {allPosts?.data?.map((post) => (
          <Grid item xs={12} sm={4} md={3} lg={3} xl={3} key={post.id}>
            <PostCard {...post} />
          </Grid>
        ))}
      </Grid>

      <Box display='flex' justifyContent='center' mt={4}>
        <Pagination
          count={Math.ceil(allPosts ? allPosts.totalPostsCount / pageSize : 0)}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </>
  )
}
