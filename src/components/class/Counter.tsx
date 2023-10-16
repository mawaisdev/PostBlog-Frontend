import { Button } from '@mui/material'
import { Component } from 'react'

type CounterProps = {
  message: string
}
type CounterState = {
  count: number
}

export class Counter extends Component<CounterProps, CounterState> {
  state: { count: number } = { count: 0 }
  handleClick = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }))
  }
  render() {
    return (
      <div>
        {' '}
        <Button
          sx={{ marginRight: 2 }}
          variant='outlined'
          onClick={this.handleClick}
        >
          Increase
        </Button>
        {this.props.message} {this.state.count}
      </div>
    )
  }
}
