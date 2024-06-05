import { format } from 'date-fns'

import { IMG } from '../utils/constants'

interface CloudinaryProps {
  base64: string
  filename: string
}

const useImageUpload = () => {
  const convertToBase64 = async (file: any) => {
    const base64 = new Promise(resolve => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result
        resolve(result)
      }
      reader.readAsDataURL(file)
    }).then(res => res as string)
    const thumbnail = URL.createObjectURL(file as any)
    return { base64, thumbnail, type: file.type, name: file.name }
  }

  const createFormData = ({ base64, filename }: CloudinaryProps) => {
    const form = new FormData()
    form.append('file', base64)

    const today = format(new Date(), 'MM/dd/yyyy')
    const newFileName = `${filename}_${today}`
    form.append(IMG.override, newFileName)
    form.append('upload_preset', IMG.presetFolder)

    return form
  }

  const handleUpload = async ({ base64, filename }: CloudinaryProps) => {
    const form = createFormData({ base64, filename })
    const res = await fetch(IMG.uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    const toJson = res.json()
    console.log('toJson: ', toJson)
  }

  return { convertToBase64, handleUpload }
}

export default useImageUpload
