import { Alert, Stack, AlertTitle, Button } from '@mui/material'

export const MuiAlert = () => {
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Alert
          variant='standard'
          severity='error'
          onClose={() => {
            alert('Close Alert')
          }}
        >
          <AlertTitle>Error</AlertTitle>
          This is an Error Alert
        </Alert>
        <Alert variant='standard' severity='warning'>
          <AlertTitle>Warning</AlertTitle>
          This is an Warning Alert
        </Alert>
        <Alert
          variant='standard'
          severity='success'
          action={
            <Button color='inherit' size='small'>
              Undo
            </Button>
          }
        >
          <AlertTitle>Success</AlertTitle>
          This is an Success Alert
        </Alert>
        <Alert variant='standard' severity='info'>
          <AlertTitle>Info</AlertTitle>
          This is an Info
        </Alert>
      </Stack>

      <Stack spacing={2}>
        <Alert variant='outlined' severity='error'>
          This is an Error Alert
        </Alert>
        <Alert variant='outlined' severity='warning'>
          This is an Warning Alert
        </Alert>
        <Alert variant='outlined' severity='success'>
          This is an Success Alert
        </Alert>
        <Alert variant='outlined' severity='info'>
          This is an error Info
        </Alert>
      </Stack>

      <Stack spacing={2}>
        <Alert variant='filled' severity='error'>
          This is an Error Alert
        </Alert>
        <Alert variant='filled' severity='warning'>
          This is an Warning Alert
        </Alert>
        <Alert variant='filled' severity='success'>
          This is an Success Alert
        </Alert>
        <Alert variant='filled' severity='info'>
          This is an error Info
        </Alert>
      </Stack>
    </Stack>
  )
}
