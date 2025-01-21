import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface UploadCourseProps {
  published: boolean
  setPublished: React.Dispatch<React.SetStateAction<boolean>>
}

const UploadCourse = ({ published, setPublished }: UploadCourseProps) => {
  return (
    <section className='w-full flex items-start gap-7'>
      <div className='w-full h-[77vh] flex flex-col items-start gap-5 border rounded-[15px] border-[#B9B0B0B2] overflow-auto'>
        <div className='w-full min-h-[100px] max-h-[100px] border-b border-[#B9B0B0B2] px-10 flex items-center justify-start'>
          <h2 className='text-lg font-bold'>Course Information</h2>
        </div>
      </div>
      <div className='min-w-[250px] max-w-[250x] border rounded-[15px] border-[#B9B0B0B2] p-3'>
        <div className='bg-lightblue/10 rounded-[10px] flex flex-col items-start p-3'>
          <div className='flex flex-col items-start gap-1'>
            <h4 className='font-semibold'>Publish</h4>
            <div className='flex items-center gap-2'>
              <span>Status:</span>
              <DropdownMenu>
                <DropdownMenuTrigger className='!outline-none'>
                  <button>
                    <span
                      className={`${
                        published ? 'text-lightblue' : 'text-[#F44337]'
                      }`}
                    >
                      {published ? 'Publish' : 'Private'}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setPublished(true)}>
                    Publish
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPublished(false)}>
                    Private
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='w-full flex justify-end mt-5'>
            <button className='bg-lightblue text-[15px] text-white px-3 py-1.5 rounded-[7px]'>
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UploadCourse
