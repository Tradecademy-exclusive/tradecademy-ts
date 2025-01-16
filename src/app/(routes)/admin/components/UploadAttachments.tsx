import { toast } from 'react-toastify'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'

interface UploadAttachmentsProps {
  attachments: string[]
  setAttachments: React.Dispatch<React.SetStateAction<string[]>>
}

const UploadAttachments = ({
  attachments,
  setAttachments,
}: UploadAttachmentsProps) => {
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
        setAttachments((prev) => [...prev, data.image])
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
    <div className='w-full flex flex-col items-start gap-3'>
      <label
        htmlFor='upload_attachment'
        className='bg-charcoal p-4 rounded-[15px] w-full'
      >
        <div className='bg-[#F0F0F0] w-full flex items-center justify-center py-3 rounded-[15px]'>
          <div className='flex items-center gap-3'>
            <svg
              width='18'
              height='15'
              viewBox='0 0 9 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.97352 1.02581C7.87417 0.926545 7.75622 0.847803 7.62642 0.794081C7.49661 0.740359 7.35748 0.712709 7.21697 0.712709C7.07647 0.712709 6.93734 0.740359 6.80753 0.794081C6.67772 0.847803 6.55977 0.926545 6.46042 1.02581L1.25823 6.22341C0.923839 6.55758 0.736003 7.01078 0.736047 7.48331C0.736092 7.95585 0.924014 8.40901 1.25847 8.74311C1.59293 9.07721 2.04653 9.26488 2.51948 9.26484C2.99243 9.26479 3.446 9.07704 3.78039 8.74287L7.43856 5.08792C7.50617 5.02498 7.59559 4.99072 7.68798 4.99234C7.78038 4.99397 7.86853 5.03137 7.93388 5.09665C7.99922 5.16194 8.03665 5.25002 8.03828 5.34233C8.03991 5.43464 8.00561 5.52398 7.94262 5.59153L4.28444 9.24648C4.05374 9.48302 3.77833 9.67142 3.47417 9.80077C3.17002 9.93011 2.84318 9.99781 2.51263 9.99995C2.18207 10.0021 1.85439 9.93861 1.54858 9.81321C1.24278 9.68781 0.964943 9.50298 0.731202 9.26944C0.49746 9.03591 0.312467 8.75832 0.186956 8.45278C0.0614441 8.14725 -0.00208581 7.81985 5.22238e-05 7.48959C0.00219026 7.15933 0.0699537 6.83278 0.19941 6.52889C0.328867 6.225 0.517439 5.94983 0.754184 5.71933L5.95589 0.521728C6.29035 0.187627 6.74395 -4.45414e-05 7.2169 7.92953e-09C7.68985 4.45573e-05 8.14342 0.187801 8.47781 0.521965C8.81221 0.856129 9.00004 1.30933 9 1.78186C8.99996 2.2544 8.81203 2.70756 8.47758 3.04166L3.27872 8.23594L3.27491 8.23974L3.27158 8.24307L3.27063 8.24402L3.26921 8.24497C3.06586 8.4346 2.79658 8.53765 2.51847 8.53227C2.24036 8.5269 1.97527 8.41351 1.77942 8.21616C1.58356 8.01881 1.47234 7.75301 1.46931 7.47511C1.46629 7.1972 1.57172 6.92905 1.76324 6.7275L5.47705 3.01696C5.54428 2.95202 5.63435 2.91606 5.72786 2.91683C5.82137 2.91759 5.91084 2.95503 5.97699 3.02106C6.04315 3.0871 6.0807 3.17645 6.08155 3.26988C6.08241 3.3633 6.04651 3.45333 5.98157 3.52056L2.26776 7.2311C2.20042 7.29751 2.16223 7.38792 2.16161 7.48246C2.16098 7.57699 2.19797 7.6679 2.26443 7.73519C2.3309 7.80247 2.42139 7.84062 2.51601 7.84125C2.61063 7.84187 2.70161 7.80491 2.76896 7.73851L7.97352 2.53711C8.07288 2.43784 8.15169 2.32 8.20546 2.1903C8.25923 2.06061 8.2869 1.9216 8.2869 1.78122C8.2869 1.64084 8.25923 1.50183 8.20546 1.37214C8.15169 1.24244 8.07288 1.12507 7.97352 1.02581Z'
                fill='#1D1D1D'
              />
            </svg>
            <span className='text-sm text-[#1D1D1D80]'>Upload Attachments</span>
          </div>
        </div>
        <input
          id='upload_attachment'
          type='file'
          className='absolute opacity-0 pointer-events-none -z-10'
          onChange={handleImageChange}
        />
      </label>
      <div className='w-full flex flex-col items-start gap-2.5'>
        {attachments && attachments.length > 0 ? (
          attachments.map((source, idx) => (
            <Link
              href={source}
              target='_blank'
              key={source}
              className='flex items-center gap-2'
            >
              <span>{idx + 1}.</span>
              <span className='underline font-medium'>Visit attachment</span>
            </Link>
          ))
        ) : (
          <div>No attachments uploaded.</div>
        )}
      </div>
    </div>
  )
}

export default UploadAttachments
