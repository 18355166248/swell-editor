import { Allotment } from "allotment"

function PenMain() {
  return (
    <Allotment minSize={100}>
      <Allotment.Pane minSize={300}>
        <div>1</div>
      </Allotment.Pane>
      <Allotment.Pane minSize={300}>
        <div>4</div>
      </Allotment.Pane>
    </Allotment>
  )
}

export default PenMain
