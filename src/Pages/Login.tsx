import { Button, Paper, TextField, Link, Box, Typography } from '@mui/material'

function LoginPage() {
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
          name='password'
          label='Password'
          type='password'
          id='password'
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          style={{ margin: '24px 0' }}
        >
          Login
        </Button>
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
