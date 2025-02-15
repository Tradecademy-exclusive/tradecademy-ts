'use client'

import CourseHeader from '../components/CourseHeader'
import { FiPlus } from 'react-icons/fi'
import OpacityBackground from '@/components/opacityBackground'
import { useState } from 'react'
import CreateAnalysis from '../components/CreateAnalysis'
import CreateFollowUp from '../components/CreateFollowup'
import { AnalysisType } from '@/types'

const AnalysisWrapper = ({ analysis }: { analysis: AnalysisType[] }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [updateAnalysisId, setUpdateAnalysisId] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [followupContent, setFollowupContent] = useState<string>('')
  const [followupOpen, setFollowupOpen] = useState<string>('')
  const [updateFollowupId, setUpdateFollowupId] = useState<string>('')

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
      <CreateFollowUp
        content={followupContent}
        setContent={setFollowupContent}
        modalOpen={followupOpen}
        setModalOpen={setFollowupOpen}
        updateId={updateFollowupId}
        setUpdateId={setUpdateFollowupId}
      />

      <OpacityBackground
        opened={
          modalOpen ||
          !!updateAnalysisId ||
          !!followupOpen ||
          !!updateFollowupId
        }
        close={() => {
          setModalOpen(false)
          setFollowupOpen('')
          setUpdateAnalysisId('')
          setUpdateFollowupId('')
        }}
      />
      <div className='w-full mt-[200px] max-lg:mt-[280px] flex flex-col items-start gap-5 border border-[#B9B0B0B2] overflow-y-auto h-[70vh] max-lg:h-[65vh] rounded-[15px]'>
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
        <div className='w-full px-10 flex flex-col items-start gap-3 relative'>
          {analysis.length > 0 ? (
            analysis.map((obj) => (
              <div
                key={obj.id}
                className='w-full flex flex-col items-start gap-1'
              >
                <div className='w-full bg-white border border-[#B9B0B0] rounded-[5px] py-3 px-6 flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-5 shadow-evenLight'>
                  <div className='flex items-center gap-14'>
                    <div className='flex flex-col items-start gap-1.5'>
                      <h3 className='font-semibold text-[15px]'>{obj.title}</h3>
                      <h3 className='font-semibold text-[15px]'>
                        {obj.mentor.username}
                      </h3>
                    </div>
                    <button
                      onClick={() => setUpdateAnalysisId(obj.id)}
                      className='bg-lightblue text-white text-sm font-medium px-10 py-2.5 rounded-[5px]'
                    >
                      Update
                    </button>
                  </div>
                  <button
                    onClick={() => setFollowupOpen(obj.id)}
                    className='bg-lightblue text-white text-sm font-medium px-10 py-2.5 rounded-[5px] flex items-center gap-1'
                  >
                    <FiPlus className='text-xl' />
                    Follow Up
                  </button>
                </div>
                <div className='w-full flex flex-col items-start gap-1.5 pl-5'>
                  {obj.followupAnalysis.length > 0 &&
                    obj.followupAnalysis.map((item) => (
                      <div
                        key={item.id}
                        className='w-full flex items-center justify-between px-5 py-2.5 bg-white border border-[#B9B0B0] rounded-[5px] shadow-evenLight'
                      >
                        <div className='flex flex-col items-start gap-1'>
                          <h3 className='text-sm font-semibold'>
                            {item.title}
                          </h3>
                          <h3 className='text-sm font-semibold'>
                            {item.mentor.username}
                          </h3>
                        </div>
                        <button
                          onClick={() => setUpdateFollowupId(item.id)}
                          className='bg-lightblue text-white text-[13px] font-medium px-10 py-2.5 rounded-[5px]'
                        >
                          Update
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              No analysis found.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnalysisWrapper
