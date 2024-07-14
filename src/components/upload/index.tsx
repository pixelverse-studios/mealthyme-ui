'use client'

import { useState, ChangeEvent } from 'react'
import { Edit, Delete, CameraAlt } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { useImageUpload } from '../../hooks'
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

export interface ImageProps {
  base64: string
  thumbnail: string
  type: string
  name: string
}

const Upload = ({ callback }: { callback: (img: ImageProps) => void }) => {
  const { convertToBase64 } = useImageUpload()
  const [img, setImg] = useState<null | ImageProps>(null)
  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }
    const { thumbnail, base64, type, name } = await convertToBase64(
      event.target.files[0]
    )
    const payload = { thumbnail, base64, type, name }
    setImg(payload)
    callback(payload)
  }

  const onClear = () => setImg(null)

  if (img !== null) {
    return (
      <div className={styles.ThumbnailContainer}>
        <img src={img.thumbnail} alt="uploaded_img_for_recipe" />
        <div className={styles.actions}>
          <label>
            <Edit />
            <VisuallyHiddenInput
              type="file"
              onChange={onFileUpload}
              accept="image/png, image/jpeg, image/jpg"
            />
          </label>
          <button onClick={onClear}>
            <Delete />
          </button>
        </div>
      </div>
    )
  }

  return (
    <label className={styles.UploadContainer}>
      <CameraAlt />
      <p>
        Upload Photo <span>(not required)</span>
      </p>
      <span className={styles.tagline}>PNG or JPG</span>
      <VisuallyHiddenInput
        type="file"
        onChange={onFileUpload}
        accept="image/png, image/jpeg, image/jpg"
      />
    </label>
  )
}

export default Upload
