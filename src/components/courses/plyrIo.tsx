'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import 'plyr-react/plyr.css'
import dynamic from 'next/dynamic'
import { APITypes, PlyrInstance, PlyrProps } from 'plyr-react'

const Plyr = dynamic(() => import('plyr-react'), { ssr: false })

const PlyrIo = ({
  source,
  type,
}: {
  source: string
  type: 'youtube' | 'vimeo' | 'html5'
}) => {
  const plyrRef = useRef<PlyrInstance | null>(null)

  // Memoize video options to prevent unnecessary re-creation
  const videoOptions = useMemo<PlyrProps>(
    () => ({
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
    }),
    [source, type]
  )

  useEffect(() => {
    return () => {
      plyrRef.current?.destroy()
      plyrRef.current = null
    }
  }, [])

  return (
    <div className='w-full'>
      <Plyr ref={plyrRef as React.Ref<APITypes>} {...videoOptions} />
    </div>
  )
}

export default PlyrIo
