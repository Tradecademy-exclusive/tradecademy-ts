'use client'
import { useState, useEffect } from 'react'
import Selector from './Selector'

interface VideoSourceProps {
  type: string
  source: string
  setType: React.Dispatch<React.SetStateAction<string>>
  setSource: React.Dispatch<React.SetStateAction<string>>
}

const VideoSource = ({
  type,
  source,
  setType,
  setSource,
}: VideoSourceProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

  useEffect(() => {
    setDropdownOpen(false)
  }, [type])

  console.log(dropdownOpen)

  return (
    <div className='w-full flex items-center bg-charcoal p-4 rounded-[15px] relative gap-5'>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className='w-full px-3 h-[33px] flex items-center justify-between bg-[#E4E8F1] rounded-[5px] border border-[#B9B0B0B2] relative'
      >
        <span className='text-[15px] text-[#1D1D1D80]'>{type}</span>
        <svg
          width='12'
          height='6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.2479 3.90271C4.17972 3.96501 4.08729 4 3.99093 4C3.89457 4 3.80214 3.96501 3.73396 3.90271L0.097596 0.576048C0.0333633 0.512986 -0.00160551 0.429577 5.66531e-05 0.343394C0.00171882 0.257211 0.0398822 0.174982 0.106507 0.114032C0.173131 0.0530816 0.263015 0.0181686 0.357221 0.016648C0.451428 0.0151274 0.542602 0.0471179 0.611536 0.10588L3.99093 3.19746L7.37032 0.10588C7.40361 0.0731959 7.44376 0.0469809 7.48837 0.0287987C7.53297 0.0106165 7.58112 0.000839874 7.62995 5.17728e-05C7.67877 -0.000736329 7.72727 0.00748026 7.77255 0.0242116C7.81783 0.0409429 7.85896 0.0658462 7.89349 0.0974356C7.92802 0.129025 7.95525 0.166653 7.97354 0.208076C7.99182 0.249499 8.0008 0.293867 7.99994 0.338535C7.99908 0.383202 7.9884 0.427253 7.96852 0.46806C7.94865 0.508866 7.91999 0.545593 7.88426 0.576048L4.2479 3.90271Z'
            fill='#1D1D1D'
          />
        </svg>
        <div
          className={`absolute top-[-180px] left-0 p-1 shadow-even bg-[#E4E8F1] w-full rounded-[5px] transition-all duration-200 flex flex-col items-start border border-[#B9B0B0B2] ${
            dropdownOpen
              ? 'scale-100 opacity-100 pointer-events-auto'
              : 'scale-75 opacity-0 pointer-events-none'
          }`}
        >
          <Selector
            value='Youtube'
            label='Youtube'
            currValue={type}
            setCurrValue={setType}
          />
          <Selector
            value='HTML5'
            label='HTML5 (mp4)'
            currValue={type}
            setCurrValue={setType}
          />
          <Selector
            value='External'
            label='External URL'
            currValue={type}
            setCurrValue={setType}
          />
          <Selector
            value='Vimeo'
            label='Vimeo'
            currValue={type}
            setCurrValue={setType}
          />
        </div>
      </button>
      <input
        type='text'
        className='w-full border border-[#1D1D1D80] h-[33px] rounded-[5px] outline-none px-3 placeholder:text-sm text-sm bg-[#E4E8F1] text-[#1D1D1D80] placeholder:text-[#1D1D1D80]'
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder={`Paste ${type} Video URL`}
      />
    </div>
  )
}

export default VideoSource
