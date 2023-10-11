import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'

import { ExpandMore } from '@mui/icons-material'
import { useState } from 'react'

export const MuiAccordian = () => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const handleChange = (isExpanded: boolean, panel: string) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <Box>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={(_event, isExpanded) => handleChange(isExpanded, 'panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          id='panel1-header'
          aria-controls='panel1-contnet'
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quae
            quaerat officiis illo illum molestiae magnam, facere beatae maxime
            perspiciatis, unde ad voluptatibus! Ipsa ducimus ea, a voluptatibus
            reiciendis exercitationem.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={(_event, isExpanded) => handleChange(isExpanded, 'panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          id='panel2-header'
          aria-controls='panel2-contnet'
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quae
            quaerat officiis illo illum molestiae magnam, facere beatae maxime
            perspiciatis, unde ad voluptatibus! Ipsa ducimus ea, a voluptatibus
            reiciendis exercitationem.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={(_event, isExpanded) => handleChange(isExpanded, 'panel3')}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          id='panel3-header'
          aria-controls='panel3-contnet'
        >
          <Typography>Accordion 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quae
            quaerat officiis illo illum molestiae magnam, facere beatae maxime
            perspiciatis, unde ad voluptatibus! Ipsa ducimus ea, a voluptatibus
            reiciendis exercitationem.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
