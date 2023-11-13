import { Box, Grid, Pagination, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { GetAllPostsResponse } from '../Types/Responses/Post/GetAllPostsResponse'
import { PostCard } from '../Components/PostCard'

const MyPostsPage = () => {
  const [allPosts, setAllPosts] = useState<GetAllPostsResponse>()
  const [page, setPage] = useState(1)
  const pageSize = 10
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true
    const conntroller = new AbortController()

    const getAllUserPosts = async () => {
      try {
        const { data } = await axiosPrivate.get<GetAllPostsResponse>(
          '/myposts',
          {
            signal: conntroller.signal,
          }
        )

        if (isMounted && data.data.length != 0) {
          setAllPosts(data)
        }
      } catch (error: AxiosError | any) {
        console.log('error', error)
      }
    }
    getAllUserPosts()

    return () => {
      isMounted = false
      conntroller.abort()
    }
  }, [])

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
          <Typography variant='h5'>You have not posted yet.</Typography>
        </Box>
      )}

      {allPosts?.totalPostsCount && (
        <Box display='flex' justifyContent='center' marginTop={4}>
          <Pagination
            count={Math.ceil(allPosts.totalPostsCount / pageSize)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      )}
    </>
  )
}

export default MyPostsPage
