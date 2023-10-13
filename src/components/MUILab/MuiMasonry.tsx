import { ExpandMore } from '@mui/icons-material'
import { Masonry } from '@mui/lab'
import {
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'

export const MuiMasonry = () => {
  // An Array of 15 Numbers random between 1 and 1000
  const heights = [
    350, 30, 50, 100, 80, 90, 40, 310, 300, 150, 80, 150, 90, 130, 70,
  ]

  return (
    <Box sx={{ width: 500, minHeight: 400 }}>
      <Masonry columns={4} spacing={1}>
        {heights.map((height, index) => (
          <Paper
            key={index}
            sx={{
              // display: 'flex',
              // justifyContent: 'center',
              // alignItems: 'center',
              // height,
              border: '1px solid',
            }}
          >
            <Accordion sx={{ minHeight: height }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Accordian {index + 2}</Typography>
              </AccordionSummary>
              <AccordionDetails>Content</AccordionDetails>
            </Accordion>
          </Paper>
        ))}
      </Masonry>
    </Box>
  )
}
