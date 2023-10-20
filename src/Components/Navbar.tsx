// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Button,
//   Box,
// } from '@mui/material'
// import MenuIcon from '@mui/icons-material/Menu'
// import { useAuth } from '../Hooks/useAuth'
// import { useLogout } from '../Hooks/useLogout'
// import { useLocation, useNavigate } from 'react-router-dom'

// function MyAppBar() {
//   const { persistState: loggedIn } = useAuth()
//   const logout = useLogout()
//   const navigate = useNavigate()
//   const location = useLocation()
//   // const loggedIn = localStorage.getItem('persistState')

//   // console.log({ loggedIn }, { token })
//   // console.log(loggedIn === 'true')

//   const handleClick = () => {
//     navigate('/login', { state: { from: location }, replace: true })
//   }
//   return (
//     <AppBar position='sticky' style={{ width: '100%' }}>
//       <Toolbar>
//         <IconButton size='large' edge='start' color='inherit' aria-label='menu'>
//           <MenuIcon />
//         </IconButton>
//         <Typography
//           variant='h6'
//           component='div'
//           style={{ flex: 1, textAlign: 'center' }}
//         >
//           Post Blog
//         </Typography>
//         {loggedIn ? (
//           <Box mx={2}>
//             <Button color='inherit' onClick={logout}>
//               Logout
//             </Button>
//           </Box>
//         ) : (
//           <Box mx={2}>
//             <Button color='inherit' onClick={handleClick}>
//               Login
//             </Button>
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default MyAppBar

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/Inbox' // Just an example icon for links
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLogout } from '../Hooks/useLogout'
import { useAuth } from '../Hooks/useAuth'

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { persistState: loggedIn } = useAuth()
  const logout = useLogout()
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = () => {
    navigate('/login', { state: { from: location }, replace: true })
  }

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open)
  }

  const list = () => (
    <div role='presentation' onClick={() => toggleDrawer(false)}>
      <List>
        {['Link 1', 'Link 2', 'Link 3'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' style={{ flex: 1 }}>
            Post Blog
          </Typography>
          {loggedIn ? (
            <Box mx={2}>
              <Button color='inherit' onClick={logout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box mx={2}>
              <Button color='inherit' onClick={handleClick}>
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  )
}

export default Navbar
