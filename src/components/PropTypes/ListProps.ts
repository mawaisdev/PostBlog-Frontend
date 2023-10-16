export interface ListProps<T> {
  items: T[]
  onClick: (value: T) => void
}
