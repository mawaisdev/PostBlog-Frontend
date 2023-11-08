import { Button, TextField, Box, Typography, Paper, Grid } from '@mui/material'
import { useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignupData, SignupSchema } from '../Types/Schema/SignupSchema'
import LoadingSnackbarComponent from '../Components/LoadingSnackbar'
import { useState } from 'react'
import { signupUser } from '../Helper/authHelpers'
import { useAuth } from '../Hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

const SignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const { setAuthState } = useAuth() // Get the setAuthState from your context
  const navigate = useNavigate() // Get the navigate function from react-router

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<SignupData> = useForm<SignupData>({
    resolver: yupResolver(SignupSchema),
  })

  const onSubmit = async (data: SignupData): Promise<void> => {
    setIsSubmitting(true)
    setMessage('Signing up...')
    try {
      const { userData, token, errors, status } = await signupUser(data)

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
      } else if (status === 400) {
        // Handle errors (e.g., show a message to the user)
        setMessage(errors[0])
        setTimeout(() => {
          setIsSubmitting(false)
          setMessage('')
        }, 10000)
      } else throw Error('Server Unable To Reach')
    } catch (error: AxiosError | any) {
      if (!error.response) {
        setMessage('No Server Response')
        setTimeout(() => {
          setIsSubmitting(false)
          setMessage('')
        }, 2000)
      }
      if (error?.response?.data?.status === 409) {
        setMessage('Username or Email already exists')
        setTimeout(() => {
          setIsSubmitting(false)
          setMessage('')
        }, 2000)
      } else if (error?.response?.data?.status === 500) {
        setMessage('Server Error')
      } else {
        setMessage('Registration Failed')
        setTimeout(() => {
          setIsSubmitting(false)
          setMessage('')
        }, 2000)
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
      <Paper elevation={3} style={{ padding: '24px', width: '500px' }}>
        <Typography variant='h4' gutterBottom align='center'>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin='normal'
                fullWidth
                id='firstName'
                label='First Name'
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                autoFocus
                autoComplete='off'
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin='normal'
                fullWidth
                id='lastName'
                label='Last Name'
                {...register('lastName')}
                autoComplete='off'
              />
            </Grid>
          </Grid>
          <TextField
            margin='normal'
            fullWidth
            id='userName'
            label='Username'
            {...register('userName')}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            autoComplete='off'
            required
          />
          <TextField
            margin='normal'
            fullWidth
            id='email1'
            label='Email'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete='off'
            required
          />
          <TextField
            margin='normal'
            fullWidth
            id='password'
            label='Password'
            type='password'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete='off'
            required
          />
          <TextField
            margin='normal'
            fullWidth
            id='confirmPassword'
            label='Confirm Password'
            type='password'
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
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
            Sign Up
          </Button>
        </form>
        <Box textAlign='center'>
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <Typography variant='body2'>Already have an account?</Typography>
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

export default SignUpPage
