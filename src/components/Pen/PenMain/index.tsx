import TabBar from "./TabBar"
import Editor from "./Editor"
import Preview from "./Preview"
import { usePenContext } from "../IndexProvider"
import SplitPane from "react-split-pane"
import { useState } from "react"
import clsx from "clsx"

function PenMain() {
  const { globalState } = usePenContext()
  const { split, preview } = globalState

  const [resizing, setResizing] = useState(false)

  function onDragStarted() {
    setResizing(true)
  }
  function onDragFinished() {
    setResizing(false)
  }

  return (
    <main className="relative border-solid flex-1 border-t border-gray-200 dark:border-gray-800">
      <SplitPane
        defaultSize={preview ? 0 : "50%"}
        minSize={300}
        split={split}
        onDragStarted={onDragStarted}
        onDragFinished={onDragFinished}
      >
        <div className={clsx({ "h-full w-full": true, "opacity-0": preview })}>
          <TabBar />
          <Editor />
        </div>
        <div className="h-full w-full">
          {/* 解决拖拽的时候拖不动的问题 拖拽的时候给 iframe 加类 */}
          <Preview className={clsx({ "pointer-events-none": resizing })} />
        </div>
      </SplitPane>
    </main>
  )
}

export default PenMain
