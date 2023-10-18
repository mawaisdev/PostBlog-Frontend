import { Box, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <Container>
      <Box>Home</Box>
      <Button variant='outlined' onClick={handleClick}>
        Go Back
      </Button>
    </Container>
  )
}
