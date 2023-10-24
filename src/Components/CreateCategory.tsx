import { UseFormReturn, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
} from '@mui/material'
import { categoryData, categorySchema } from '../Types/Schema/CategorySchema'
import { useState } from 'react'
import { ResponsiveCircularProgress } from './ResponsiveCircularProgress'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import { AxiosError } from 'axios'

export const CreateCategory = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  // Fetch axiosPrivate instance here
  const axiosPrivate = useAxiosPrivate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<categoryData> = useForm<categoryData>({
    resolver: yupResolver(categorySchema),
  })

  // Define your submission logic (for instance, you could send the category to an API)
  const onSubmit = async (data: categoryData): Promise<void> => {
    console.log({ data })
    // Your submit logic here
    setIsSubmitting(true)

    try {
      const response = await axiosPrivate.post('/categories', data)
      console.log({ response })

      if (response.status === 201) {
        console.log('Category created successfully!')
        setMessage('Category created successfully!')
        setOpen(true)
      }
    } catch (error: AxiosError | any) {
      if (error.response) {
        console.log(error.response.data)
        setMessage('Category creation failed!')
        setOpen(true)
      } else console.log(error.message)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setOpen(false)
      }, 4000)
    }
  }

  return isSubmitting ? (
    <ResponsiveCircularProgress />
  ) : (
    <>
      <Typography
        variant="h6"
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
          label="Category Name"
          variant="outlined"
          fullWidth
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          autoComplete="off"
          autoFocus
          required
        />

        <TextField
          sx={{ mt: 2 }}
          label="Category Description"
          variant="outlined"
          fullWidth
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          autoComplete="off"
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
            variant="outlined"
            size="large"
            sx={{ width: { xs: '80%', md: '30vw' }, height: '7vh' }}
            color="primary"
            type="submit"
          >
            Create Category
          </Button>
        </Box>
      </form>
      <Snackbar autoHideDuration={3000} open={open}>
        <SnackbarContent sx={{ backgroundColor: 'green' }} message={message} />
      </Snackbar>
    </>
  )
}
