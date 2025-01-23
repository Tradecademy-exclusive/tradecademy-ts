import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CourseForm from './CourseForm'
import { publicType } from '@prisma/client'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'

interface UploadCourseProps {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  learn: string
  setLearn: React.Dispatch<React.SetStateAction<string>>
  maxStudents: string
  setMaxStudents: React.Dispatch<React.SetStateAction<string>>
  courseStatus: publicType
  setCourseStatus: React.Dispatch<React.SetStateAction<publicType>>
  paid: boolean
  setPaid: React.Dispatch<React.SetStateAction<boolean>>
  price: string
  setPrice: React.Dispatch<React.SetStateAction<string>>
  discountedPrice: string
  setDiscountedPrice: React.Dispatch<React.SetStateAction<string>>
  cover: string
  setCover: React.Dispatch<React.SetStateAction<string>>
  duration: string
  setDuration: React.Dispatch<React.SetStateAction<string>>
}

const UploadCourse = ({
  title,
  setTitle,
  description,
  setCourseStatus,
  setDescription,
  learn,
  setLearn,
  courseStatus,
  maxStudents,
  setMaxStudents,
  paid,
  setPaid,
  discountedPrice,
  setDiscountedPrice,
  price,
  setPrice,
  cover,
  setCover,
  duration,
  setDuration,
}: UploadCourseProps) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return
    const formData = new FormData()
    formData.append('image', selectedFile)
    try {
      const { data } = await axios.post('/api/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (data.image) {
        setCover(data.image)
      } else {
        throw new Error('No image URL returned from server')
      }
    } catch (err) {
      console.error('Error uploading file:', err)
      toast.error('Could not upload the file.', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
    }
  }

  return (
    <section className='w-full flex items-start gap-7'>
      <div className='w-full flex flex-col items-start gap-3'>
        <div className='w-full h-[77vh] flex flex-col items-start gap-5 border rounded-[15px] border-[#B9B0B0B2] overflow-auto'>
          <div className='w-full min-h-[100px] max-h-[100px] border-b border-[#B9B0B0B2] px-10 flex items-center justify-start'>
            <h2 className='text-lg font-bold'>Course Information</h2>
          </div>
          <CourseForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            learn={learn}
            setLearn={setLearn}
            maxStudents={maxStudents}
            setMaxStudents={setMaxStudents}
            duration={duration}
            setDuration={setDuration}
          />
        </div>
        <div className='w-full flex-col items-start gap-3.5 rounded-[15px] border border-[#B9B0B0B2]'>
          <div className='w-full py-7 px-10 border-b border-[#B9B0B0B2] flex items-center justify-between'>
            <h3 className='text-lg font-bold'>Course Price</h3>
          </div>
          <div className='w-[75%] xl:w-[55%] 2xl:w-[40%] px-10 py-4 flex flex-col items-start gap-5'>
            <div className='w-full flex items-center justify-between'>
              <h4 className='text-[15px]'>Course Type</h4>
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => setPaid(true)}
                  className='flex items-center gap-2'
                >
                  <div
                    className={`h-[14px] w-[14px] p-[5px] rounded-full transition-all duration-200 ${
                      paid ? 'bg-lightblue' : 'bg-[#D9D9D9]'
                    }`}
                  >
                    <div
                      className={`w-full h-full rounded-full bg-[#D9D9D9] transition-all duration-200 ${
                        paid ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                  <span className='text-[14px] font-semibold'>Paid</span>
                </button>
                <button
                  onClick={() => setPaid(false)}
                  className='flex items-center gap-2'
                >
                  <div
                    className={`h-[14px] w-[14px] p-[5px] rounded-full transition-all duration-200 ${
                      !paid ? 'bg-lightblue' : 'bg-[#D9D9D9]'
                    }`}
                  >
                    <div
                      className={`w-full h-full rounded-full bg-[#D9D9D9] transition-all duration-200 ${
                        !paid ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                  <span className='text-[14px] font-semibold'>Free</span>
                </button>
              </div>
            </div>
            <div className='w-full flex items-center justify-between'>
              <h4 className='text-[15px]'>Regular Price</h4>
              <input
                disabled={!paid}
                type='text'
                value={price}
                onChange={(e) => {
                  const value = e.target.value
                  if (!Number.isInteger(Number(value))) return
                  setPrice(value)
                }}
                className='text-sm px-2 py-0.5 rounded-[5px] outline-none border border-[#0000004D]'
              />
            </div>
            <div className='w-full flex items-center justify-between'>
              <h4 className='text-[15px]'>Sale Price (Discounted Price)</h4>
              <input
                disabled={!paid}
                type='text'
                value={discountedPrice}
                onChange={(e) => {
                  const value = e.target.value
                  if (!Number.isInteger(Number(value))) return
                  setDiscountedPrice(value)
                }}
                className='text-sm px-2 py-0.5 rounded-[5px] outline-none border border-[#0000004D]'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='min-w-[250px] max-w-[250px] border rounded-[15px] border-[#B9B0B0B2] p-3 flex flex-col items-center gap-4'>
        <div className='bg-lightblue/10 rounded-[10px] w-full flex flex-col items-start p-3'>
          <div className='flex flex-col items-start gap-1'>
            <h4 className='font-semibold'>Publish</h4>
            <div className='flex items-center gap-2'>
              <span>Status:</span>
              <DropdownMenu>
                <DropdownMenuTrigger id='status' className='!outline-none'>
                  <div>
                    <span className='text-lightblue'>{courseStatus}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setCourseStatus('Published')}
                  >
                    Published
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCourseStatus('Private')}>
                    Private
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCourseStatus('Draft')}>
                    Draft
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className='bg-lightblue/10 rounded-[10px] w-full flex flex-col items-start p-3 gap-3'>
          <h4 className='font-semibold'>Featured Image</h4>
          <div className='w-full h-[100px] rounded-[10px] overflow-hidden relative'>
            {cover ? (
              <Image
                src={cover}
                fill
                alt='course cover'
                className='object-cover'
              />
            ) : (
              <span className=''>No Image</span>
            )}
          </div>
          <div className='w-full flex justify-end'>
            <label
              htmlFor='cover'
              className='text-white cursor-pointer bg-lightblue text-sm px-5 py-1.5 rounded-[5px]'
            >
              Upload Image
            </label>

            <input
              id='cover'
              type='file'
              className='hidden absolute pointer-events-none opacity-0'
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default UploadCourse
