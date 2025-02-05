'use client'

import { Analysis } from '@prisma/client'
import CourseHeader from '../components/CourseHeader'
import { FiPlus } from 'react-icons/fi'
import OpacityBackground from '@/components/opacityBackground'
import { useState } from 'react'
import CreateAnalysis from '../components/CreateAnalysis'

const AnalysisWrapper = ({ analysis }: { analysis: Analysis[] }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  return (
    <div className='p-10 max-lg:p-5 max-md:p-4 max-sm:p-2.5'>
      <CourseHeader page='Analysis' />
      <CreateAnalysis
        content={content}
        setContent={setContent}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <OpacityBackground
        opened={modalOpen}
        close={() => {
          setModalOpen(false)
        }}
      />
      <div className='w-full mt-[200px] max-lg:mt-[280px] flex flex-col items-start gap-5 border border-[#B9B0B0B2] h-[70vh] max-lg:h-[65vh] rounded-[15px]'>
        <div className='w-full py-7 px-9 flex items-center justify-between border-b border-[#B9B0B0B2]'>
          <h2 className='text-xl font-semibold'>Analysis</h2>
          <button
            onClick={() => setModalOpen(true)}
            className='bg-lightblue text-sm font-medium flex items-center gap-1.5 px-3 py-2.5 rounded-[5px] text-white'
          >
            <FiPlus className='text-xl' />
            Create Analysis
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnalysisWrapper
