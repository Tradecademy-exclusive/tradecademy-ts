'use client'

import { Note } from '@prisma/client'
import React, { useEffect, useRef } from 'react'
import { FiLoader } from 'react-icons/fi'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import Image from 'next/image'
import { toast } from 'react-toastify'

const TldrawSketch = ({
  sessionId,
  saveSession,
  note,
  saving,
  setSaving,
}: {
  sessionId: string
  saveSession: (sessionData: string) => void
  note: Note | null
  saving: boolean
  setSaving: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const tldrawCanvas = containerRef.current.querySelector('.tl-container')
        if (tldrawCanvas) {
          tldrawCanvas.dispatchEvent(new Event('resize'))
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='w-full h-full flex flex-col items-start gap-3'
    >
      <Tldraw persistenceKey={sessionId} />
      <button
        onClick={async () => {
          if (!note) {
            saveSession(sessionId)
          } else {
            setSaving(true)
            setTimeout(() => {
              setSaving(false)
              return toast.error('Your note has been saved', {
                icon: (
                  <Image src='/tc_icon.svg' alt='' height={25} width={25} />
                ),
              })
            }, 200)
          }
        }}
        disabled={saving}
        className='bg-tcblue hover:bg-tcblue/90 text-white transition-all duration-200 w-[200px] py-2 rounded-[15px]'
      >
        {!saving ? (
          'Save my notes'
        ) : (
          <div className='flex items-center gap-2 justify-center'>
            Saving
            <FiLoader className='animate-spin' />
          </div>
        )}
      </button>
    </div>
  )
}

export default TldrawSketch
