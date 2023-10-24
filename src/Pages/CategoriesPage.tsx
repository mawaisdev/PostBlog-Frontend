import { Grid, Paper } from '@mui/material'
import { CreateCategory } from '../Components/CreateCategory'

export const CategoriesPage = () => {
  return (
    <Grid container spacing={2} sx={{ minWidth: '440px' }}>
      {/* First Row */}
      <Grid container item spacing={2} xs={12}>
        {/* Column 1 - Table */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              height: '50vh',
              padding: 2,
            }}
          >
            <div>Your Categories Table Here</div>
          </Paper>
        </Grid>

        {/* Column 2 - Input Fields */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              height: '50vh',
              padding: { xs: 1, md: 2 },
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1, md: 2 },
            }}
          >
            <CreateCategory />
          </Paper>
        </Grid>
      </Grid>

      {/* Second Row - Dark-colored box */}
      <Grid item xs={12}>
        <Paper
          sx={{
            height: { xs: '30vh', md: '40vh' }, // Adjust height for different screen sizes
            backgroundColor: 'grey.700',
          }}
        >
          {/* Empty Dark Colored Box */}
        </Paper>
      </Grid>
    </Grid>
  )
}
