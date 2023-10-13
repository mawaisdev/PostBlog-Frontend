import { Box } from '@mui/material'
import { GreetProps } from './PropTypes/GreetProps'

export function Greet(props: GreetProps) {
  console.log({ props })

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid black',
        }}
      >
        Hello {props.name}. You have 10 Unread Mails.
      </Box>
    </Box>
  )
}
