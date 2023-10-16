import axios from 'axios'
import { AuthResponse } from '../Types/Responses/AuthResponse'

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  // Replace with your actual login endpoint
  const response = await axios.post<AuthResponse>('/api/login', {
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
  // Replace with your actual signup endpoint
  const response = await axios.post<AuthResponse>('/api/signup', {
    email,
    password,
    userName,
  })
  return response.data
}
