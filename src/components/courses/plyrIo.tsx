'use client'

import React from 'react'
import 'plyr-react/plyr.css'
import Plyr, { PlyrProps } from 'plyr-react'

const PlyrIo = ({
  source,
  type,
}: {
  source: string
  type: 'youtube' | 'vimeo' | 'html5'
}) => {
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
