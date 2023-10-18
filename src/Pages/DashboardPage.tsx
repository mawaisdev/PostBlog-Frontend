import { Button, Container, Stack } from '@mui/material'
import { useAuth } from '../Hooks/useAuth'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  const { user } = useAuth()
  return (
    <Container>
      <Stack direction={'row'} spacing={4} mb={4}>
        User: {user?.userName} || Email: {user?.email} || Roles: {user?.roles}
      </Stack>
      <Button variant='outlined'>
        <Link to='/login' style={{ color: 'primary', textDecoration: 'none' }}>
          Login
        </Link>
      </Button>
      <Button variant='outlined'>
        <Link to='/signup' style={{ color: 'primary', textDecoration: 'none' }}>
          Signup
        </Link>
      </Button>
    </Container>
  )
}
