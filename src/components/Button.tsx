import { Button as Btn } from '@mui/material'
import { ButtonProps } from './PropTypes/ButtonProps'

export const Button = ({ handleClick }: ButtonProps) => {
  return (
    <Btn variant='outlined' onClick={(event) => handleClick(event, 1)}>
      Clicked
    </Btn>
  )
}
