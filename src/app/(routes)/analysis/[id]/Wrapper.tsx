import VideoPlayer from '@/components/courses/plyrIo'
import { AnalysisType } from '@/types'
import { format } from 'date-fns'
import Image from 'next/image'

const AnalysisWrapper = ({ analysis }: { analysis: AnalysisType }) => {
  return (
    <div className='bg-lightblue/5 min-h-screen p-10 max-lg:p-8 max-md:p-5 flex flex-col items-start gap-10'>
      {analysis?.followupAnalysis?.length > 0 && (
        <div className='w-full flex flex-col items-start gap-10'>
          {analysis.followupAnalysis.map((followup) => (
            <div
              key={followup.id}
              className='w-full flex flex-col items-start gap-4'
            >
              <div className='flex flex-col items-start gap-1'>
                <h2 className='text-xl font-semibold'>{followup.title}</h2>
                <span className='text-[15px] text-[#000000B2]'>
                  By {followup.publishedBy} Mentor{' '}
                  {format(followup.createdAt, 'MM-dd-yy h:mma')}
                </span>
              </div>
              {followup.image && (
                <div className='w-full h-[650px] max-xl:h-[600px] max-lg:h-[500px] max-md:h-[400px] max-sm:h-[300px] relative'>
                  <Image
                    src={followup.image}
                    fill
                    alt='analysis image'
                    className='object-cover'
                  />
                </div>
              )}

              {followup.video && (
                <VideoPlayer source={followup.video} cover='' />
              )}

              <div className='w-full flex items-center justify-center mt-5'>
                <div
                  dangerouslySetInnerHTML={{ __html: followup.content }}
                  className='w-full'
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div key={analysis.id} className='w-full flex flex-col items-start gap-4'>
        <div className='flex flex-col items-start gap-1'>
          <h2 className='text-xl font-semibold'>{analysis.title}</h2>
          <span className='text-[15px] text-[#000000B2]'>
            By {analysis.publishedBy} Mentor{' '}
            {format(analysis.createdAt, 'MM-dd-yy h:mma')}
          </span>
        </div>
        {analysis.image && (
          <div className='w-full h-[650px] max-xl:h-[600px] max-lg:h-[500px] max-md:h-[400px] max-sm:h-[300px] relative'>
            <Image
              src={analysis.image}
              fill
              alt='analysis image'
              className='object-cover'
            />
          </div>
        )}
        {analysis.video && <VideoPlayer source={analysis.video} cover='' />}
        <div className='w-full flex items-center justify-center mt-5'>
          <div
            dangerouslySetInnerHTML={{ __html: analysis.content }}
            className='w-full'
          />
        </div>
      </div>
    </div>
  )
}

export default AnalysisWrapper
