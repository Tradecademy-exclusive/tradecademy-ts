const Locked = ({ premium }: { premium?: boolean }) => {
  return (
    <div
      className={`w-full top-0 left-0 h-full absolute z-[200] bg-[#C2C2C24D] flex items-center justify-center backdrop-blur-[4px]`}
    >
      <div
        className={`px-4 py-2 rounded-full bg-gradient-to-r from-[#266CF7] to-[#6E92FF] text-white flex items-center gap-2 ${
          premium && 'scale-125'
        }`}
      >
        <svg
          width='16'
          height='28'
          viewBox='0 0 22 28'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11 0C9.14349 0 7.36301 0.737498 6.05025 2.05025C4.7375 3.36301 4 5.14348 4 7V11C2.93913 11 1.92172 11.4214 1.17157 12.1716C0.421427 12.9217 0 13.9391 0 15V24C0 25.0609 0.421427 26.0783 1.17157 26.8284C1.92172 27.5786 2.93913 28 4 28H18C19.0609 28 20.0783 27.5786 20.8284 26.8284C21.5786 26.0783 22 25.0609 22 24V15C22 13.9391 21.5786 12.9217 20.8284 12.1716C20.0783 11.4214 19.0609 11 18 11V7C18 3.13333 14.8667 0 11 0ZM16 11V7C16 5.67392 15.4732 4.40215 14.5355 3.46447C13.5979 2.52678 12.3261 2 11 2C9.67392 2 8.40215 2.52678 7.46447 3.46447C6.52678 4.40215 6 5.67392 6 7V11H16Z'
            fill='white'
          />
        </svg>
        Still locked
      </div>
    </div>
  )
}

export default Locked
