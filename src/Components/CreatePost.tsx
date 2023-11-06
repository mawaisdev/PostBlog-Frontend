import { Textarea } from '@mui/joy'
import { Box, Card, CardContent, Stack, TextField } from '@mui/material'
import { useForm, UseFormReturn } from 'react-hook-form'

export type CreatePostType = {
  title: string
  body: string
  imageUrl: string
  isDraft: boolean
  isPrivate: boolean
  categoryId: number
}

export const CreatePost = () => {
  const { register, reset }: UseFormReturn<CreatePostType> =
    useForm<CreatePostType>({
      defaultValues: {
        title: '',
        body: '',
        imageUrl: '',
        isDraft: true,
        isPrivate: true,
      },
    })

  const handleSubmit = async (data: any): Promise<void> => {
    console.log(data)
    reset()
  }
  return (
    <Card variant='outlined' sx={{ maxWidth: 600, margin: 'auto', mt: '3rem' }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack direction='column' spacing={2}>
            <TextField
              label='Title'
              variant='outlined'
              fullWidth
              {...register('title')}
            />
            <Box mt={'1rem'}>
              <Textarea
                sx={{ width: '100%', height: '30vh' }}
                placeholder='Post Content'
                minRows={25}
                maxRows={25}
                {...register('body')}
              />
            </Box>
          </Stack>
        </form>
      </CardContent>
    </Card>
  )
}
