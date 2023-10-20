// import { Box, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Container } from '@mui/material'
// import Navbar from '../Components/Navbar'

export const Home = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }
  return (
    <Container>
      <Box>Home</Box>
      <Button onClick={handleClick} variant='outlined'>
        Go Back
      </Button>
    </Container>
  )
}
