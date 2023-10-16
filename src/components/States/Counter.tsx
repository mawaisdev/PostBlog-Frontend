import { Box, Button, Paper, Stack } from '@mui/material'
import { useReducer } from 'react'
import { CounterState } from '../PropTypes/CounterState'
import { CounterAction } from '../PropTypes/CounterAction'

const initialState = { count: 0 }

function reducer(state: CounterState, action: CounterAction) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload }
    case 'decrement':
      return { count: state.count - action.payload }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Paper
      sx={{
        width: '400px',
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack spacing={2}>
        <Stack direction={'row'} spacing={2}>
          <Button
            variant={'contained'}
            onClick={() => dispatch({ type: 'increment', payload: 10 })}
          >
            Increment 10
          </Button>
          <Box sx={{ paddingTop: '10px' }}>{state.count}</Box>
          <Button
            variant={'contained'}
            onClick={() => dispatch({ type: 'decrement', payload: 10 })}
          >
            Decrement 10
          </Button>
        </Stack>
        <Stack>
          <Button
            variant='contained'
            onClick={() => dispatch({ type: 'reset' })}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}
