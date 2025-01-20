'use client'

import { toast } from 'react-toastify'
import TldrawSketch from './tldraw'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Note as NoteType } from '@prisma/client'

interface NoteProps {
  lessonId: string
}

const Note = ({ lessonId }: NoteProps) => {
  const [sessionId, setSessionId] = useState<string>('')
  const [saving, setSaving] = useState<boolean>(false)
  const [note, setNote] = useState<NoteType | null>(null)

  console.log(note?.sessionId, sessionId)

  useEffect(() => {
    const getNote = async () => {
      const { data } = await axios.get(`/api/notes?lessonId=${lessonId}`)
      if (data.note) {
        setSessionId(data.note.sessionId)
        setNote(data.note)
      } else {
        const generateSessionId = () => {
          return 'session-' + new Date().getTime()
        }
        const generatedId = generateSessionId()
        setSessionId(generatedId)
      }
    }

    getNote()
  }, [lessonId])

  const saveNote = async (sessionData: string) => {
    try {
      setSaving(true)
      const { data } = await axios.post('/api/notes', {
        lessonId,
        sessionId: sessionData,
      })
      if (data.note) {
        setSaving(false)
        return toast.error('Your note has been saved', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
    } catch (err) {
      setSaving(false)
      console.log(err)
      return toast.error('Please fill out all the fields!', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
    }
  }

  return (
    <div className='w-full p-5 rounded-[30px] bg-charcoal flex flex-col items-start gap-2.5'>
      <div className='flex flex-col items-start gap-0.5'>
        <h2 className='text-xl text-white font-semibold'>Your Notes</h2>
        <p className='text-sm text-white'>
          We all know making notes is one of the most important steps.
        </p>
      </div>
      <div className='relative w-full h-[70vh] md:h-[45vh] overflow-auto flex flex-col items-start gap-3'>
        <TldrawSketch
          sessionId={sessionId}
          saveSession={saveNote}
          saving={saving}
          note={note}
        />
      </div>
    </div>
  )
}

export default Note
