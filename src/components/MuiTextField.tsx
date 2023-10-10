import { Stack, TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

export const MuiTextField = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true)
  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction={'row'}>
        <TextField label='Standard' variant='outlined' size='medium' />
        <TextField label='Standard' variant='filled' size='small' />
        <TextField label='Standard' variant='standard' size='medium' />
      </Stack>
      <Stack direction='row' spacing={2}>
        <TextField
          label='Secondary'
          variant='outlined'
          color='secondary'
          size='small'
        />
      </Stack>

      <Stack direction='row' spacing={2}>
        <TextField
          label='Password'
          required={true}
          variant='outlined'
          color='secondary'
          helperText='This field is required'
          type='password'
          disabled={true}
        />
        <TextField
          label='Password'
          variant='outlined'
          color='secondary'
          InputProps={{ readOnly: true, value: '123456' }}
        />
      </Stack>

      <Stack direction={'row'} spacing={2}>
        <TextField
          label='Amount'
          type='number'
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
          variant='outlined'
          size='medium'
        />
        <TextField
          label='Weight'
          InputProps={{
            endAdornment: <InputAdornment position='end'>Kg</InputAdornment>,
          }}
          variant='outlined'
          size='medium'
        />
      </Stack>

      <Stack direction={'row'} spacing={2}>
        <TextField
          label='Password'
          type={hidePassword ? 'password' : 'text'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setHidePassword(!hidePassword)}>
                  {hidePassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant='outlined'
          size='medium'
        />
      </Stack>

      <Stack direction={'row'} spacing={2}>
        <TextField
          label='Form Input'
          required
          variant='outlined'
          size='medium'
          error
        />
      </Stack>
    </Stack>
  )
}
