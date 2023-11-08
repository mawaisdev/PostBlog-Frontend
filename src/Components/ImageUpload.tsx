import { Box, Input, Stack } from '@mui/material'

export type ImageUploadProps = {
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  imageUrl?: string
}

export const ImageUpload = ({ setFile, file }: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0])
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
        <Box
          sx={{
            width: 'full',
            height: '50%',
            mt: '2rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img src={URL.createObjectURL(file)} alt='Post Cover' />
        </Box>
      )}
    </Stack>
  )
}
