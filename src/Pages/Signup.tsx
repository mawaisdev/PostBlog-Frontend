import React, { useState } from 'react'
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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSignUp = () => {
    // Client-side confirmPassword validation
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords don't match!")
      return
    }
    // Remove confirmPassword before sending to the server
    const { confirmPassword, ...dataToSend } = formData

    // TODO: Send dataToSend to the server for signup
    console.log(dataToSend)
  }

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
              value={formData.firstName}
              onChange={handleChange}
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
              value={formData.lastName}
              onChange={handleChange}
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
          value={formData.userName}
          onChange={handleChange}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          value={formData.email}
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
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          id='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          style={{ margin: '24px 0' }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Box textAlign='center'>
          <Link href='login' variant='body2'>
            Already have an account?
          </Link>
        </Box>
      </Paper>
    </Box>
  )
}

export default SignUpPage
