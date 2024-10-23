'use client'
import ProgressBar from './progress-bar'
import { useState } from 'react'
export default function ProgressBarApp({ increment = 10, duration = 1000 }) {
  //to restart progress bar
  const [key, setKey] = useState(0)
  const onClick = () => setKey(prevKey => prevKey + 1)
  return (
    <div className='wrapper'>
      <ProgressBar
        increment={increment}
        duration={duration}
        key={key}
        onClick={onClick}
      />
    </div>
  )
}
