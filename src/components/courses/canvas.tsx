'use client'

import dynamic from 'next/dynamic'
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from 'react-sketch-canvas'
import { useRef, useState } from 'react'
import { LuPenTool } from 'react-icons/lu'
import { FaEraser } from 'react-icons/fa'
import { Slider } from '../ui/slider'

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
  const [eraserWidth, setEraserWidth] = useState(5)

  const handleEraserClick = () => {
    setEraseMode(true)
    canvasRef.current?.eraseMode(true)
  }

  const handlePenClick = () => {
    setEraseMode(false)
    canvasRef.current?.eraseMode(false)
  }

  const handleStrokeWidthChange = (value: number[]) => {
    setStrokeWidth(value[0])
  }

  const handleEraserWidthChange = (value: number[]) => {
    setEraserWidth(value[0])
  }

  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
  }

  const handleUndoClick = () => {
    canvasRef.current?.undo()
  }

  const handleRedoClick = () => {
    canvasRef.current?.redo()
  }

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas()
  }

  const handleResetClick = () => {
    canvasRef.current?.resetCanvas()
    setStrokeWidth(5)
    setEraserWidth(5)
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
        <div className='w-full flex flex-col items-start gap-5'>
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <button
                onClick={handleUndoClick}
                className='text-white px-5 py-1 rounded-[5px] bg-[#3D3D3D] hover:bg-[#333333] transition-all duration-200'
              >
                Undo
              </button>
              <button
                onClick={handleRedoClick}
                className='text-white px-5 py-1 rounded-[5px] bg-[#3D3D3D] hover:bg-[#333333] transition-all duration-200'
              >
                Redo
              </button>
              <button
                onClick={handleClearClick}
                className='text-white px-5 py-1 rounded-[5px] bg-[#3D3D3D] hover:bg-[#333333] transition-all duration-200'
              >
                Clear
              </button>
              <button
                onClick={handleResetClick}
                className='text-white px-5 py-1 rounded-[5px] bg-[#3D3D3D] hover:bg-[#333333] transition-all duration-200'
              >
                Reset
              </button>
            </div>
          </div>
          <div className='w-full flex flex-col items-start gap-3'>
            <div className='w-full flex items-center gap-3'>
              <button
                disabled={!eraseMode}
                onClick={handlePenClick}
                className='p-1.5 rounded-[3px] text-white disabled:bg-[#3D3D3D] transition-all duration-200'
              >
                <LuPenTool className='text-xl' />
              </button>
              <Slider
                min={1}
                value={[strokeWidth]}
                onValueChange={handleStrokeWidthChange}
                max={25}
              />
              <span className='text-gray-100 text-[15px]'>{strokeWidth}px</span>
            </div>
            <div className='w-full flex items-center gap-3'>
              <button
                disabled={eraseMode}
                onClick={handleEraserClick}
                className='p-1.5 rounded-[3px] text-white disabled:bg-[#3D3D3D] transition-all duration-200'
              >
                <FaEraser className='text-lg' />
              </button>
              <Slider
                min={1}
                value={[eraserWidth]}
                onValueChange={handleEraserWidthChange}
                max={25}
              />
              <span className='text-gray-100 text-[15px]'>{eraserWidth}px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CanvasSketch
