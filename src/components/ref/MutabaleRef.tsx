import { Button } from '@mui/material'
import { useState, useEffect, useRef } from 'react'

export const MutableRef = () => {
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef<number | null>(null)

  const stopTimer = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
  }

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)

    return () => {
      stopTimer()
    }
  }, [])

  return (
    <div>
      HookTimer: {timer} -{' '}
      <Button variant='outlined' onClick={() => stopTimer()}>
        Stop Timer
      </Button>
    </div>
  )
}
