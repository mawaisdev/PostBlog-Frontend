import { Skeleton, Stack, Box, Avatar, Typography } from '@mui/material'
import { useState, useEffect } from 'react'

export const MuiSkelton = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  })

  return (
    <Box width={'250px'}>
      {loading ? (
        <Skeleton
          variant='rectangular'
          width={256}
          height={144}
          animation='wave'
        />
      ) : (
        <img
          src='https://source.unsplash.com/random/265x144'
          alt='skelton'
          width={256}
          height={144}
        />
      )}
      <Stack
        direction={'row'}
        spacing={1}
        sx={{ width: '100%', marginTop: '12px' }}
      >
        {loading ? (
          <Skeleton
            variant='circular'
            width={40}
            height={40}
            animation='wave'
          />
        ) : (
          <Avatar>V</Avatar>
        )}
        <Stack sx={{ width: '80%' }}>
          {loading ? (
            <>
              <Typography variant='body1'>
                <Skeleton width={'100%'} animation='wave' />
              </Typography>
              <Typography variant='body2'>
                <Skeleton width={'100%'} animation='wave' />
              </Typography>
            </>
          ) : (
            <>
              <Typography variant='body1'>React Mui Tutorial</Typography>
              <Typography variant='body1'>Description</Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
