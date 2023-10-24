// import { useEffect, useState } from 'react'
// import { Container } from '@mui/material'
// import { Category } from '../Types/Responses/Category/Category'
// import { CategoryAllResponse } from '../Types/Responses/Category/CategoryAll'
// import { AxiosError } from 'axios'
// import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
// import MemoizedCategoryTable from '../Components/TableComponent'

// const Categories = () => {
//   const axiosPrivate = useAxiosPrivate()
//   const [categories, setCategories] = useState<Category[]>([]) // sample categories array

//   useEffect(() => {
//     let isMounted = true
//     const controller = new AbortController()

//     const getCategories = async () => {
//       try {
//         const { data } = await axiosPrivate.get<CategoryAllResponse>(
//           '/category',
//           {
//             signal: controller.signal,
//             withCredentials: true,
//           }
//         )
//         isMounted && setCategories(data.data)
//       } catch (error: AxiosError | any) {}
//     }

//     getCategories()

//     return () => {
//       isMounted = false
//       controller.abort()
//     }
//   }, [])

//   const headings = ['ID', 'Name', 'Description']

//   const handleUpdate = (category: Category) => {
//     console.log('Update category with ID:', category)
//   }

//   const handleDelete = (category: Category) => {
//     console.log('Delete category with ID:', category)
//   }
//   return (
//     <Container sx={{ mt: 1, display: 'flex' }}>
//       <MemoizedCategoryTable
//         categories={categories}
//         headings={headings}
//         actions={{ onUpdate: handleUpdate, onDelete: handleDelete }}
//       />
//     </Container>
//   )
// }

// export { Categories }import React from 'react';
import { Grid, Paper, TextField, Button, Typography, Box } from '@mui/material'

const Categories = () => {
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
            <Typography
              variant='h5'
              sx={{
                alignSelf: 'center',
                width: { xs: '60%', md: '20vh' },
                height: '5vh',
                textAlign: 'center',
              }}
            >
              Create Category
            </Typography>

            <TextField label='Category Name' variant='outlined' fullWidth />
            <TextField
              label='Category Description'
              variant='outlined'
              fullWidth
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mt: 2,
              }}
            >
              <Button
                variant='outlined'
                size='large'
                sx={{
                  width: { xs: '80%', md: '30vh' },
                  height: '5vh',
                }}
                color='primary'
              >
                Create Category
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Second Row - Dark-colored box */}
      <Grid item xs={12}>
        <Paper
          sx={{
            height: { xs: '30vh', md: '50vh' }, // Adjust height for different screen sizes
            backgroundColor: 'grey.800',
          }}
        >
          {/* Empty Dark Colored Box */}
        </Paper>
      </Grid>
    </Grid>
  )
}

export { Categories }
