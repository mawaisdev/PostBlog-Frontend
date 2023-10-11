import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
  CardMedia,
  Link,
} from '@mui/material'
import { Share, ThumbUp } from '@mui/icons-material'

export const MuiCard = () => {
  return (
    <Box width='300px'>
      <Card>
        <CardMedia
          component={'img'}
          height={'140px'}
          image='https://source.unsplash.com/random'
          alt='random image'
        />
        <CardContent>
          <Typography variant='h5' component='div' gutterBottom>
            Posts
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {' '}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quae
            quaerat officiis illo illum molestiae magnam, facere beatae maxime
            perspiciatis, unde ad voluptatibus! Ipsa ducimus ea, a voluptatibus
            reiciendis exercitationem.
          </Typography>
        </CardContent>
        <CardActions>
          <Stack
            display={'flex'}
            alignContent={'space-between'}
            alignItems={'center'}
            position={'relative'}
            direction={'row'}
          >
            <IconButton>
              <Share />
            </IconButton>
            <IconButton>
              <ThumbUp />
            </IconButton>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  )
}
