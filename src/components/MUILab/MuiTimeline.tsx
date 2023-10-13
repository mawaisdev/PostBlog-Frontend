import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab'

export const MuiTimeline = () => {
  // Can Display dots on left or righ side
  // Can display dots on alternate sides
  // Can display opposite text using TimelineOppositeContent
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='info' variant='outlined' />
          <TimelineConnector />
          <TimelineSeparator />
        </TimelineSeparator>
        <TimelineContent>City A</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='info' variant='outlined' />
          <TimelineConnector />
          <TimelineSeparator />
        </TimelineSeparator>
        <TimelineContent>City B</TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='info' variant='outlined' />
          <TimelineSeparator />
        </TimelineSeparator>
        <TimelineContent>City C</TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
