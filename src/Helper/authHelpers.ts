import { AuthResponse } from '../Types/Responses/AuthResponse'
import { SignupData } from '../Types/Schema/SignupSchema'
import { loginData } from '../Types/Schema/LoginSchema'

const REGISTER_URL = '/auth/signup'
const LOGIN_URL = '/auth/login'
import axios from '../Api/axios'

export const loginUser = async ({
  userName,
  password,
}: loginData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    LOGIN_URL,
    JSON.stringify({ userName, password }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  )
  return response.data
}

export const signupUser = async ({
  email,
  password,
  firstName,
  lastName,
  userName,
}: SignupData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    REGISTER_URL,
    JSON.stringify({
      firstName,
      lastName,
      userName,
      email,
      password,
      role: 'User',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  )
  return response.data
}
