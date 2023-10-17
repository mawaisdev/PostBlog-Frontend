import React from 'react'
import { Button, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '50vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[100],
}))

const NotFound404: React.FC = () => {
  return (
    <StyledContainer maxWidth='sm'>
      <Typography variant='h1' color='primary' gutterBottom>
        404
      </Typography>
      <Typography variant='h5' gutterBottom align='center'>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant='contained' color='primary' component={Link} to='/'>
        Go Home
      </Button>
    </StyledContainer>
  )
}

export default NotFound404