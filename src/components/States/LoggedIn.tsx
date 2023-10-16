import { Button, Stack } from '@mui/material'
import { useState } from 'react'

export const LoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = () => {
    setLoggedIn(true)
  }
  const handleLogout = () => {
    setLoggedIn(false)
  }

  return (
    <div>
      <Stack spacing={2} direction={'row'}>
        <Button variant='contained' onClick={handleLogout}>
          Logout
        </Button>
        <Button variant='contained' onClick={handleLogin}>
          Login
        </Button>
      </Stack>
      <div style={{ marginTop: '1rem' }}>
        User is {loggedIn ? 'loggedIn' : 'loggedOut'}
      </div>
    </div>
  )
}
