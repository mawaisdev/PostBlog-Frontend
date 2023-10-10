import { Typography } from '@mui/material'

export const MuiTypography = () => {
  return (
    <div>
      <Typography variant='h1'>H1: Heading</Typography>
      <Typography variant='h2'>H2: Heading</Typography>
      <Typography variant='h3'>H3: Heading</Typography>
      <Typography variant='h4' component={'h1'} gutterBottom={true}>
        H4: Heading
      </Typography>
      <Typography variant='h5'>H5: Heading</Typography>
      <Typography variant='h6'>H6: Heading</Typography>

      <Typography variant='subtitle1'>H6: Subtitle</Typography>
      <Typography variant='subtitle2'>H6: Subtitle</Typography>

      <Typography variant='body1'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
        voluptatem porro consequatur delectus maxime consequuntur architecto
        omnis vel deserunt. At assumenda aliquid exercitationem deleniti ab
        consectetur hic veritatis quisquam vero.
      </Typography>
      <Typography variant='body2'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis
        ducimus sunt dignissimos molestiae tenetur at voluptatem nihil explicabo
        ipsum obcaecati nam quibusdam ab eaque, ipsa pariatur veritatis
        inventore voluptates placeat.
      </Typography>
    </div>
  )
}
