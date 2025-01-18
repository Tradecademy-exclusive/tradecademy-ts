'use client'

import { useEffect, useRef } from 'react'
import 'plyr/dist/plyr.css'
import Plyr from 'plyr'

const PlyrIo = ({ source }: { source: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: ['play', 'progress', 'volume', 'fullscreen'],
      })

      return () => {
        player.destroy()
      }
    }
  }, [])

  return (
    <div>
      <h1>Plyr.io Video Player</h1>
      <video ref={videoRef} className='plyr'>
        <source src={source} type='video/mp4' />
      </video>
    </div>
  )
}

export default PlyrIo
