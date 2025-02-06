import { Icons } from '@/components/icons'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'

const UploadAnalysis = ({
  label,
  setFile,
}: {
  label: string
  setFile: React.Dispatch<React.SetStateAction<string>>
}) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFile(data.image)
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
    <>
      <label
        htmlFor='file'
        className='flex items-cente justify-center gap-1.5 w-[200px] py-2 rounded-[5px] border border-[#B9B0B0] bg-white'
      >
        <div className='translate-y-[3px]'>
          <Icons.picture />
        </div>
        <span className='text-[15px]'>{label}</span>
      </label>
      <input
        type='file'
        id='file'
        onChange={handleFileUpload}
        className='opacity-0 pointer-events-none -z-10 absolute invisible'
      />
    </>
  )
}

export default UploadAnalysis
