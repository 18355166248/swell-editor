import PenHeader from "./PenHeader"
import { IndexProvider } from "./IndexProvider"
import PenMain from "./PenMain"

function Pen() {
  return (
    <IndexProvider>
      <div className="w-full flex flex-col">
        <PenHeader />
        <PenMain />
      </div>
    </IndexProvider>
  )
}

export default Pen
