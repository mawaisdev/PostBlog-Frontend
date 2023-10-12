import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  Divider,
} from '@mui/material'
import { Mail } from '@mui/icons-material'

export const MuiList = () => {
  return (
    <Box sx={{ width: '400px', bgcolor: '#efefef' }}>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar>
                  <Mail />
                </Avatar>
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText primary='List Item 1' secondary='Placeholder text' />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar>
                  <Mail />
                </Avatar>
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText primary='List Item 2' secondary='Last Message' />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ListItemAvatar>
                <Avatar>
                  <Mail />
                </Avatar>
              </ListItemAvatar>{' '}
            </ListItemIcon>
            <ListItemText primary='List Item 3' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
