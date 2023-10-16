export type RandomNumberProps = PositiveNumber | NegativeNumber | Zero

export interface RandomNumberType {
  value: number
}

export interface PositiveNumber extends RandomNumberType {
  isPositive: boolean
  isNegative?: never
  isZero?: never
}

export interface NegativeNumber extends RandomNumberType {
  isNegative: boolean
  isZero?: never
  isPositive?: never
}

export interface Zero extends RandomNumberType {
  isZero: boolean
  isPositive?: never
  isNegative?: never
}
