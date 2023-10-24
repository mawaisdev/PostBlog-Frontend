import * as yup from 'yup'

export type categoryData = {
  name: string
  description?: string
}

export const categorySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
})
