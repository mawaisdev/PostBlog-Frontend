import { Stack, Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Vue',
  'Angular',
  'Svelte',
  'Next.js',
  'Gatsby',
  'Nuxt.js',
  'Redux',
  'GraphQL',
  'Node.js',
  'Express',
  'MongoDB',
]

type Skill = {
  id: number
  label: string
}

const skillsOptions: Skill[] = skills.map((skill, index) => ({
  id: index + 1,
  label: skill,
}))
export const MuiAutoComplete = () => {
  const [skill, setSkill] = useState<string | null>(null)
  const [skillOption, setSkillOption] = useState<Skill | null>(null)
  console.log({ skill })
  console.log({ skillOption })
  return (
    <Stack spacing={4}>
      <Stack spacing={2} width={'250px'}>
        <Autocomplete
          options={skills}
          renderInput={(params) => <TextField {...params} label='Skills' />}
          value={skill}
          // freeSolo // use if you want to allow user to enter custom value
          onChange={(_event, newValue) => {
            setSkill(newValue)
          }}
        />
      </Stack>
      <Stack spacing={2} width={'250px'}>
        <Autocomplete
          options={skillsOptions}
          renderInput={(params) => (
            <TextField {...params} label='Skill With Object' />
          )}
          value={skillOption}
          onChange={(_event, newValue) => {
            setSkillOption(newValue)
          }}
        />
      </Stack>
    </Stack>
  )
}
