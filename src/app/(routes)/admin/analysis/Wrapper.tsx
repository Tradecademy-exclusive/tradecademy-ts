'use client'

import { Analysis } from '@prisma/client'
import CourseHeader from '../components/CourseHeader'
import { FiPlus } from 'react-icons/fi'
import OpacityBackground from '@/components/opacityBackground'
import { useState } from 'react'
import CreateAnalysis from '../components/CreateAnalysis'

const AnalysisWrapper = ({ analysis }: { analysis: Analysis[] }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [updateAnalysisId, setUpdateAnalysisId] = useState<string>('')
  const [content, setContent] = useState<string>('')

  return (
    <div className='p-10 max-lg:p-5 max-md:p-4 max-sm:p-2.5'>
      <CourseHeader page='Analysis' />
      <CreateAnalysis
        content={content}
        setContent={setContent}
        modalOpen={modalOpen}
        updateId={updateAnalysisId}
        setUpdateId={setUpdateAnalysisId}
        setModalOpen={setModalOpen}
      />

      <OpacityBackground
        opened={modalOpen || !!updateAnalysisId}
        close={() => {
          setModalOpen(false)
          setUpdateAnalysisId('')
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
        <div className='w-full px-10 flex flex-col items-start gap-3'>
          {analysis.map((obj) => (
            <div
              key={obj.id}
              className='w-full flex flex-col items-start gap-1'
            >
              <div className='w-full bg-white border border-[#B9B0B0] rounded-[5px] py-3 px-6 flex items-center justify-between shadow-evenLight'>
                <div className='flex items-center gap-14'>
                  <div className='flex flex-col items-start gap-1.5'>
                    <h3 className='font-semibold text-[15px]'>{obj.title}</h3>
                    <h3 className='font-semibold text-[15px]'>
                      {obj.publishedBy}
                    </h3>
                  </div>
                  <button
                    onClick={() => setUpdateAnalysisId(obj.id)}
                    className='bg-lightblue text-white text-sm font-medium px-10 py-2.5 rounded-[5px]'
                  >
                    Update
                  </button>
                </div>
                <button className='bg-lightblue text-white text-sm font-medium px-10 py-2.5 rounded-[5px] flex items-center gap-1'>
                  <FiPlus className='text-xl' />
                  Follow Up
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalysisWrapper
