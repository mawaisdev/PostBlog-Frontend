import { NavigateNext } from '@mui/icons-material'
import { Box, Breadcrumbs, Typography, Link } from '@mui/material'

export const MuiBreadcrumb = () => {
  return (
    <Box m={2}>
      <Breadcrumbs
        aria-label='breadcrumb'
        separator={<NavigateNext fontSize='small' />}
        maxItems={2}
        itemsAfterCollapse={2}
        itemsBeforeCollapse={2}
      >
        <Link underline='hover' href='#'>
          Home
        </Link>
        <Link underline='hover' href='#'>
          Catalog
        </Link>
        <Link underline='hover' href='#'>
          Accessories
        </Link>
        <Link underline='hover' href='#'>
          Profile
        </Link>
        <Link underline='hover' href='#'>
          Update Password
        </Link>

        <Typography color={'text.primary'}>Shoes</Typography>
      </Breadcrumbs>
    </Box>
  )
}
