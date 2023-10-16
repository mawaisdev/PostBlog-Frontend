import React from 'react'

type TextOwnProps<E extends React.ElementType> = {
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  color?: 'primary' | 'secondary'
  as?: E
}

type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>

export const CustomText = <E extends React.ElementType = 'div'>({
  children,
  size,
  color,
  as,
}: TextProps<E>) => {
  const Component = as || 'div'

  return (
    <Component className={`class-with-${size}-${color}`}>{children}</Component>
  )
}
