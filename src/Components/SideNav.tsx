import { useState } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'

import { NavListItem } from './NavListItem'
import { useLogout } from '../Hooks/useLogout'
import { SideNavProps } from '../Types/Props/SideNavProps'
import { AppBarProps } from '../Types/Props/AppBarProps'
import { Drawer } from '../StyledComponents/Drawer'
import { useAuth } from '../Hooks/useAuth'
import {
  AccountCircleOutlined,
  CategoryOutlined,
  ChevronLeft,
  ChevronRight,
  DashboardCustomizeOutlined,
  LoginOutlined,
  LogoutOutlined,
  Menu,
  SettingsOutlined,
  SubtitlesOutlined,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'

enum MenuItems {
  Dashboard = 'Dashboard',
  Categories = 'Categories',
  Posts = 'Posts',
  Profile = 'Profile',
  Settings = 'Settings',
  Home = 'Home',
  Logout = 'Logout',
  Login = 'Login',
}

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))
export const drawerWidth = 240

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const SideNav = ({ children }: SideNavProps) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const logout = useLogout()
  const { token, user } = useAuth()

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={() => {
                setOpen(!open)
              }}
              edge='start'
            >
              <Menu />
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              PostBlog
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <DrawerHeader>
            <IconButton>
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <NavListItem
              open={open}
              icon={<SubtitlesOutlined />}
              heading={MenuItems.Posts}
              handleClick={() => navigate('/')}
            />

            {token ? (
              <>
                {token && user?.roles === 'Admin' ? (
                  <>
                    <Divider />
                    <NavListItem
                      open={open}
                      icon={<DashboardCustomizeOutlined />}
                      heading={MenuItems.Dashboard}
                      handleClick={() => navigate('/dashboard')}
                    />
                    <NavListItem
                      open={open}
                      icon={<CategoryOutlined />}
                      heading={MenuItems.Categories}
                      handleClick={() => navigate('/category')}
                    />
                  </>
                ) : null}

                <Divider />
                <NavListItem
                  open={open}
                  icon={<AccountCircleOutlined />}
                  heading={MenuItems.Profile}
                  handleClick={() => navigate('/profile')}
                />
                <NavListItem
                  open={open}
                  icon={<SettingsOutlined />}
                  heading={MenuItems.Settings}
                  handleClick={() => navigate('/settings')}
                />
              </>
            ) : null}
          </List>
          <Divider />
          <NavListItem
            open={open}
            icon={
              token && token.length > 0 ? <LogoutOutlined /> : <LoginOutlined />
            }
            heading={
              token && token.length > 0 ? MenuItems.Logout : MenuItems.Login
            }
            handleClick={
              token && token.length > 0 ? logout : () => navigate('/login')
            }
          />
        </Drawer>
        <Box component='main' sx={{ flexGrow: 1, p: 3, pt: 8 }} height={100}>
          {children}
        </Box>
      </Box>
    </>
  )
}
