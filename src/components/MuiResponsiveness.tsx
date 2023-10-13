import { Box, styled } from '@mui/material'

const StyledBox = styled(Box)(({ theme }) => ({
  height: '250px',
  width: '250px',
  backgroundColor: theme.palette.neutral?.darker,
}))

export const MuiResponsiveness = () => {
  return (
    <>
      <Box
        sx={{
          height: '300px',
          width: {
            xs: 100, // 0
            sm: 200, // 600
            md: 300, // 900
            lg: 400, // 1200
            xl: 500, // 1536
          },
          bgcolor: 'secondary.main',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Box
      </Box>

      <StyledBox
        sx={{
          height: '300px',
          width: {
            xs: 100, // 0
            sm: 200, // 600
            md: 300, // 900
            lg: 400, // 1200
            xl: 500, // 1536
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Box
      </StyledBox>
    </>
  )
}
