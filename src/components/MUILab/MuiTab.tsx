import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useState } from 'react'
import { Password, Person, Settings } from '@mui/icons-material'

export const MuiTab = () => {
  const [value, setValue] = useState('1')
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)

    // Tabs can be scrollable
    // check scrollable tabs in the docs
  }
  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            aria-label='Tabs example'
            onChange={handleTabChange}
            textColor='secondary'
            indicatorColor='secondary'
            centered
          >
            <Tab
              label='Profile'
              value='1'
              icon={<Person />}
              iconPosition='start'
            />
            iconPosition='start'
            <Tab
              label='Password'
              value='2'
              icon={<Password />}
              iconPosition='start'
            />
            <Tab
              label='Settings'
              value='3'
              icon={<Settings />}
              iconPosition='start'
            />
          </TabList>
        </Box>
        <TabPanel value='1'>Panel One</TabPanel>
        <TabPanel value='2'>Panel Two</TabPanel>
        <TabPanel value='3'>Panel Three</TabPanel>
      </TabContext>
    </Box>
  )
}
