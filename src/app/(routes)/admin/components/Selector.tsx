interface SelectorProps {
  label: string
  value: string
  currValue: string
  setCurrValue: React.Dispatch<React.SetStateAction<string>>
}

const Selector = ({ label, value, currValue, setCurrValue }: SelectorProps) => {
  return (
    <button
      onClick={() => setCurrValue(value)}
      className={`w-full py-2 transition-all duration-100 px-4 bg-transparent text-sm text-left hover:bg-gray-900/10 rounded-[5px] ${
        currValue === value && 'bg-gray-900/10'
      }`}
    >
      {label}
    </button>
  )
}

export default Selector
