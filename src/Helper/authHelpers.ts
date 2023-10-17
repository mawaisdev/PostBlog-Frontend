import axios from 'axios'
import { AuthResponse } from '../Types/Responses/AuthResponse'

const BASEURL = import.meta.env.VITE_BASE_URL

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${BASEURL}/auth/login`, {
    email,
    password,
  })
  return response.data
}

export const signupUser = async (
  email: string,
  password: string,
  userName: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${BASEURL}/auth/signup`, {
    email,
    password,
    userName,
  })
  return response.data
}
