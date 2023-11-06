import { useState } from 'react'
import { Button, Input } from '@mui/material'

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const handleImageChange = (e: any) => {
    console.log(typeof e)
    const file = e.target.files[0]
    setSelectedImage(file)
  }

  return (
    <div>
      <Input
        id='image-upload'
        type='file'
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor='image-upload'>
        <Button variant='contained' component='span'>
          Select Image
        </Button>
      </label>
      {selectedImage && (
        <div>
          <p>Selected Image: {selectedImage.name}</p>
          <Button onClick={() => setSelectedImage(null)}>Clear</Button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
