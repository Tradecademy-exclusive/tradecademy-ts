'use client'

import React, { useEffect, useRef } from 'react'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

const TldrawSketch = ({ sessionId }: { sessionId: string }) => {
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
    <div ref={containerRef} className='w-full h-full'>
      <Tldraw sessionId={sessionId} />
    </div>
  )
}

export default TldrawSketch
