import { Rating, Stack } from '@mui/material'
import { useState } from 'react'

import { Favorite, FavoriteBorder } from '@mui/icons-material'

export const MuiRating = () => {
  const [rating, setRating] = useState<number | null>(3)
  console.log({ rating })

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number | null
  ) => {
    setRating(value)
  }
  return (
    <Stack spacing={2}>
      <Rating
        name='mui-rating-1'
        value={rating}
        onChange={handleChange}
        // precision={0.5}
        size='large'
        emptyIcon={<FavoriteBorder fontSize='inherit' />}
        icon={<Favorite fontSize='inherit' color='error' />}
        readOnly
        highlightSelectedOnly
      />
    </Stack>
  )
}
