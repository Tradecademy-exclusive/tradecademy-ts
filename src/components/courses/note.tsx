import { Note as NoteType } from '@prisma/client'
import TldrawSketch from './tldraw'

interface NoteProps {
  note: NoteType
  lessonId: string
}

const Note = ({ note, lessonId }: NoteProps) => {
  return (
    <div className='w-full p-5 rounded-[30px] bg-charcoal flex flex-col items-start gap-2.5'>
      <div className='flex flex-col items-start gap-0.5'>
        <h2 className='text-xl text-white font-semibold'>Your Notes</h2>
        <p className='text-sm text-white'>
          We all know making notes is one of the most important steps.
        </p>
      </div>
      <div className='relative w-full h-[70vh] md:h-[45vh] overflow-auto'>
        <TldrawSketch />
      </div>
    </div>
  )
}

export default Note