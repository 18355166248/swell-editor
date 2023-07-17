import { Allotment } from "allotment"
import TabBar, { TabBarKey } from "./TabBar"
import { useState } from "react"
import Editor from "./Editor"

function PenMain() {
  const [activeTab, setActiveTab] = useState<TabBarKey>("html")

  return (
    <main className="border-gray-800 border-solid border-t flex-1">
      <Allotment minSize={100}>
        <Allotment.Pane minSize={300}>
          <TabBar value={activeTab} onChange={setActiveTab} />
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
