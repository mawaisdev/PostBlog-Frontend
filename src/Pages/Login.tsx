import { Button, Paper, TextField, Link, Box, Typography } from '@mui/material'
import { UseFormReturn, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginData, loginSchema } from '../Types/Schema/LoginSchema'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<loginData> = useForm<loginData>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = (data: loginData) => {
    // Handle login logic here
    console.log(data)
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Paper elevation={3} style={{ padding: '24px' }}>
        <Typography variant='h5' gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='userName'
            label='Username'
            {...register('userName')}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Password'
            type='password'
            id='password'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            style={{ margin: '24px 0' }}
            type='submit'
          >
            Login
          </Button>
        </form>
        <Box display='flex' justifyContent='space-between'>
          <Link href='#' variant='body2'>
            Forgot password?
          </Link>
          <Link href='/signup' variant='body2'>
            Create a new account
          </Link>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage
