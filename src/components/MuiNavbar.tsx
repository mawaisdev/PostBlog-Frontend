import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { CatchingPokemon } from '@mui/icons-material'

export const MuiNavbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <CatchingPokemon />
        </IconButton>
        <Typography variant='h6' component={'div'} sx={{ flexGrow: 1 }}>
          Pokemon
        </Typography>
        <Stack spacing={2} direction={'row'}>
          <Button color='inherit'>Features</Button>
          <Button color='inherit'>Pricing</Button>
          <Button color='inherit'>About</Button>
          <Button color='inherit'>Login</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
