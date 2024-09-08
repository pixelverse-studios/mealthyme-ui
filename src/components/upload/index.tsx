'use client'

import { useState, ChangeEvent } from 'react'
import { FaCamera, FaTrash, FaPen } from 'react-icons/fa6'

import { useImageUpload } from '../../hooks'
import styles from './Upload.module.scss'

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
            <FaPen />
            <input
              type="file"
              onChange={onFileUpload}
              accept="image/png, image/jpeg, image/jpg"
            />
          </label>
          <button onClick={onClear}>
            <FaTrash />
          </button>
        </div>
      </div>
    )
  }

  return (
    <label className={styles.UploadContainer}>
      <FaCamera />
      <p>
        Upload Photo <span>(not required)</span>
      </p>
      <input
        type="file"
        onChange={onFileUpload}
        accept="image/png, image/jpeg, image/jpg"
      />
    </label>
  )
}

export default Upload
