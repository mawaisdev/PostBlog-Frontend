import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { useCategories } from '../Contexts/CategoryContext'
import { CategoryAllResponse } from '../Types/Responses/Category/CategoryAll'

type DeleteProps = {
  id: number
  message: string
}

export const DeleteButton: React.FC<DeleteProps> = ({ id, message }) => {
  const axiosPrivate = useAxiosPrivate()
  const { setCategories } = useCategories()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async () => {
    console.log('Here in Delete Button Props')

    try {
      const response = await axiosPrivate.delete(`/category/${id}`)
      if (response.data.status === 200) {
        const { data: response } = await axiosPrivate.get<CategoryAllResponse>(
          '/category'
        )
        setCategories(response.data)
      }
    } catch (error: AxiosError | any) {
      if (error?.response.status === 404) {
        console.log(error.response)
      }
    }
    handleClose()
  }

  return (
    <>
      <Button color='primary' onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message} </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirm} color='primary' autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
