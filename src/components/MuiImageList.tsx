import {
  Stack,
  ImageList,
  ImageListItem,
  Box,
  ImageListItemBar,
} from '@mui/material'

const itemData = [
  {
    title: 'Breakfast',
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  },
  {
    title: 'Burger',
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
  },
  {
    title: 'Camera',
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
  },
  {
    title: 'Coffee',
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
  },
  {
    title: 'Hats',
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
  },
  {
    title: 'Honey',
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
  },
  {
    title: 'Basketball',
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  },
  {
    title: 'Fern',
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  },
  {
    title: 'Mushrooms',
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  },
  {
    title: 'Tomato basil',
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  },
  {
    title: 'Sea star',
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  },
  {
    title: 'Bike',
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  },
  ,
  {
    title: 'Fern',
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  },
  {
    title: 'Mushrooms',
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  },
  {
    title: 'Tomato basil',
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  },
  {
    title: 'Sea star',
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  },
  {
    title: 'Bike',
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  },
  ,
  {
    title: 'Fern',
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  },
  {
    title: 'Mushrooms',
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  },
  {
    title: 'Tomato basil',
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  },
  {
    title: 'Sea star',
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  },
  {
    title: 'Bike',
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  },
  ,
  {
    title: 'Fern',
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  },
  {
    title: 'Mushrooms',
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  },
  {
    title: 'Tomato basil',
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  },
  {
    title: 'Sea star',
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  },
  {
    title: 'Bike',
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  },
]

export const MuiImageList = () => {
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {itemData.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={`${item?.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item?.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item?.title}
                loading='lazy'
              />
              <ImageListItemBar title={item?.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>

      <Stack spacing={2}>
        <ImageList
          variant='woven'
          sx={{ width: 500, height: 450 }}
          cols={3}
          gap={8}
        >
          {itemData.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={`${item?.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item?.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item?.title}
                loading='lazy'
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>

      <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
        <ImageList variant='masonry' cols={3} gap={16}>
          {itemData.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={`${item?.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item?.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item?.title}
                loading='lazy'
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Stack>
  )
}
