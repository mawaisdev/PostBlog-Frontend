import React from 'react'

export interface InputProps {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
