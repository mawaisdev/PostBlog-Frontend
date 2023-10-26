import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'
import Divider from '@mui/joy/Divider'
import Typography from '@mui/joy/Typography'
import { Post } from '../Types/Responses/Post/GetAllPostsResponse'
import { formatDate } from '../Utils/DateFormat'
import BlankImage from '../Assets/blankImage.png'
import { Link } from 'react-router-dom'

export function PostCard(post: Post) {
  return (
    <Card variant='outlined' sx={{ width: '100%' }}>
      <CardOverflow>
        <AspectRatio ratio='2'>
          <img
            src={
              post.imageUrl && post.imageUrl.length > 0
                ? post.imageUrl
                : BlankImage
            }
            srcSet='https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x'
            loading='lazy'
            alt={post.title}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Link to={`/posts/${post.id}`} className='noUnderline'>
          <Typography level='title-md'>
            {post.title.toLocaleUpperCase()}{' '}
          </Typography>
          <Typography level='body-sm'>{post.category.name}</Typography>
        </Link>
      </CardContent>
      <CardOverflow variant='soft' sx={{ bgcolor: 'background.level1' }}>
        <Divider inset='context' />
        <CardContent orientation='horizontal'>
          <Link to={`/users/${post.user.id}`} className='noUnderline'>
            <Typography
              level='body-xs'
              fontWeight='md'
              textColor='text.secondary'
            >
              Author: {post.user.userName}
            </Typography>
          </Link>

          <Divider orientation='vertical' />
          <Typography
            level='body-xs'
            fontWeight='md'
            textColor='text.secondary'
          >
            {formatDate(post.createdAt)}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  )
}
