import {
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
} from '@mui/material'
import { useState } from 'react'
import { Bookmark, BookmarkBorder } from '@mui/icons-material'
export const MuiCheckBox = () => {
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
  const [skills, setSkills] = useState<string[]>([])
  console.log(`acceptTerms: ${acceptTerms}`)
  console.log(`skills: ${skills}`)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptTerms(event.target.checked)
  }
  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = skills.indexOf(event.target.value)
    if (index === -1) setSkills([...skills, event.target.value])
    else setSkills(skills.filter((skill) => skill !== event.target.value))
  }
  return (
    <Box>
      <Box>
        <FormControlLabel
          label='Accept terms and conditions'
          control={
            <Checkbox
              checked={acceptTerms}
              onChange={handleChange}
              size='small'
              color='error'
            />
          }
        />
      </Box>

      <Box>
        <Checkbox
          icon={<BookmarkBorder />}
          checkedIcon={<Bookmark />}
          checked={acceptTerms}
          onChange={handleChange}
        />
      </Box>

      <Box>
        <FormControl>
          <FormLabel>Skills</FormLabel>
          <FormGroup row>
            <FormControlLabel
              label='HTML'
              control={
                <Checkbox
                  value='html'
                  checked={skills.includes('html')}
                  onChange={handleSkillChange}
                />
              }
            />
            <FormControlLabel
              label='CSS'
              control={
                <Checkbox
                  value='css'
                  checked={skills.includes('css')}
                  onChange={handleSkillChange}
                />
              }
            />
            <FormControlLabel
              label='JAVASCRIPT'
              control={
                <Checkbox
                  value='javascript'
                  checked={skills.includes('javascript')}
                  onChange={handleSkillChange}
                />
              }
            />
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  )
}
