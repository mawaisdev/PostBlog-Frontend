import { Box, Button, Stack } from '@mui/material'
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
    default:
      return state
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
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
  )
}
