'use client'

import dynamic from 'next/dynamic'
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from 'react-sketch-canvas'
import { type ChangeEvent, useRef, useState } from 'react'
import { LuPenTool } from 'react-icons/lu'
import { FaEraser } from 'react-icons/fa'

const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  {
    ssr: false,
  }
)

const CanvasSketch = () => {
  const [content, setContent] = useState<string>('')
  const canvasRef = useRef<ReactSketchCanvasRef>(null)
  const [eraseMode, setEraseMode] = useState(false)
  const [strokeWidth, setStrokeWidth] = useState(5)
  const [eraserWidth, setEraserWidth] = useState(10)

  const handleEraserClick = () => {
    setEraseMode(true)
    canvasRef.current?.eraseMode(true)
  }

  const handlePenClick = () => {
    setEraseMode(false)
    canvasRef.current?.eraseMode(false)
  }

  const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(+event.target.value)
  }

  const handleEraserWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEraserWidth(+event.target.value)
  }

  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
  }

  return (
    <div className='w-full p-4 bg-charcoal rounded-[15px]'>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TMC_API_KEY}
        value={content}
        init={{
          height: 300,
          menubar: true,
          plugins: ['link', 'image', 'lists'],
          toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
        }}
        onEditorChange={(newValue) => handleEditorChange(newValue)}
      />
      <div className='w-full flex flex-col items-start gap-2'>
        <ReactSketchCanvas
          className='!mt-5 !h-[270px]'
          ref={canvasRef}
          strokeWidth={strokeWidth}
          eraserWidth={eraserWidth}
        />
        <div className='w-full flex items-center justify-start gap-5'>
          <button
            disabled={!eraseMode}
            onClick={handlePenClick}
            className='p-1.5 rounded-[3px] text-white disabled:bg-[#3D3D3D] transition-all duration-200'
          >
            <LuPenTool className='text-xl' />
          </button>
          <button
            disabled={eraseMode}
            onClick={handleEraserClick}
            className='p-1.5 rounded-[3px] text-white disabled:bg-[#3D3D3D] transition-all duration-200'
          >
            <FaEraser className='text-lg' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CanvasSketch
