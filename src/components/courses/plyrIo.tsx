'use client'

import { MediaPlayer, MediaProvider } from '@vidstack/react'
import {
  PlyrLayout,
  plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr'
import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/plyr/theme.css'
import { useState } from 'react'
import { RiLoader4Fill } from 'react-icons/ri'

const customIcons = {
  ...plyrLayoutIcons,
}

const VideoPlayer = ({ source, cover }: { source: string; cover: string }) => {
  const [loading, setLoading] = useState<boolean>(true)

  return (
    <div
      className={`w-full relative ${
        loading ? 'h-[400px] max-sm:h-[200px]' : 'h-auto'
      }`}
    >
      {loading && (
        <RiLoader4Fill className='z-[999] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-[#3E63DC] animate-spin' />
      )}
      <MediaPlayer
        src={source}
        onCanPlay={() => setLoading(false)}
        onLoadedData={() => setLoading(false)}
        className={`${loading && 'opacity-0 pointer-events-none'}`}
      >
        <MediaProvider />
        <PlyrLayout
          thumbnails={cover}
          icons={customIcons}
          controls={[
            'play',
            'pip',
            'progress',
            'current-time',
            'mute+volume',
            'settings',
            'fullscreen',
          ]}
        />
      </MediaPlayer>
    </div>
  )
}

export default VideoPlayer
