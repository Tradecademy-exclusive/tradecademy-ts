'use client'

import { MediaPlayer, MediaProvider } from '@vidstack/react'
import {
  PlyrLayout,
  plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr'
import { PIPButton, Controls } from '@vidstack/react'

import '@vidstack/react/player/styles/base.css'
import '@vidstack/react/player/styles/plyr/theme.css'
import { LuPictureInPicture } from 'react-icons/lu'
import { RiPictureInPictureExitFill } from 'react-icons/ri'

const PipButton = () => {
  return (
    <PIPButton className='group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 aria-hidden:hidden'>
      <LuPictureInPicture className='w-8 h-8 group-data-[active]:hidden' />
      <RiPictureInPictureExitFill className='w-8 h-8 hidden group-data-[active]:block' />
    </PIPButton>
  )
}

const customIcons = {
  ...plyrLayoutIcons,
  pip: PipButton,
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
      <Controls.Root>
        <Controls.Group className='vds-controls-group'></Controls.Group>
        <PipButton />
      </Controls.Root>
    </MediaPlayer>
  )
}

export default VideoPlayer
