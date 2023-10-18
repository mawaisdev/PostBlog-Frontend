import { Button, Paper, TextField, Box, Typography } from '@mui/material'
import { UseFormReturn, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginData, loginSchema } from '../Types/Schema/LoginSchema'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LoadingSnackbarComponent from '../Components/LoadingSnackbar'
import { loginUser } from '../Helper/authHelpers'
import { AxiosError } from 'axios'
import { useAuth } from '../Hooks/useAuth'

function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const { setAuthState } = useAuth() // Get the setAuthState from your context
  const navigate = useNavigate() // Get the navigate function from react-router

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<loginData> = useForm<loginData>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: loginData): Promise<void> => {
    setIsSubmitting(true)
    setMessage('Logging in...')
    try {
      const { userData, token, errors, status } = await loginUser(data)
      console.log({ userData }, { token }, { errors }, { status })

      if (status === 201) {
        if (token && userData) {
          setAuthState({
            token,
            user: userData,
          })
          navigate('/dashboard')
          setIsSubmitting(false)
          setMessage('')
        }
      }
    } catch (error: AxiosError | any) {
      if (!error.response) {
        setMessage('No Server Response')
        setTimeout(() => {
          setIsSubmitting(false)
          setMessage('')
        }, 2000)
      } else {
        if (
          error?.response?.data?.status === 401 ||
          error?.response?.data?.status === 400
        ) {
          setMessage('Invalid Credentials')
          setTimeout(() => {
            setIsSubmitting(false)
            setMessage('')
          }, 2000)
        } else {
          setMessage('Login Failed')
          setTimeout(() => {
            setIsSubmitting(false)
            setMessage('')
          }, 2000)
        }
      }
    }
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
            autoComplete='off'
            autoFocus
            required
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
            autoComplete='off'
            required
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
          <Link to='#' style={{ textDecoration: 'none' }}>
            <Typography variant='body2'>Forgot password?</Typography>
          </Link>
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <Typography variant='body2'>Create a new account</Typography>
          </Link>
        </Box>
        <LoadingSnackbarComponent
          isSubmitting={isSubmitting}
          message={message}
        />
      </Paper>
    </Box>
  )
}

export default LoginPage
