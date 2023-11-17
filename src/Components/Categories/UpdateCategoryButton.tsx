import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  Divider,
} from '@mui/material'
import { UseFormReturn, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { categoryData, categorySchema } from '../../Types/Schema/CategorySchema'
import { useAxiosPrivate } from '../../Hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { Category } from '../../Types/Responses/Category/Category'

interface CategoryUpdateData extends categoryData {
  id: number
}
interface UpdateCategoryProps {
  category: CategoryUpdateData
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export const UpdateCategoryDialog: React.FC<UpdateCategoryProps> = ({
  category,
  categories,
  setCategories,
}) => {
  const [open, setOpen] = useState(false)
  const axiosPrivate = useAxiosPrivate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  }: UseFormReturn<categoryData> = useForm<categoryData>({
    resolver: yupResolver(categorySchema),
    defaultValues: category,
  })

  const handleOpen = () => {
    setValue('name', category.name)
    setValue('description', category.description)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async (updatedCategory: categoryData) => {
    try {
      const { data: response } = await axiosPrivate.patch(
        `/category/${category.id}`,
        updatedCategory
      )

      const updatedCategories = categories.map((category) =>
        category.id === response.data.id ? response.data : category
      )
      setCategories(updatedCategories)
    } catch (error: AxiosError | any) {
      console.log(error.response)
    }
    handleClose()
  }

  return (
    <>
      <Button color='primary' onClick={handleOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Category</DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={handleSubmit(handleConfirm)}>
            <TextField
              label='Category Name'
              fullWidth
              required
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              autoComplete='off'
            />
            <TextField
              sx={{ mt: 2 }}
              label='Category Description'
              fullWidth
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              autoComplete='off'
            />
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button type='submit' color='primary'>
                Confirm
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
