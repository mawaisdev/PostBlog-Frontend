import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'
import { Category } from '../Types/Responses/Category/Category'
import React, { useEffect } from 'react'
import { ResponsiveCircularProgress } from './ResponsiveCircularProgress'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { CategoryAllResponse } from '../Types/Responses/Category/CategoryAll'
import { useCategories } from '../Contexts/CategoryContext'

export const CategoriesTable = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { categories, setCategories } = useCategories()
  const handleUpdate = (category: Category) => {
    // Handle the update logic here
    console.log(category)
  }

  const handleDelete = (id: number) => {
    console.log(id)
    setCategories(categories.filter((category) => category.id !== id))
  }
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
                <Button onClick={() => handleUpdate(category)}>Update</Button>
                <Button onClick={() => handleDelete(category.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
