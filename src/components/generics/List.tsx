import { ListProps } from '../PropTypes/ListProps'
export const List = <T extends {}>({ items, onClick }: ListProps<T>) => {
  return (
    <div>
      <h2>List of items</h2>
      {items.map((item, index) => (
        <div key={index} onClick={() => onClick(item)}>
          {JSON.stringify(item)}
        </div>
      ))}
    </div>
  )
}
