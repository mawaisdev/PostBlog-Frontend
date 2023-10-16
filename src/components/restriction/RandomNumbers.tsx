import { RandomNumberProps } from '../PropTypes/RandomNumberProps'

export const RandomNumbers = ({
  isPositive,
  isNegative,
  isZero,
  value,
}: RandomNumberProps) => {
  return (
    <div>
      {value} {isPositive && 'Positive'} {isNegative && 'Negative'}{' '}
      {isZero && 'Zero'}
    </div>
  )
}
