import {
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormHelperText,
} from '@mui/material'

import { useState } from 'react'

export const MuiRadio = () => {
  const [jobExperience, setJobExperience] = useState<string>('')
  const [isSelect, setIsSelect] = useState<boolean>(false)
  console.log(`isSelect: ${isSelect}`)

  console.log({ jobExperience })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelect(true)
    setJobExperience(event.target.value)
  }
  return (
    <Box>
      <FormControl>
        <FormLabel id='job-experience-group-label' error={!isSelect} required>
          Year's of Experience
        </FormLabel>
        <RadioGroup
          name='job-experience-group'
          aria-label='job-experience-group-label'
          value={jobExperience}
          onChange={handleChange}
          row
        >
          <FormControlLabel control={<Radio />} label='0-2' value={'0-2'} />
          <FormControlLabel control={<Radio />} label='3-5' value={'3-5'} />
          <FormControlLabel control={<Radio />} label='6-10' value={'6-10'} />
        </RadioGroup>
        {!isSelect ? (
          <FormHelperText error={!isSelect}>Please Select One</FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  )
}
