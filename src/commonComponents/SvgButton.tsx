import clsx from "clsx"
import { FC } from "react"

interface SvgButtonProps {
  btnWidth?: number
  btnHeight?: number
  width?: number
  height?: number
  isActive?: boolean
  children?: React.ReactNode
  className?: string
  viewBox?: string
  onClick?: () => void
}

const SvgButton: FC<SvgButtonProps> = ({
  btnWidth = 36,
  btnHeight = 36,
  width = 16,
  height = 16,
  isActive = false,
  children,
  className,
  viewBox,
  onClick,
}) => {
  return (
    <button
      style={{ width: btnWidth, height: btnHeight }}
      type="button"
      onClick={onClick}
      className={clsx(
        className,
        "ring-1 ring-gray-900/5 shadow-sm hover:bg-gray-50 dark:ring-0 dark:shadow-highlight/4 dark:bg-gray-500 dark:hover:bg-gray-400",
        "group focus:outline-none focus-visible:ring-2 rounded-md overflow-hidden",
        "w-9 h-9 flex justify-center items-center",
        isActive
          ? "focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400"
          : "focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500"
      )}
    >
      <svg
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-green-600 hover:fill-gray-700"
        viewBox={viewBox || `0 0 ${width} ${height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        style={{ fill: isActive ? "#0284c7" : "#111827" }}
      >
        {children}
      </svg>
    </button>
  )
}

export default SvgButton
