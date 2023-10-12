import { Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Stack } from '@mui/material'

export const MuiLoadingButton = () => {
  return (
    <Stack direction={'row'} spacing={2}>
      <LoadingButton loading={true} variant='outlined'>
        Submit
      </LoadingButton>
      <LoadingButton loading={false} variant='outlined'>
        Submit
      </LoadingButton>
      <LoadingButton
        loading={true}
        loadingIndicator='Loading...'
        variant='outlined'
      >
        FetchData
      </LoadingButton>

      <LoadingButton
        loading={false}
        variant='outlined'
        loadingPosition='start'
        startIcon={<Save />}
      >
        Save
      </LoadingButton>
    </Stack>
  )
}
