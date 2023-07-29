// @ts-ignore
import iframeText from "!!raw-loader!./iframeText.html"
import { themes } from "@/css/markdown-theme"
import {
  MouseEvent,
  TouchEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { usePenContext } from "../../IndexProvider"
import { baseCss, codeThemes } from "@/css/prism-themes"
import {
  getPointerPosition,
  getZoomWithHeight,
  getZoomWithWidth,
  handlerSize,
} from "./utils"
import clsx from "clsx"

const defaultResponseSize = { width: 375, height: 667 }

export type MouseEventType = TouchEvent<HTMLDivElement> &
  MouseEvent<HTMLDivElement>

export interface IframeContentProps {
  html?: string
  css?: string
  id?: string
  className?: string
}

type HandlerType = "left" | "right" | "bottom-left" | "bottom" | "bottom-right"

interface ResizingProps {
  handler: HandlerType
  startWidth?: number
  startHeight?: number
  startX?: number
  startY?: number
}

function IframeContent({ html, css, id, className }: IframeContentProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { globalState } = usePenContext()
  const { markdownTheme, codeTheme, mobile } = globalState
  // 预览区域的dom
  const rightPreviewRef = useRef<HTMLIFrameElement>(null)
  // 预览区域的宽高
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })
  const [isDragIng, setIsDragIng] = useState(false)

  const [responseSize, setResponseSize] = useState(defaultResponseSize)

  const [resizing, setResizing] = useState<ResizingProps | undefined>()

  const responseSizeView = useMemo(() => {
    const { width, zoom: zoomX } = getZoomWithWidth(
      size.width - handlerSize * 2,
      responseSize.width
    )
    const { height, zoom: zoomY } = getZoomWithHeight(
      size.height - handlerSize * 2,
      responseSize.height
    )

    return { width, height, zoom: Math.min(zoomX, zoomY) }
  }, [size.width, size.height, responseSize.width, responseSize.height])

  const iframeCss = useMemo(() => {
    return baseCss + css + themes[markdownTheme].css + codeThemes[codeTheme].css
  }, [css, markdownTheme, codeTheme])

  useLayoutEffect(() => {
    if (rightPreviewRef.current) {
      // 监听预览区域宽高的变化
      const resizeObserver = new ResizeObserver((entries) => {
        const { contentRect } = entries[0]
        const { width, height } = contentRect

        setSize({ width, height })
      })
      // 开始监听
      resizeObserver.observe(rightPreviewRef.current)

      return () => {
        // 销毁
        resizeObserver.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    inject({ html, css: iframeCss, id })
  }, [html, id, iframeCss])

  useLayoutEffect(() => {
    if (resizing) {
      // @ts-ignore
      function onMouseMove(e) {
        e.preventDefault()
        setIsDragIng(true)
        const { x, y } = getPointerPosition(e)
        if (resizing?.handler === "left") {
          // 移动的距离
          const moveLeft = x - (resizing?.startX || 0)
          // 乘以2是因为左右两边都要拓宽
          const width = (resizing.startWidth || 0) - moveLeft * 2
          setResponseSize(({ height }) => ({
            height,
            width,
          }))
        }
        if (resizing?.handler === "right") {
          // 移动的距离
          const moveRight = x - (resizing?.startX || 0)
          // 乘以2是因为左右两边都要拓宽
          const width = (resizing.startWidth || 0) + moveRight * 2
          setResponseSize(({ height }) => ({
            height,
            width,
          }))
        }
        if (resizing?.handler === "bottom") {
          // 移动的距离
          const moveBottom = y - (resizing?.startY || 0)
          const height = (resizing.startHeight || 0) + moveBottom
          setResponseSize(({ width }) => ({
            height,
            width,
          }))
        }
        if (resizing?.handler === "bottom-left") {
          // 移动的距离
          const moveLeft = x - (resizing?.startX || 0)
          const moveBottom = y - (resizing?.startY || 0)
          const width = (resizing.startWidth || 0) - moveLeft * 2
          const height = (resizing.startHeight || 0) + moveBottom
          setResponseSize(() => ({
            height,
            width,
          }))
        }
        if (resizing?.handler === "bottom-right") {
          // 移动的距离
          const moveLeft = x - (resizing?.startX || 0)
          const moveBottom = y - (resizing?.startY || 0)
          const width = (resizing.startWidth || 0) + moveLeft * 2
          const height = (resizing.startHeight || 0) + moveBottom
          setResponseSize(() => ({
            height,
            width,
          }))
        }
      }
      // @ts-ignore
      function onMouseUp(e) {
        e.preventDefault()
        // 重置, 也会触发上一次的销毁回调 也就相对应的销毁了上一次的mouseMove, mouseUp
        setResizing(undefined)
        setIsDragIng(false)
      }
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)

      return () => {
        document.removeEventListener("mousemove", onMouseMove)
      }
    }
  }, [resizing])

  function inject(content: { html?: string; css: string; id?: string }) {
    // 向 iframe 传递 html css 渲染
    iframeRef.current?.contentWindow?.postMessage(
      { html: content.html, css: content.css, id: content.id },
      "*"
    )
  }

  function dragLeft(e: MouseEventType) {
    e.preventDefault()
    const pos = getPointerPosition(e)
    setResizing({
      handler: "left",
      startWidth: responseSize.width,
      startX: pos.x,
    })
  }
  function dragRight(e: MouseEventType) {
    e.preventDefault()
    const pos = getPointerPosition(e)
    setResizing({
      handler: "right",
      startWidth: responseSize.width,
      startX: pos.x,
    })
  }
  function dragBottom(e: MouseEventType) {
    e.preventDefault()
    const pos = getPointerPosition(e)
    setResizing({
      handler: "bottom",
      startHeight: responseSize.height,
      startY: pos.y,
    })
  }
  function dragBottomLeft(e: MouseEventType) {
    e.preventDefault()
    const pos = getPointerPosition(e)
    setResizing({
      handler: "bottom-left",
      startWidth: responseSize.width,
      startHeight: responseSize.height,
      startX: pos.x,
      startY: pos.y,
    })
  }
  function dragBottomRight(e: MouseEventType) {
    e.preventDefault()
    const pos = getPointerPosition(e)
    setResizing({
      handler: "bottom-right",
      startWidth: responseSize.width,
      startHeight: responseSize.height,
      startX: pos.x,
      startY: pos.y,
    })
  }

  return (
    <div className="dark:bg-black w-full h-full" ref={rightPreviewRef}>
      {mobile ? (
        <div className="flex-none text-center text-xs leading-4 tabular-nums whitespace-pre py-3 text-gray-900 dark:text-gray-400">
          {responseSizeView.width} × {responseSizeView.height}
          <span className="text-gray-500">
            ({Math.round(responseSizeView.zoom * 100)}%)
          </span>
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
        <div
          className="cursor-ew-resize select-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center"
          onTouchStart={dragLeft}
          onMouseDown={dragLeft}
        >
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
        {/* 预览模块 */}
        <div
          className="border border-gray-200 dark:border-gray-700 shadow-sm"
          style={
            mobile
              ? {
                  width: responseSizeView.width * responseSizeView.zoom,
                  height: responseSizeView.height * responseSizeView.zoom,
                }
              : {}
          }
        >
          <iframe
            className={clsx(
              `w-full h-full ${isDragIng ? "pointer-events-none" : ""}`
            )}
            ref={iframeRef}
            srcDoc={iframeText}
            style={
              mobile
                ? {
                    width: responseSizeView.width,
                    height: responseSizeView.height,
                    marginLeft:
                      Math.round(
                        responseSizeView.width -
                          responseSizeView.width * responseSizeView.zoom
                      ) / -2,
                    transformOrigin: "center top",
                    transform: `scale(${responseSizeView.zoom})`,
                  }
                : {}
            }
            onLoad={() => inject({ html, css: iframeCss, id })}
          />
        </div>
        {/* 向右移动块 */}
        <div
          className="cursor-ew-resize select-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center"
          onTouchStart={dragRight}
          onMouseDown={dragRight}
        >
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
        <div
          className="cursor-nesw-resize select-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center"
          onTouchStart={dragBottomLeft}
          onMouseDown={dragBottomLeft}
        >
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
        <div
          className="cursor-ns-resize select-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center"
          onTouchStart={dragBottom}
          onMouseDown={dragBottom}
        >
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
        <div
          className="cursor-nwse-resize select-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center"
          onTouchStart={dragBottomRight}
          onMouseDown={dragBottomRight}
        >
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
