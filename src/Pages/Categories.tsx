import { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { Category } from '../Types/Responses/Category/Category'
import { CategoryAllResponse } from '../Types/Responses/Category/CategoryAll'
import { AxiosError } from 'axios'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import MemoizedCategoryTable from '../Components/TableComponent'

const Categories = () => {
  const axiosPrivate = useAxiosPrivate()
  const [categories, setCategories] = useState<Category[]>([]) // sample categories array

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getCategories = async () => {
      try {
        const { data } = await axiosPrivate.get<CategoryAllResponse>(
          '/category',
          {
            signal: controller.signal,
            withCredentials: true,
          }
        )
        isMounted && setCategories(data.data)
      } catch (error: AxiosError | any) {}
    }

    getCategories()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const headings = ['ID', 'Name', 'Description']

  const handleUpdate = (category: Category) => {
    console.log('Update category with ID:', category)
  }

  const handleDelete = (category: Category) => {
    console.log('Delete category with ID:', category)
  }
  return (
    <Container sx={{ mt: 1, display: 'flex' }}>
      <MemoizedCategoryTable
        categories={categories}
        headings={headings}
        actions={{ onUpdate: handleUpdate, onDelete: handleDelete }}
      />
    </Container>
  )
}

export { Categories }
