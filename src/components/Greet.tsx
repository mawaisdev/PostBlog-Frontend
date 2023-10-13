import { Box } from '@mui/material'
import { GreetProps } from './PropTypes/GreetProps'

export function Greet({ name, count, isLoggedIn }: GreetProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid black',
        }}
      >
        {isLoggedIn
          ? `Hello ${name}. You have ${count} Unread Mails.`
          : `Hello. Please Login.`}
      </Box>
    </Box>
  )
}
