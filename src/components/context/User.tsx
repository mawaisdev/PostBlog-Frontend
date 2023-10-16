import { Button, Stack, Box } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from './UserContext'

export const User = () => {
  const userContext = useContext(UserContext)
  const handleLogin = () => {
    if (userContext) {
      userContext.setUser({
        name: 'Muhammad Awais',
        email: 'm.awaiszafar123@gmail.com',
      })
    }
  }
  const handleLogout = () => {
    if (userContext) {
      userContext.setUser(null)
    }
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction={'row'}>
        <Button variant={'contained'} onClick={handleLogin}>
          Login
        </Button>
        <Button variant={'contained'} onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      {userContext && userContext.user ? (
        <Stack spacing={2} direction={'row'}>
          <Box>User Name: {userContext?.user?.name}</Box>
          <Box>User Email: {userContext?.user?.email}</Box>
        </Stack>
      ) : (
        <Box>Log In</Box>
      )}
    </Stack>
  )
}
