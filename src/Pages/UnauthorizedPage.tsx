import { Container, Box, Paper, Typography } from '@mui/material'

const UnauthorizedPage = () => {
  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Paper elevation={3} style={{ padding: '24px', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h4' gutterBottom>
              403
            </Typography>
            <Typography component='h2' variant='h5'>
              Unauthorized Access
            </Typography>
            <Box mt={3}>
              <Typography variant='body1' align='center'>
                Sorry, you do not have permission to access this page. Please
                check your credentials or contact the administrator for
                assistance.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default UnauthorizedPage
