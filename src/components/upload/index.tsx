'use client'

import { useState, ChangeEvent } from 'react'
import { IconButton, Card, CardActions, CardMedia } from '@mui/material'
import { CloudUpload, QuestionMark, Cancel } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import hooks from '@/hooks'
import styles from './Upload.module.scss'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

interface UploadProps {
  isEdit: boolean
}

const MediaDisplay = ({ file }: { file: any }) => {
  if (file === null) {
    return (
      <CardMedia className={styles.display} component="div">
        <QuestionMark />
      </CardMedia>
    )
  }

  return (
    <CardMedia
      className={styles.display}
      component="img"
      alt="recipe image"
      image={file.thumbnail}
    />
  )
}

const Upload = ({ isEdit }: UploadProps) => {
  const { convertToBase64 } = hooks.useImageUpload()
  const [file, setFile] = useState(null)
  const [img, setImg] = useState<null | {
    base64: any
    thumbnail: any
    type: string
    name: string
  }>(null)
  const [loading, setLoading] = useState(false)

  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }
    setLoading(true)
    const { thumbnail, base64, type, name } = await convertToBase64(
      event.target.files[0]
    )
    setImg({ thumbnail, base64, type, name })
  }

  const onClear = () => {
    setImg(null)
    setFile(null)
  }

  return (
    <Card className={styles.UploadContainer}>
      <MediaDisplay file={img} />
      <CardActions>
        <IconButton component="label">
          <CloudUpload />
          <VisuallyHiddenInput
            type="file"
            onChange={onFileUpload}
            accept="image/png, image/jpeg, image/jpg"
          />
        </IconButton>
        {img !== null ? (
          <IconButton onClick={onClear}>
            <Cancel />
          </IconButton>
        ) : null}
      </CardActions>
    </Card>
  )
}

export default Upload
