import SvgButton from "@/commonComponents/SvgButton"
import { themeType } from "../components/Pen/IndexProvider"

interface HeaderProps {
  leftBtn: React.ReactNode
  rightBtn: React.ReactNode
  setTheme: (theme: themeType) => void
}

function Header({ leftBtn, rightBtn, setTheme }: HeaderProps) {
  function toggleTheme() {
    const root = document.querySelector("html")
    if (root) {
      root.classList.add("disable-transitions")
      if (root.classList.contains("dark")) {
        setTheme("light")
        root.classList.remove("dark")
        try {
          window.localStorage.setItem("theme", "light")
        } catch (_) {}
      } else {
        setTheme("dark")
        root.classList.add("dark")
        try {
          window.localStorage.setItem("theme", "dark")
        } catch (_) {}
      }
      window.setTimeout(() => {
        root.classList.remove("disable-transitions")
      }, 0)
    }
  }

  return (
    <div className="p-3 h-15 flex justify-between items-center flex-grow-0 flex-shrink-0 text-gray-700 dark:text-gray-300">
      <div className="left flex items-center space-x-2">
        <h1 className="mr-2 dark:text-white font-bold">Swell Editor</h1>
        {leftBtn}
      </div>
      <div className="right flex items-center">
        {rightBtn}

        {rightBtn && (
          <div className="hidden sm:block mx-4 lg:mx-4 w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
        )}
        {/* 公共右侧按钮 */}
        {/* 夜间/白天模式 */}
        <button
          onClick={toggleTheme}
          type="button"
          className="ml-4 sm:ml-0 ring-1 ring-gray-900/5 shadow-sm hover:bg-gray-50 dark:ring-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:shadow-highlight/4 group focus:outline-none focus-visible:ring-2 rounded-md focus-visible:ring-sky-500 dark:focus-visible:ring-2 dark:focus-visible:ring-gray-400"
        >
          <span className="sr-only">
            <span className="dark:hidden">Switch to dark theme</span>
            <span className="hidden dark:inline">Switch to light theme</span>
          </span>
          <svg
            width="36"
            height="36"
            viewBox="-6 -6 36 36"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-sky-500 fill-sky-100 group-hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:group-hover:stroke-gray-300"
          >
            <g className="dark:opacity-0">
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
              <path
                d="M12 4v.01M17.66 6.345l-.007.007M20.005 12.005h-.01M17.66 17.665l-.007-.007M12 20.01V20M6.34 17.665l.007-.007M3.995 12.005h.01M6.34 6.344l.007.007"
                fill="none"
              ></path>
            </g>
            <g className="opacity-0 dark:opacity-100">
              <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path>
              <path
                d="M12 3v1M18.66 5.345l-.828.828M21.005 12.005h-1M18.66 18.665l-.828-.828M12 21.01V20M5.34 18.666l.835-.836M2.995 12.005h1.01M5.34 5.344l.835.836"
                fill="none"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Header
