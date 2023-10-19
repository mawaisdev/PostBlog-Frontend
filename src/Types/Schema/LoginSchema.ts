import * as yup from 'yup'

export type loginData = {
  userName: string
  password: string
  rememberMe: boolean
}

export const loginSchema = yup.object().shape({
  userName: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean().required(),
})
