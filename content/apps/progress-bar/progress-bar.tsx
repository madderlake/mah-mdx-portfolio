'use client'
import { useEffect, useState } from 'react'
import './styles.css'

type PbProps = {
  increment: number
  duration: number
  onClick: () => void
}
export default function ProgressBar({
  increment = 20,
  duration = 1000,
  onClick
}: PbProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalId)
          return 100
        } else {
          return prev + increment
        }
      })
    }, duration)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <div className='progress' data-label={progress}>
        <span className='value' style={{ width: `${progress}%` }}>
          {progress > 0 && `${progress}%`}
        </span>
      </div>
      {progress === 100 && (
        <div>
          <button
            style={{
              padding: '4px 10px',
              margin: 10
            }}
            onClick={onClick}
          >
            Restart
          </button>
          <span className='block text-sm'>
            (Note: The Restart button was added for this post)
          </span>
        </div>
      )}
    </>
  )
}
