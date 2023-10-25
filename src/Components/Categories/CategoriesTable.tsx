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
import { useCategories } from '../../Contexts/CategoryContext'
import { DeleteButton } from './DeleteCategoryButton'
import { UpdateCategoryDialog } from './UpdateCategoryButton'

export const CategoriesTable = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { categories, setCategories } = useCategories()
  const headers = ['Id', 'Name', 'Descriptions', 'Actions']
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const { data: response } = await axiosPrivate.get<CategoryAllResponse>(
          '/category',
          {
            signal: controller.signal,
          }
        )
        isMounted && setCategories(response.data)
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
                <UpdateCategoryDialog category={category} />
                <DeleteButton
                  id={category.id}
                  message='Are You Sure? You want to delete this Category.'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
