type Props = {
  width?: number
  height?: number
  viewBox?: string
  strokeWidth?: number
}

const Lock = ({
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
export { Lock }
