import { useParams } from 'react-router-dom'

export const UpdatePost = () => {
  const { id } = useParams()
  return <h1>Update Post Component {id}</h1>
}
