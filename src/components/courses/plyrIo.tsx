'use client'

import { MediaPlayer, MediaProvider } from '@vidstack/react'
import {
  PlyrLayout,
  plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr'
import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/plyr/theme.css'

const customIcons = {
  ...plyrLayoutIcons,
}

const VideoPlayer = ({ source, cover }: { source: string; cover: string }) => {
  return (
    <MediaPlayer src={source}>
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
  )
}

export default VideoPlayer
