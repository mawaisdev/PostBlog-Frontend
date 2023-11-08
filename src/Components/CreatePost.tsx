import { Textarea } from '@mui/joy'
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { Category } from '../Types/Responses/Category/Category'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import { CategoryAllResponse } from '../Types/Responses/Category/CategoryAll'
import { ImageUpload } from './ImageUpload'
import { ResponsiveCircularProgress } from './ResponsiveCircularProgress'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CreatePostResponse,
  CreatePostType,
} from '../Types/Responses/Post/PostByIdResponse'

export const CreatePost = () => {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [isCreating, setIsCreating] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const axiosPrivate = useAxiosPrivate()
  const { register, reset, handleSubmit }: UseFormReturn<CreatePostType> =
    useForm<CreatePostType>()

  const navigate = useNavigate()

  const createPost = async (post: CreatePostType): Promise<void> => {
    try {
      setIsCreating(true)
      // Upload The Image and Get the Url
      const imageUrl = await handleImageUpload()
      const dataWithImage = { ...post, imageUrl }

      // Create The Post
      const { data } = await axiosPrivate.post<CreatePostResponse>(
        '/posts',
        dataWithImage
      )
      if (data.status === 201) {
        console.log(data.data)
        setIsCreating(false)
        navigate(`/posts/${data.data.id}`)
        reset()
      }
    } catch (error) {
    } finally {
      setIsCreating(false)
    }
  }

  const handleImageUpload = async (): Promise<string> => {
    if (file && file.type.startsWith('image')) {
      const form = new FormData()
      form.append('file', file)
      form.append('cloud_name', 'dzkmx4gd1')
      form.append('upload_preset', 'pmsm75fi')

      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/dzkmx4gd1/image/upload',
        form
      )

      return data.secure_url
    } else return ''
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getCategories = async () => {
      try {
        setIsCreating(true)
        const { data } = await axiosPrivate.get<CategoryAllResponse>(
          '/category',
          {
            signal: controller.signal,
          }
        )

        if (isMounted && data.status === 200) {
          console.log('Fetched Categories: ', data.data)
          setCategories(data.data)
          setIsCreating(false)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getCategories()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  if (isCreating) return <ResponsiveCircularProgress />
  return (
    <Card variant='outlined' sx={{ maxWidth: 600, margin: 'auto', mt: '3rem' }}>
      <CardContent>
        <form onSubmit={handleSubmit(createPost)}>
          <Stack direction='column' spacing={2}>
            <TextField
              label='Select Category'
              fullWidth
              select
              value={selectedCategory}
              {...register('categoryId')}
              onChange={(event) =>
                setSelectedCategory(Number(event.target.value))
              }
            >
              <MenuItem value={0}>Select a Category</MenuItem>
              {categories?.map((c) => {
                return (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                )
              })}
            </TextField>
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

            <Stack
              direction={'row'}
              spacing={2}
              display={'flex'}
              justifyContent={'space-around'}
            >
              <label>
                <input type='checkbox' {...register('isDraft')} /> Draft
              </label>
              <label>
                <input type='checkbox' {...register('isPrivate')} /> Private
              </label>
            </Stack>
            <Box>
              <ImageUpload setFile={setFile} file={file} />
              {file && !file.type.startsWith('image') && (
                <Box display={'flex'} justifyContent={'center'}>
                  <span>Select Valid Image</span>
                </Box>
              )}
            </Box>
            <Button
              variant='contained'
              type='submit'
              sx={{ mt: '1rem' }}
              disabled={selectedCategory != 0 ? false : true}
            >
              Create
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  )
}
