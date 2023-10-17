import * as yup from 'yup'

export type SignupData = {
  firstName: string
  lastName?: string
  userName: string
  email: string
  password: string
  confirmPassword: string
}

const PASSWORD_REGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/
const USER_REGX = /^[a-zA-Z][a-zA-Z0-9]{3,20}$/

export const SignupSchema: yup.ObjectSchema<SignupData> = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string(),
  userName: yup
    .string()
    .matches(USER_REGX, 'Username is invalid')
    .required('Username is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(PASSWORD_REGX, 'Password is too weak')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
})
