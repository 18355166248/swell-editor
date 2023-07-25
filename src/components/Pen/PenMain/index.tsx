import TabBar from "./TabBar"
import Editor from "./Editor"
import Preview from "./Preview"
import { usePenContext } from "../IndexProvider"
import SplitPane from "react-split-pane"
import { useState } from "react"
import clsx from "clsx"

function PenMain() {
  const { globalState } = usePenContext()
  const { vertical } = globalState

  const [resizing, setResizing] = useState(false)

  function onDragStarted() {
    setResizing(true)
  }
  function onDragFinished() {
    setResizing(false)
  }

  return (
    <main className="border-solid flex-1 border-t border-gray-200 dark:border-gray-800">
      <SplitPane
        defaultSize="50%"
        minSize={300}
        split={vertical ? "vertical" : "horizontal"}
        onDragStarted={onDragStarted}
        onDragFinished={onDragFinished}
      >
        <div className="h-full">
          <TabBar />
          <Editor />
        </div>
        <div className="h-full">
          {/* 解决拖拽的时候拖不动的问题 拖拽的时候给 iframe 加类 */}
          <Preview className={clsx({ "pointer-events-none": resizing })} />
        </div>
      </SplitPane>
    </main>
  )
}

export default PenMain
