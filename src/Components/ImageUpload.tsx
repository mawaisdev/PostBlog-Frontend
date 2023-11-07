import { Box, Input, Stack } from '@mui/material'

export type ImageUploadProps = {
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}

export const ImageUpload = ({ setFile, file }: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0])
    const selectedFile = e.target.files && e.target.files[0]
    if (selectedFile) {
      // Handle the selected file here
      console.log('Selected File Name:', selectedFile.name)
      console.log('Selected File Type:', selectedFile.type)

      // Perform any other necessary actions or validations
    }
  }

  return (
    <Stack
      direction={'column'}
      display={'flex'}
      justifyContent={'space-between'}
      spacing={3}
    >
      <Input type='file' id='image-upload' onChange={handleImageChange} />
      {file && file.type.startsWith('image') && (
        <Box sx={{ width: 'full', height: '50%' }}>
          <img src={URL.createObjectURL(file)} alt='Post Cover' />
        </Box>
      )}
    </Stack>
  )
}
