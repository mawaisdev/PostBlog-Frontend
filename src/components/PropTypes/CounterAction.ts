export interface UpdateAction {
  type: 'increment' | 'decrement'
  payload: number
}

export interface ResetAction {
  type: 'reset'
}

export type CounterAction = UpdateAction | ResetAction
