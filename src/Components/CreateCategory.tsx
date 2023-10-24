import { UseFormReturn, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import { categoryData, categorySchema } from '../Types/Schema/CategorySchema'
import { useState } from 'react'
import { ResponsiveCircularProgress } from './ResponsiveCircularProgress'

export const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<categoryData> = useForm<categoryData>({
    resolver: yupResolver(categorySchema),
  })

  // Define your submission logic (for instance, you could send the category to an API)
  const onSubmit = async (data: categoryData): Promise<void> => {
    console.log(data)
    // Your submit logic here
  }
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  return isSubmitting ? (
    <ResponsiveCircularProgress />
  ) : (
    <>
      <Typography
        variant='h5'
        sx={{
          alignSelf: 'center',
          width: { xs: '60%', md: '20vh' },
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
            sx={{ width: { xs: '80%', md: '30vh' }, height: '5vh' }}
            color='primary'
            type='submit'
          >
            Create Category
          </Button>
        </Box>
      </form>
    </>
  )
}
