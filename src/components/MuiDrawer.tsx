import { Drawer, Box, Typography, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useState } from 'react'

export const MuiDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='logo'
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </IconButton>
      <Drawer anchor='left' open={isOpen} onClose={() => setIsOpen(false)}>
        <Box p={2} width={'250px'} textAlign={'center'} role='presentation'>
          <Typography variant='h6' component='div'>
            Drawer
          </Typography>
        </Box>
      </Drawer>
    </>
  )
}
