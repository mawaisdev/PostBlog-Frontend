import { Stack, TextField } from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { useState } from 'react'

export const MuiDatePicker = () => {
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date())
  const [selectedTime, handleTimeChange] = useState<Date | null>(new Date())
  console.log({ selectedDate })
  console.log({ selectedTime })
  return (
    <Stack spacing={4} sx={{ width: '250px' }}>
      <DatePicker
        label='Date of Joining'
        slots={<TextField />}
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />

      <TimePicker
        label='Time'
        slots={<TextField />}
        value={selectedTime}
        onChange={(time) => handleTimeChange(time)}
      />
    </Stack>
  )
}
