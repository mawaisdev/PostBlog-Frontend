import React from 'react'

export const CustomInput = (props: CustomInputProps) => {
  return <input {...props} />
}

export type CustomInputProps = React.ComponentProps<'input'>
