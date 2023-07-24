import { Allotment } from "allotment"
import TabBar from "./TabBar"
import Editor from "./Editor"
import Preview from "./Preview"
import { usePenContext } from "../IndexProvider"

function PenMain() {
  const { globalState } = usePenContext()
  const { vertical } = globalState
  return (
    <main className="border-solid flex-1 border-t border-gray-200 dark:border-gray-800">
      <Allotment minSize={100} vertical={vertical}>
        <Allotment.Pane minSize={300}>
          <TabBar />
          <Editor />
        </Allotment.Pane>
        <Allotment.Pane minSize={300}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </main>
  )
}

export default PenMain
