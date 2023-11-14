import { Box, Grid, Pagination, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from '../Api/axios'
import { GetAllPostsResponse } from '../Types/Responses/Post/GetAllPostsResponse'
import { PostCard } from '../Components/PostCard'
import { AxiosError } from 'axios'
import { useComments } from '../Contexts/CommentsContext'
const PostsPage = () => {
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
      {allPosts?.data && allPosts.data.length > 0 ? (
        <Grid container spacing={1} marginTop={2}>
          {allPosts.data.map((post) => (
            <Grid item xs={12} sm={4} md={3} lg={3} xl={3} key={post.id}>
              <PostCard {...post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display='flex' justifyContent='center' marginTop={4}>
          <Typography variant='h5'>No Posts Yet</Typography>
        </Box>
      )}

      {allPosts && allPosts.data.length > 0 && (
        <Box display='flex' justifyContent='center' marginTop={4}>
          <div id='paginationSection'>
            <Pagination
              count={Math.max(
                1,
                Math.ceil(allPosts.totalPostsCount / pageSize)
              )}
              page={page}
              onChange={(_, value) => setPage(value)}
            />
          </div>
        </Box>
      )}
    </>
  )
}

export default PostsPage
