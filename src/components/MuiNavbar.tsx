import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material'
import { CatchingPokemon, KeyboardArrowDown } from '@mui/icons-material'
import { useState } from 'react'

export const MuiNavbar = () => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorElement)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorElement(null)
  }
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
          <Button
            color='inherit'
            id='resources-button'
            onClick={handleClick}
            aria-controls={open ? 'resources-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            endIcon={<KeyboardArrowDown />}
          >
            Resources
          </Button>
          <Button color='inherit'>Login</Button>
        </Stack>

        <Menu
          id='resources-menu'
          anchorEl={anchorElement}
          open={open}
          MenuListProps={{
            'aria-labelledby': 'resources-button',
          }}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>Podcast</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
