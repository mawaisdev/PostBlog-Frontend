import { Box, Stack, Divider, Grid } from '@mui/material'

export const MuiLayout = () => {
  return (
    <>
      <Stack
        sx={{ border: '1px solid' }}
        direction={'row'}
        spacing={2}
        divider={<Divider orientation='vertical' flexItem />}
      >
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
      </Stack>

      <Grid container my={4} rowSpacing={2} columnSpacing={1}>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor={'primary.dark'} p={2}>
            Item 1
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor={'primary.light'} p={2}>
            Item 2
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor={'primary.light'} p={2}>
            Item 3
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor={'primary.dark'} p={2}>
            Item 4
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
