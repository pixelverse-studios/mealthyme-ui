import { useState, useEffect } from 'react'

const useScreenSize = () => {
  const hasWindow = typeof window !== 'undefined'
  const [dimensions, setDimensions] = useState([
    hasWindow ? window?.innerWidth : 0,
    hasWindow ? window?.innerHeight : 0
  ])
  useEffect(() => {
    const windowSizeHandler = () => {
      setDimensions([window?.innerWidth, window?.innerHeight])
    }
    window.addEventListener('resize', windowSizeHandler)

    return () => {
      window.removeEventListener('resize', windowSizeHandler)
    }
  }, [])
  const isMobileWidth = dimensions[0] <= 900

  return { dimensions, isMobileWidth }
}

export default useScreenSize
