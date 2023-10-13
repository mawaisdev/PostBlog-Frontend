import { StatusProps } from './PropTypes/Status'

export const Status = ({ status }: StatusProps) => {
  const message =
    status === 'loading'
      ? 'Loading...'
      : status === 'success'
      ? 'Data Fetched Successfully'
      : 'Error Fetching Data'
  return (
    <div>
      <h2>Status: {message}</h2>
    </div>
  )
}
