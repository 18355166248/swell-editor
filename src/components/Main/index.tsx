import { Allotment } from "allotment"

function Main() {
  return (
    <Allotment minSize={100}>
      <Allotment.Pane maxSize={400}>
        <div>1</div>
      </Allotment.Pane>
      <Allotment.Pane>
        <div>4</div>
      </Allotment.Pane>
    </Allotment>
  )
}

export default Main
