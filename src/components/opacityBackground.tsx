const OpacityBackground = ({
  opened,
  close,
}: {
  opened: boolean
  close: () => void
}) => {
  return (
    <div
      onClick={close}
      className={`fixed w-full h-screen left-0 top-0 bg-black z-[400] transition-opacity duration-300 ease-linear ${
        opened
          ? 'opacity-80 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    />
  )
}

export default OpacityBackground
