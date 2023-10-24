import { Category } from '../Types/Responses/Category/Category'

interface ActionProps {
  onUpdate: (category: Category) => void
  onDelete: (category: Category) => void
}

interface TableProps {
  categories: Category[]
  headings: string[]
  actions: ActionProps
}

import { FC, memo, useCallback } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material'

const MemoizedCategoryTable: FC<TableProps> = memo(
  ({ categories, headings, actions }) => {
    const handleUpdate = useCallback(
      (category: Category) => {
        actions.onUpdate(category)
      },
      [actions]
    )

    const handleDelete = useCallback(
      (category: Category) => {
        actions.onDelete(category)
      },
      [actions]
    )

    return (
      <Table>
        <TableHead>
          <TableRow>
            {headings.map((heading, index) => (
              <TableCell key={index}>{heading}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <Button onClick={() => handleUpdate(category)}>Update</Button>
                <Button onClick={() => handleDelete(category)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
)

export default MemoizedCategoryTable
