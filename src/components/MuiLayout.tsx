import { Box } from '@mui/material'

export const MuiLayout = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'whitesmoke',
          height: '100px',
          width: '100px',
          padding: '16px',
          '&:hover': {
            backgroundColor: 'primary.light',
          },
        }}
      >
        Hello
      </Box>

      <Box
        display={'flex'}
        height={'100px'}
        width={'100px'}
        bgcolor='success.light'
        p={2}
      ></Box>
    </>
  )
}
