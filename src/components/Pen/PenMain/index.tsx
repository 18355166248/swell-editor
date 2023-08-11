import TabBar from "./TabBar"
import Editor from "./Editor"
import Preview from "./Preview"
import { usePenContext } from "../IndexProvider"
import SplitPane from "react-split-pane"
import { useLayoutEffect, useState } from "react"
import clsx from "clsx"
import { editorTabBarHeight, headerHeight } from "../utils"

interface SizeProps {
  min: number
  max: number
  current: number
  scale: number // 相对比屏幕的比例
}

function PenMain() {
  const { globalState } = usePenContext()
  const { split, preview } = globalState

  const [resizing, setResizing] = useState(false)
  const [size, setSize] = useState<SizeProps>({
    min: 0,
    max: 0,
    current: 0,
    scale: 0.5,
  })

  // 监听屏幕宽高的变化
  useLayoutEffect(() => {
    const isVertical = split === "vertical"
    function updateSize() {
      setSize((size) => {
        // 编辑器横向排列的时候就是浏览器宽度, 纵向的时候就是屏幕高度-顶部操作高度
        const windowSize = isVertical
          ? document.documentElement.clientWidth
          : document.documentElement.clientHeight - headerHeight

        // 横向的时候最小宽度320 纵向的时候最小高度为320+编辑器顶部 tabbar 的高度
        const min = isVertical ? 320 : 320 + editorTabBarHeight
        const max = isVertical ? windowSize - min : windowSize - 320

        if (preview) {
          // 隐藏左侧
          return {
            ...size,
            min: 0,
            max: 0,
            current: 0,
          }
        }

        return {
          ...size,
          min,
          max,
          current: Math.max(min, Math.min(max, windowSize * size.scale)),
        }
      })
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [split, preview])

  function onDragStarted() {
    setResizing(true)
  }
  function onDragFinished() {
    setResizing(false)
  }
  function onChangeSplit(newSize: number) {
    const isVertical = split === "vertical"
    // 编辑器横向排列的时候就是浏览器宽度, 纵向的时候就是屏幕高度-顶部操作高度
    const windowSize = isVertical
      ? document.documentElement.clientWidth
      : document.documentElement.clientHeight - headerHeight
    setSize({
      ...size,
      scale: newSize / windowSize,
    })
  }

  return (
    <main className="relative border-solid flex-1 border-t border-gray-200 dark:border-gray-800">
      <SplitPane
        defaultSize={preview ? 0 : "50%"}
        minSize={size?.min}
        maxSize={size?.max}
        size={size?.current}
        split={split}
        onChange={onChangeSplit}
        onDragStarted={onDragStarted}
        onDragFinished={onDragFinished}
        pane2Style={{ overflow: "hidden" }}
      >
        <div className={clsx({ "h-full w-full": true, "opacity-0": preview })}>
          <TabBar />
          <Editor />
        </div>
        <div className="h-full w-full hidden lg:block">
          {/* 解决拖拽的时候拖不动的问题 拖拽的时候给 iframe 加类 */}
          <Preview className={clsx({ "pointer-events-none": resizing })} />
        </div>
      </SplitPane>
    </main>
  )
}

export default PenMain
