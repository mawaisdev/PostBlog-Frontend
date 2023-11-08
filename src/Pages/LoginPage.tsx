import {
  Button,
  Paper,
  TextField,
  Box,
  Typography,
  Checkbox,
  Stack,
} from '@mui/material'
import { UseFormReturn, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginData, loginSchema } from '../Types/Schema/LoginSchema'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import LoadingSnackbarComponent from '../Components/LoadingSnackbar'
import { loginUser } from '../Helper/authHelpers'
import { AxiosError } from 'axios'
import { useAuth } from '../Hooks/useAuth'

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const { setAuthState, setPersistState } = useAuth() // Get the setAuthState from your context
  const navigate = useNavigate() // Get the navigate function from react-router
  const location = useLocation() // Get the location object from react-router
  const from = location.state?.from?.pathname || '/dashboard' // Get the previous path from location.state.from.pathname

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
      const { userData, token, status } = await loginUser(data)

      if (status === 201) {
        if (token && userData) {
          // Save the token to local storage regardless of persistState
          localStorage.setItem('authToken', token)
          localStorage.setItem('persistState', JSON.stringify(data.rememberMe))
          setAuthState({
            token,
            user: userData,
          })
          setPersistState(data.rememberMe)
          navigate(from, { replace: true })
        }
      } else {
        setMessage('Login Failed')
      }
    } catch (error: AxiosError | any) {
      if (!error.response) {
        setMessage('No Server Response')
      } else {
        switch (error?.response?.data?.status) {
          case 401:
          case 400:
          case 404:
            setMessage('Invalid Credentials')
            break
          default:
            setMessage('Login Failed')
        }
      }
    } finally {
      setTimeout(() => {
        setIsSubmitting(false)
        setMessage('')
      }, 2000)
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
          {/* <FormControlLabel
            control={<Checkbox {...register('rememberMe')} color='primary' />}
            label='Remember me'
          /> */}
          <Stack direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              {...register('rememberMe')}
              // checked={persistState}
              // onChange={handleChange}
              color='primary'
            />
            <Typography variant='body2'>Remember me</Typography>
          </Stack>
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
