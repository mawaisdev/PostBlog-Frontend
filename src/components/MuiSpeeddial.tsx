import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { FileCopy, Print, Share, Edit } from '@mui/icons-material'

export const MuiSpeeddial = () => {
  return (
    <SpeedDial
      ariaLabel='Navigation Speed dial'
      sx={{ position: 'absolute', bottom: '16px', right: '16px' }}
      icon={<SpeedDialIcon openIcon={<Edit />} />}
    >
      <SpeedDialAction icon={<FileCopy />} tooltipTitle='Copy' />
      <SpeedDialAction icon={<Print />} tooltipTitle='Print' />
      <SpeedDialAction icon={<Share />} tooltipTitle='Share' />
    </SpeedDial>
  )
}
