import React from 'react'
import { IPost } from '../Types/Responses/Post/PostByIdResponse'
import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'

interface IMainPostProps {
  post: IPost
}

export const MainPost = React.memo(({ post }: IMainPostProps) => {
  return (
    <Card elevation={3}>
      <Stack direction='row' justifyContent='space-between'>
        <CardHeader title={post.title} />
        <Typography variant='subtitle2' color='textSecondary'>
          {post.createdAt}
        </Typography>
      </Stack>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  )
})
