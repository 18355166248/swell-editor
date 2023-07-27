// @ts-ignore
import iframeText from "!!raw-loader!./iframeText.html"
import { themes } from "@/css/markdown-theme"
import { useEffect, useMemo, useRef } from "react"
import { usePenContext } from "../../IndexProvider"
import { baseCss, codeThemes } from "@/css/prism-themes"

export interface IframeContentProps {
  html?: string
  css?: string
  id?: string
  className?: string
}

function IframeContent({ html, css, id, className }: IframeContentProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { globalState } = usePenContext()
  const { markdownTheme, codeTheme, mobile } = globalState

  const iframeCss = useMemo(() => {
    return baseCss + css + themes[markdownTheme].css + codeThemes[codeTheme].css
  }, [css, markdownTheme, codeTheme])

  useEffect(() => {
    // 向 iframe 传递 html css 渲染
    iframeRef.current?.contentWindow?.postMessage(
      { html, css: iframeCss, id },
      "*"
    )
  }, [html, iframeCss])

  return (
    <div className="dark:bg-black w-full h-full">
      {mobile ? (
        <div className="flex-none text-center text-xs leading-4 tabular-nums whitespace-pre py-3 text-gray-900 dark:text-gray-400">
          634 × 720 <span className="text-gray-500">(100%)</span>
        </div>
      ) : null}
      <div
        className={`grid justify-center w-full h-full ${className}`}
        style={{
          gridTemplateColumns: "1.0625rem min-content 1rem",
          gridTemplateRows: "min-content 1.0625rem",
        }}
      >
        {/* 向左移动块 */}
        <div className="cursor-ew-resize select-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center">
          <svg
            viewBox="0 0 6 16"
            width="6"
            height="16"
            fill="none"
            stroke="currentColor"
          >
            <path d="M 0.5 0 V 16 M 5.5 0 V 16"></path>
          </svg>
        </div>
        <div
          className="border border-gray-200 dark:border-gray-700 shadow-sm"
          style={mobile ? { width: 540, height: 720 } : {}}
        >
          <iframe
            className="w-full h-full"
            ref={iframeRef}
            srcDoc={iframeText}
            style={mobile ? { width: 540, height: 720 } : {}}
          />
        </div>
        {/* 向右移动块 */}
        <div className="cursor-ew-resize select-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center">
          <svg
            viewBox="0 0 6 16"
            width="6"
            height="16"
            fill="none"
            stroke="currentColor"
          >
            <path d="M 0.5 0 V 16 M 5.5 0 V 16"></path>
          </svg>
        </div>
        {/* 向左下移动 */}
        <div className="cursor-nesw-resize select-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center">
          <svg
            viewBox="0 0 16 6"
            width="16"
            height="6"
            fill="none"
            stroke="currentColor"
            className="transform translate-x-0.5 -translate-y-0.5 rotate-45"
          >
            <path d="M 0 0.5 H 16 M 0 5.5 H 16"></path>
          </svg>
        </div>
        {/* 向下移动 */}
        <div className="cursor-ns-resize select-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center">
          <svg
            viewBox="0 0 16 6"
            width="16"
            height="6"
            fill="none"
            stroke="currentColor"
          >
            <path d="M 0 0.5 H 16 M 0 5.5 H 16"></path>
          </svg>
        </div>
        {/* 向右下移动 */}
        <div className="cursor-nwse-resize select-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center">
          <svg
            viewBox="0 0 16 6"
            width="16"
            height="6"
            fill="none"
            stroke="currentColor"
            className="transform -translate-x-0.5 -translate-y-0.5 -rotate-45"
          >
            <path d="M 0 0.5 H 16 M 0 5.5 H 16"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default IframeContent
