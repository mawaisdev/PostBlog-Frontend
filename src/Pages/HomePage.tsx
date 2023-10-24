import { Button, Container, Stack } from '@mui/material'
import { useAuth } from '../Hooks/useAuth'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  const { user, persistState, token } = useAuth()

  return (
    <Container sx={{ mt: '2 rem' }}>
      <Stack direction={'row'} spacing={4} mb={4}>
        User: {user?.userName} || Email: {user?.email} || Roles: {user?.roles}{' '}
        || Token: {token ? 'Yes' : 'No'} || || Remember Me:
        {persistState ? 'Yes' : 'No'}
      </Stack>
      <Button variant='outlined'>
        <Link
          to='/category'
          style={{ color: 'primary', textDecoration: 'none' }}
        >
          Category
        </Link>
      </Button>
      <Button variant='outlined'>
        <Link to='/' style={{ color: 'primary', textDecoration: 'none' }}>
          Posts
        </Link>
      </Button>
    </Container>
  )
}
