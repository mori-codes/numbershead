type Props = {
  width?: number
  height?: number
  viewBox?: string
  strokeWidth?: number
}

const Add = ({
  width = 24,
  height = 24,
  viewBox = "0 0 24 24",
  strokeWidth = 1,
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
export { Add }
