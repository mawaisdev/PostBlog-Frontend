import React, { useState } from 'react'
import { Button, Paper, TextField, Link, Box, Typography } from '@mui/material'

function LoginPage() {
  const [credentials, setCredentials] = useState({
    userName: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(typeof event)
    const { name, value } = event.target
    setCredentials((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleLogin = () => {
    if (
      credentials.userName === 'waqas9' &&
      credentials.password === 'Waqas123'
    ) {
      console.log('Successfully logged in!')
    } else {
      console.log('Invalid credentials')
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
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='userName'
          label='Username'
          name='userName'
          value={credentials.userName}
          onChange={handleChange}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          value={credentials.password}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          style={{ margin: '24px 0' }}
          onClick={handleLogin}
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
