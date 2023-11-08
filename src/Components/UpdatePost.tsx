import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { UpdatePostType, Post } from '../Types/Responses/Post/PostByIdResponse'
import { Textarea } from '@mui/joy'
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useForm, UseFormReturn } from 'react-hook-form'
import { UpdatePostResponse } from '../Types/Responses/Post/PostByIdResponse'
import { useEffect, useState } from 'react'
import { Category } from '../Types/Responses/Category/Category'
import { CategoryAllResponse } from '../Types/Responses/Category/CategoryAll'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import { ImageUpload } from './ImageUpload'
import { ResponsiveCircularProgress } from './ResponsiveCircularProgress'
import axios from 'axios'

export const UpdatePost = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const post: Post = state.post
  const [file, setFile] = useState<File | null>(null)
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const axiosPrivate = useAxiosPrivate()
  const [isCreating, setIsCreating] = useState(false)
  const navigate = useNavigate()

  const { register, reset, handleSubmit }: UseFormReturn<UpdatePostType> =
    useForm<UpdatePostType>({
      defaultValues: {
        title: post.title,
        body: post.body,
        isDraft: post.isDraft,
        isPrivate: post.isPrivate,
        categoryId: post.category.id,
      },
    })

  const dataForUpdate = async (postData: UpdatePostType) => {
    if (post.imageUrl && post.imageUrl != '' && !file) {
      const imageUrl = post.imageUrl
      return { ...postData, imageUrl }
    } else if (file) {
      const imageUrl = await handleImageUpload()
      return { ...postData, imageUrl }
    }
  }

  const UpdatePost = async (postData: UpdatePostType): Promise<void> => {
    try {
      setIsCreating(true)

      const dataWithImage = await dataForUpdate(postData)

      // Create The Post
      const { data } = await axiosPrivate.patch<UpdatePostResponse>(
        `/posts/${id}`,
        dataWithImage
      )
      if (data.status === 200) {
        console.log(data.data)
        setIsCreating(false)
        navigate(`/posts/${id}`)
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
          const selectedCategoryFromDb = data.data.find(
            (c) => c.id == post.category.id
          )
          if (selectedCategoryFromDb)
            setSelectedCategory(selectedCategoryFromDb.id)
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
        <form onSubmit={handleSubmit(UpdatePost)}>
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
              {post.imageUrl && post.imageUrl != '' && !file && (
                <Box
                  sx={{
                    width: 'full',
                    height: '50%',
                    mt: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Stack direction='column' spacing={2}>
                    <Typography variant='h3'>Previous Image</Typography>
                    <img src={post.imageUrl} alt='Post Cover' />
                  </Stack>
                </Box>
              )}
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
              Update
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  )
}
