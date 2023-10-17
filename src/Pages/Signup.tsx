import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Paper,
  Grid,
} from '@mui/material'

function SignUpPage() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Paper elevation={3} style={{ padding: '24px', width: '500px' }}>
        <Typography variant='h5' gutterBottom>
          Sign Up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='firstName'
              label='First Name'
              name='firstName'
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
            />
          </Grid>
        </Grid>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='userName'
          label='Username'
          name='userName'
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='email'
          label='Email Address'
          name='email'
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          id='confirmPassword'
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          style={{ margin: '24px 0' }}
        >
          Sign Up
        </Button>
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
