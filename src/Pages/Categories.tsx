import { useState, useEffect } from 'react'
import { Category } from '../Types/Responses/Category/Category'
import { CategoryAllResponse } from '../Types/Responses/Category/CategoryAll'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useAuth } from '../Hooks/useAuth'
import { AuthState } from '../Types/Context/Auth/AuthState'
export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>({} as Category[])
  const axiosPrivate = useAxiosPrivate()
  const { setAuthState } = useAuth()
  const location = useLocation()

  const navigate = useNavigate()

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
      } catch (error: AxiosError | any) {
        if (error?.response?.data?.status === 403) {
          setAuthState({} as AuthState)
          navigate('/login', { state: { from: location } })
        }
      }
    }

    getCategories()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <article>
      <h2>Categories List</h2>
      {categories?.length ? (
        <ul>
          {categories.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      ) : (
        <p>No Categories Found</p>
      )}
    </article>
  )
}
