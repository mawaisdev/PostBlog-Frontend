import { Box } from '@mui/material'

import { useEffect, useState } from 'react'
import { ProfileCard } from '../Components/UserProfileCard'
import { useAxiosPrivate } from '../Hooks/useAxiosPrivate'
import {
  ProfilePageResponse,
  ProfileUser,
} from '../Types/Responses/Profile/ProfilePageResponse'
import { AxiosError } from 'axios'

const ProfilePage = () => {
  const axiosPrivate = useAxiosPrivate()
  const [user, setUser] = useState<ProfileUser>({} as ProfileUser)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axiosPrivate.get<ProfilePageResponse>('/profile')
        if (data.status === 200) setUser(data.user)
      } catch (error: AxiosError | any) {
        console.log(error)
      }
    }
    getProfile()
  }, [])
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100vh' // 100% of the viewport height
    >
      <ProfileCard {...user} />
    </Box>
  )
}

export default ProfilePage
