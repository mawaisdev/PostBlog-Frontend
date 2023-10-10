import {
  Button,
  Stack,
  Typography,
  IconButton,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { FormatBold, FormatItalic, FormatUnderlined } from '@mui/icons-material'

import React, { useState } from 'react'

export const MuiButton = () => {
  const [textFormat, setTextFormat] = useState<string[]>([])
  console.log(`textFormat:  ${textFormat}`)
  const handleFormatChange = (
    _: React.MouseEvent<HTMLElement>,
    updatedFormats: string[]
  ) => {
    setTextFormat(updatedFormats)
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction={'row'}>
        <Button variant='contained'>Button: Contained</Button>
        <Button variant='outlined'>Button: Outlined</Button>
        <Button variant='text'>Button: Text</Button>
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <Typography variant='h4' gutterBottom={true}>
          {' '}
          Button: Contained
        </Typography>
        <Button variant='contained' color='primary'>
          Button
        </Button>
        <Button variant='contained' color='secondary'>
          Button
        </Button>
        <Button variant='contained' color='success'>
          Button
        </Button>
        <Button variant='contained' color='warning'>
          Button
        </Button>
        <Button variant='contained' color='error'>
          Button
        </Button>
        <Button variant='contained' color='info'>
          Button
        </Button>
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <Typography variant='h4' gutterBottom={true}>
          {' '}
          Button: Outlined
        </Typography>
        <Button variant='outlined' color='primary'>
          Button
        </Button>
        <Button variant='outlined' color='secondary'>
          Button
        </Button>
        <Button variant='outlined' color='success'>
          Button
        </Button>
        <Button variant='outlined' color='warning'>
          Button
        </Button>
        <Button variant='outlined' color='error'>
          Button
        </Button>
        <Button variant='outlined' color='info'>
          Button
        </Button>
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <Typography variant='h4' gutterBottom={true}>
          {' '}
          Button: Text
        </Typography>
        <Button variant='text' color='primary'>
          Button
        </Button>
        <Button variant='text' color='secondary'>
          Button
        </Button>
        <Button variant='text' color='success'>
          Button
        </Button>
        <Button variant='text' color='warning'>
          Button
        </Button>
        <Button variant='text' color='error'>
          Button
        </Button>
        <Button variant='text' color='info'>
          Button
        </Button>
      </Stack>

      <Stack display={'block'} spacing={2} direction={'row'}>
        <Typography variant='h4' gutterBottom={true}>
          {' '}
          Button Size.
        </Typography>
        <Button variant='contained' color='primary' size='large'>
          Button
        </Button>
        <Button variant='contained' color='primary' size='medium'>
          Button
        </Button>
        <Button variant='contained' color='primary' size='small'>
          Button
        </Button>
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <Button
          variant='contained'
          startIcon={<SendIcon />}
          disableRipple={true}
          onClick={() => alert('Send')}
        >
          Send
        </Button>
        <Button
          variant='contained'
          disableElevation={true}
          size='large'
          endIcon={<SendIcon />}
        >
          Send
        </Button>

        <IconButton color='success' aria-label='send' size='small'>
          <SendIcon />
        </IconButton>
      </Stack>

      <Stack direction={'row'}>
        <ButtonGroup
          variant='contained'
          orientation='horizontal'
          size='medium'
          color='success'
          aria-label='alignment button group'
        >
          <Button>Start</Button>
          <Button>Center</Button>
          <Button>End</Button>
        </ButtonGroup>
      </Stack>

      <Stack direction={'row'}>
        <ToggleButtonGroup
          aria-label='Text Formatting'
          value={textFormat}
          onChange={handleFormatChange}
          // exclusive={true}
        >
          <ToggleButton value={'bold'} aria-label='bold'>
            <FormatBold />
          </ToggleButton>
          <ToggleButton value={'italic'} aria-label='italic'>
            <FormatItalic />
          </ToggleButton>
          <ToggleButton value={'underline'} aria-label='underline'>
            <FormatUnderlined />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  )
}
