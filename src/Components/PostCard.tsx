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
import { Chip, Stack } from '@mui/material'

export function PostCard({
  imageUrl,
  title,
  id,
  createdAt,
  isDraft,
  isPrivate,
  user: { id: userId, userName },
  category: { name: categoryName },
}: Post) {
  return (
    <Card variant='outlined' sx={{ width: '100%' }}>
      <CardOverflow>
        <AspectRatio ratio='2'>
          <img
            src={imageUrl && imageUrl.length > 0 ? imageUrl : BlankImage}
            srcSet='https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x'
            loading='lazy'
            alt={title}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Link to={`/posts/${id}`} className='noUnderline'>
          <Typography level='title-md'>{title.toLocaleUpperCase()} </Typography>
          <Stack spacing={2} direction='row' display='flex'>
            <Chip label={categoryName} />
            {isDraft && <Chip label='Draft' />}
            {isPrivate && <Chip label='Private' />}
          </Stack>
        </Link>
      </CardContent>
      <CardOverflow variant='soft' sx={{ bgcolor: 'background.level1' }}>
        <Divider inset='context' />
        <CardContent orientation='horizontal'>
          <Link to={`/users/${userId}`} className='noUnderline'>
            <Typography
              level='body-xs'
              fontWeight='md'
              textColor='text.secondary'
            >
              Author: {userName}
            </Typography>
          </Link>

          <Divider orientation='vertical' />
          <Typography
            level='body-xs'
            fontWeight='md'
            textColor='text.secondary'
          >
            {formatDate(createdAt)}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  )
}
