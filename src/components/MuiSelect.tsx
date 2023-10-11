import { Box, TextField, MenuItem, Stack } from '@mui/material'
import { useState } from 'react'

export const MuiSelect = () => {
  const [country, setCountry] = useState<string>('')
  const [fruits, setFruits] = useState<string[]>([])
  console.log(`Country: ${country}`)
  console.log(`Fruits: ${fruits}`)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value as string)
  }
  const handleFruits = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFruits(typeof value === 'string' ? value.split(',') : value)
  }
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Box width='250px'>
          <TextField
            label='Select Country'
            select
            value={country}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value='Pakistan'>Pakistan</MenuItem>
            <MenuItem value='Germany'>Germany</MenuItem>
            <MenuItem value='UAE'>UAE</MenuItem>
          </TextField>
        </Box>
      </Stack>
      <Stack spacing={2}>
        <Box width='250px'>
          <TextField
            label='Select Fruits'
            select
            value={fruits}
            onChange={handleFruits}
            fullWidth
            SelectProps={{
              multiple: true,
            }}
          >
            <MenuItem value='Apple'>Apple</MenuItem>
            <MenuItem value='Mango'>Mango</MenuItem>
            <MenuItem value='Banana'>Banana</MenuItem>
          </TextField>
        </Box>
      </Stack>
    </Stack>
  )
}
