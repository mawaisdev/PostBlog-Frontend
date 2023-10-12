import { Avatar, Stack, AvatarGroup } from '@mui/material'

export const MuiAvatar = () => {
  return (
    <Stack spacing={4}>
      <Stack spacing={1} direction={'row'}>
        <Avatar sx={{ bgcolor: 'primary.light' }}>BW</Avatar>
        <Avatar sx={{ bgcolor: 'success.light' }}>CK</Avatar>
      </Stack>

      <Stack spacing={1} direction={'row'}>
        <Avatar sx={{ bgcolor: 'primary.light' }}>BW</Avatar>
        <Avatar sx={{ bgcolor: 'success.light' }}>CK</Avatar>
        <Avatar
          src='https://randomuser.me/api/portraits/men/79.jpg'
          alt='User'
        />
        <Avatar
          src='https://randomuser.me/api/portraits/women/51.jpg'
          alt='User'
        />
      </Stack>

      <Stack spacing={1} direction={'row'}>
        <AvatarGroup max={3}>
          <Avatar sx={{ bgcolor: 'primary.light' }}>BW</Avatar>
          <Avatar sx={{ bgcolor: 'success.light' }}>CK</Avatar>
          <Avatar
            src='https://randomuser.me/api/portraits/men/79.jpg'
            alt='User'
          />
          <Avatar
            src='https://randomuser.me/api/portraits/women/51.jpg'
            alt='User'
          />
        </AvatarGroup>
      </Stack>
    </Stack>
  )
}
