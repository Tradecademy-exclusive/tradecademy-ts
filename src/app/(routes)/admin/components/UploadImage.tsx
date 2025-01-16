import { Icons } from '@/components/icons'
import { toast } from 'react-toastify'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import { FaLink } from 'react-icons/fa'

const UploadImage = ({
  image,
  setImage,
}: {
  image: string
  setImage: React.Dispatch<React.SetStateAction<string>>
}) => {
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
        setImage(data.image)
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
        htmlFor='image_uploader'
        className='w-full bg-charcoal p-4 rounded-[15px]'
      >
        <div className='w-full bg-[#E4E8F1] h-[200px] rounded-[15px] flex flex-col gap-4 items-center justify-center'>
          <div className='flex items-center gap-2'>
            <Icons.picture />
            <span className='text-sm font-medium underline'>Upload Image</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span className='text-sm text-[#1D1D1D80]'>
              Size: 700x430 pixels
            </span>
            <span className='text-[14px] text-[#1D1D1D80]'>
              File Support: PNG, JPEG
            </span>
          </div>
          {image && (
            <Link
              href={image}
              target='_blank'
              className='flex items-center gap-2 text-[15px] font-medium'
            >
              <FaLink />
              View Image
            </Link>
          )}
        </div>
      </label>
      <input
        id='image_uploader'
        type='file'
        className='w-0 h-0 opacity-0 pointer-events-none -z-10 absolute'
        onChange={handleImageChange}
      />
    </>
  )
}

export default UploadImage
