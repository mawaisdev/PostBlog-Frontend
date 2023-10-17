import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Paper,
  Grid,
} from '@mui/material'
import { useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignupData, SignupSchema } from '../Types/Schema/SignupSchema'

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<SignupData> = useForm<SignupData>({
    resolver: yupResolver(SignupSchema),
  })

  const onSubmit = async (data: SignupData): Promise<void> => {}

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
                autoComplete='firstName'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin='normal'
                fullWidth
                id='lastName'
                label='Last Name'
                {...register('lastName')}
                autoFocus
                autoComplete='lastName'
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
            autoFocus
            autoComplete='username'
          />
          <TextField
            margin='normal'
            fullWidth
            id='email1'
            label='Email'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoFocus
            autoComplete='email'
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
            autoFocus
            autoComplete='password'
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
            autoFocus
            autoComplete='confirmPassword'
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
          <Link href='/login' variant='body2'>
            Already have an account?
          </Link>
        </Box>
      </Paper>
    </Box>
  )
}

export default SignUpPage
