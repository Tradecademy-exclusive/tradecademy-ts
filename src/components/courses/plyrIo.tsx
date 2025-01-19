'use client'

import React, { useEffect, useState } from 'react'
import 'plyr-react/plyr.css'
import dynamic from 'next/dynamic'
import { PlyrProps } from 'plyr-react'
const Plyr = dynamic(() => import('plyr-react'), { ssr: false })

const PlyrIo = ({
  source,
  type,
}: {
  source: string
  type: 'youtube' | 'vimeo' | 'html5'
}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const videoOptions: PlyrProps = {
    source: {
      type: 'video',
      sources: [
        {
          src: source,
          type: 'video/mp4',
          provider: type,
        },
      ],
    },
    options: {
      controls: ['play', 'progress', 'mute', 'volume', 'fullscreen'],
    },
  }

  return (
    <div className='w-full'>
      <Plyr {...videoOptions} />
    </div>
  )
}

export default PlyrIo
