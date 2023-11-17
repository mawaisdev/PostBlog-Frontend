import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { useEffect } from 'react'
import { ResponsiveCircularProgress } from '../ResponsiveCircularProgress'
import { useAxiosPrivate } from '../../Hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { CategoryAllResponse } from '../../Types/Responses/Category/CategoryAll'
import { DeleteButton } from './DeleteCategoryButton'
import { UpdateCategoryDialog } from './UpdateCategoryButton'
import { Category } from '../../Types/Responses/Category/Category'

type CategoriesTableProps = {
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export const CategoriesTable = ({
  categories,
  setCategories,
}: CategoriesTableProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const headers = ['Id', 'Name', 'Descriptions', 'Actions']
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        if (categories.length === 0) {
          const { data: response } =
            await axiosPrivate.get<CategoryAllResponse>('/category', {
              signal: controller.signal,
            })
          isMounted && setCategories(response.data)
        }
      } catch (error: AxiosError | any) {
        if (error?.response) {
          console.log(error.response)
        }
      } finally {
        setIsLoading(false)
        isMounted = false
        controller.abort()
      }
    }
    fetchCategories()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return isLoading ? (
    <ResponsiveCircularProgress />
  ) : (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <UpdateCategoryDialog
                  category={category}
                  categories={categories}
                  setCategories={setCategories}
                />
                <DeleteButton
                  id={category.id}
                  message='Are You Sure? You want to delete this Category.'
                  setCategories={setCategories}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
