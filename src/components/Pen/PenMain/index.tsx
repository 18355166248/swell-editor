import { Allotment } from "allotment"
import TabBar from "./TabBar"
import Editor from "./Editor"
import Preview from "./Preview"

function PenMain() {
  return (
    <main className="border-solid flex-1 border-t border-gray-200 dark:border-gray-800">
      <Allotment minSize={100}>
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
