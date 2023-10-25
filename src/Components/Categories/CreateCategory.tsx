import { UseFormReturn, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import { categoryData, categorySchema } from '../../Types/Schema/CategorySchema'
import { useState } from 'react'
import { ResponsiveCircularProgress } from '../ResponsiveCircularProgress'
import { useAxiosPrivate } from '../../Hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { CreateCategoryType } from '../../Types/Responses/Category/CreateCategory'
import { useCategories } from '../../Contexts/CategoryContext'
import { Category } from '../../Types/Responses/Category/Category'

export const CreateCategory = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string | undefined>(undefined)
  // Fetch axiosPrivate instance here
  const axiosPrivate = useAxiosPrivate()
  const { setCategories } = useCategories()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  }: UseFormReturn<categoryData> = useForm<categoryData>({
    resolver: yupResolver(categorySchema),
  })

  // Define your submission logic (for instance, you could send the category to an API)
  const onSubmit = async (data: categoryData): Promise<void> => {
    setIsSubmitting(true)
    data.name = data.name.trim()
    data.description = data.description?.trim()

    try {
      const { data: response } = await axiosPrivate.post<CreateCategoryType>(
        '/category',
        data
      )

      if (response.status === 201 && response.data) {
        const category: Category = response.data

        // Append the new category to the categories state
        setCategories((prevCategories) => [...prevCategories, category])

        setMessage(response.response)
        setSuccess(true)
        reset()
      }
    } catch (error: AxiosError | any) {
      if (error.response) {
        console.log(error.response)
        setMessage(error.response.data.response)
        setSuccess(false)
      }
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setMessage(undefined)
      }, 2000)
    }
  }

  return isSubmitting ? (
    <ResponsiveCircularProgress />
  ) : (
    <>
      <Typography
        variant='h6'
        sx={{
          alignSelf: 'center',
          mt: 2,
          width: { xs: '60%', md: '30vw' },
          height: '5vh',
          textAlign: 'center',
        }}
      >
        Create Category
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Category Name'
          variant='outlined'
          fullWidth
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          autoComplete='off'
          autoFocus
          required
        />
        <TextField
          sx={{ mt: 2 }}
          label='Category Description'
          variant='outlined'
          fullWidth
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          autoComplete='off'
          autoFocus
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: 2,
          }}
        >
          <Button
            variant='outlined'
            size='large'
            sx={{ width: { xs: '80%', md: '30vw' }, height: '7vh' }}
            color='primary'
            type='submit'
          >
            Create Category
          </Button>
        </Box>
        {message && (
          <Box mt={2} display='flex' justifyContent='center'>
            <Alert
              severity={success ? 'success' : 'error'}
              sx={{
                width: { xs: '100%', sm: '75%', md: '50%' }, // Adjust widths as per requirements
                textAlign: 'center',
              }}
            >
              {message}
            </Alert>
          </Box>
        )}
      </form>
    </>
  )
}
