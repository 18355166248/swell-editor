import { Allotment } from "allotment"
import TabBar from "./TabBar"
import Editor from "./Editor"

function PenMain() {
  return (
    <main className="border-gray-800 border-solid border-t flex-1">
      <Allotment minSize={100}>
        <Allotment.Pane minSize={300}>
          <TabBar />
          <Editor />
        </Allotment.Pane>
        <Allotment.Pane minSize={300}>
          <div>4</div>
        </Allotment.Pane>
      </Allotment>
    </main>
  )
}

export default PenMain
