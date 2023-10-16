import { useState } from 'react'
import { AuthUser } from '../PropTypes/AuthUserProps'
import { Button, Stack } from '@mui/material'

export const User = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const handleLogin = () => {
    setUser({
      name: 'Muhammad Awais',
      email: 'm.awaiszafar123@gmail.com',
    })
  }
  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div>
      <Stack direction={'row'} spacing={2}>
        <Button variant={'contained'} onClick={handleLogin}>
          Login
        </Button>
        <Button variant={'contained'} onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      <div style={{ marginTop: '1rem' }}>
        {user ? (
          <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        ) : (
          'User Logged Out'
        )}
      </div>
    </div>
  )
}
