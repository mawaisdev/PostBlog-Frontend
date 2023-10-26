import { AccountCircle } from '@mui/icons-material'
import { Paper, Box, Typography, Divider, Avatar } from '@mui/material'
import { ProfileUser } from '../Types/Responses/Profile/ProfilePageResponse'
import { formatDate } from '../Utils/DateFormat'
import { memo } from 'react'

const UserProfileCard = memo((user: ProfileUser) => {
  return (
    <Paper elevation={3} style={{ maxWidth: 600, margin: 'auto' }}>
      <Box
        padding={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h3'>Profile Page</Typography>
      </Box>
      <Divider />
      <Box
        padding={2}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        {user.profilePicture ? (
          <Avatar
            alt={user.firstName}
            src={user.profilePicture}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <AccountCircle style={{ width: 100, height: 100 }} />
        )}
        <h2>
          {user.firstName} {user.lastName || ''}
        </h2>
        <p>{user.userName}</p>
        <p>{user.email}</p>
        {user.bio && <p>{user.bio}</p>}
        <p>
          Last Login:{' '}
          {formatDate(
            user.lastLogin,
            true,
            '2-digit',
            '2-digit',
            '2-digit',
            undefined,
            undefined,
            'short'
          )}
        </p>
        <p>Role: {user.role}</p>
      </Box>
    </Paper>
  )
})

export { UserProfileCard as ProfileCard }
