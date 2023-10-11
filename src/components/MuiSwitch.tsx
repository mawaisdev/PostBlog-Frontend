import {
  Box,
  FormControlLabel,
  Switch,
  FormControl,
  FormGroup,
  FormLabel,
} from '@mui/material'
import { useState } from 'react'

export const MuiSwitch = () => {
  const [checked, setChecked] = useState<boolean>(false)
  console.log(`checked: ${checked}`)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  return (
    <Box>
      <Box>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label='Dark Mode'
        />
      </Box>

      <Box>
        <FormControl>
          <FormLabel>Setting</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Switch />} label='Dark Mode' />
            <FormControlLabel
              control={<Switch />}
              label='Receive Notifications'
            />
            <FormControlLabel control={<Switch />} label='Receive Emails' />
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  )
}
